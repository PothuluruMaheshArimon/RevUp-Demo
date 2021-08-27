let fromPartSale;
let toPartSale;
let fromPartOrder;
let toPartOrder;

function channelRecomendedDrilldown(){
    $("#channelContent").hide();
    $('#navigateModal').modal('hide');
    retailerName = retailerId;
    $("#RNameRec").text(currentRetailerName);
    $(".filterRow").hide();
    $(".mx-auto ").hide();
    $("#backButton").show();
    $("#backButtonDiv").show();
    $("#channelRecomendedDrillContent").show();
    $('.reportTitle').text('Retailer Recomended View');
    $("#channelViewRecomendDrillSales").jqGrid('GridUnload');
    $("#channelViewRecomendDrillOrders").jqGrid('GridUnload');
    showHideLoader("partGroupRecomenSaleLoader", true);
    showHideLoader("partGroupRecomenOrderLoader", true);
    recomendedPartGroupSalesDataFromApi(retailerName);
    recomendedPartWiseOrderDataFromApi(retailerName);
}



function recomendedPartGroupSalesDataFromApi(retailerName){
    fromPartSale = 1;
    toPartSale = 50;
    partalesDataFromApiWithPagination(fromPartSale, toPartSale,retailerName);
}

function recomendedPartWiseOrderDataFromApi(retailerName){
    fromPartOrder = 1;
    toPartOrder = 50;
    partOrderDataFromApiWithPagination(fromPartSale, toPartSale,retailerName);
}

let partSaleDrillObj;
function partalesDataFromApiWithPagination(fromPartSale, toPartSale,retailerName){
    $("#prePagerPartSale").hide();
    $("#nextPagerPartSale").hide();
    if (partSaleDrillObj) {
        partSaleDrillObj.abort();
        partSaleDrillObj = null;
    }

    let channelFilterData = createChannelFilterData();
    channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromPartSale.toString() });
    channelFilterData.push({ dataType: "String", key: 'toCount', value: toPartSale.toString() });
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    partSaleDrillObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Partcategory_Summary", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let partSaleDrillData = resultData.data.data[0];
            partSaleDrillObj = null;
                      
            if (partSaleDrillData.length <= 0) {
                showHideLoader("partGroupRecomenSaleLoader", false);
                $("#channelViewRecomendDrillSales").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerPartSale").show();
                $("#prePagerPartSale").show();
                if (fromPartSale > 0) {
                    $("#nextPagerPartSale").attr('disabled', true);
                    $("#prePagerPartSale").attr('disabled', false);
                } else {
                    $("#nextPagerPartSale").attr('disabled', false);
                    $("#prePagerPartSale").attr('disabled', true);
                }
                return;
            }
            showHideLoader("partGroupRecomenSaleLoader", false);
            partRecomSaleTableCreate(partSaleDrillData);
            $("#prePagerPartSale").show();

        }),
        error: (function (err) {
            partSaleDrillObj = null;
            console.log(err);
        })
    });
}

let partOrderDrillObj;
function partOrderDataFromApiWithPagination(fromPartOrder, toPartOrder,retailerName){
    $("#prePagerPartOrder").hide();
    $("#nextPagerPartOrder").hide();
    if (partOrderDrillObj) {
        partOrderDrillObj.abort();
        partOrderDrillObj = null;
    }

    let channelFilterData = createChannelFilterData();
    channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromPartOrder.toString() });
    channelFilterData.push({ dataType: "String", key: 'toCount', value: toPartOrder.toString() });
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    partOrderDrillObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Parts_Summary", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let partOrderDrillData = resultData.data.data[0];
            partOrderDrillObj = null;       
            if (partOrderDrillData.length <= 0) {
                showHideLoader("partGroupRecomenOrderLoader", false);
                $("#channelViewRecomendDrillOrders").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerPartOrder").show();
                $("#prePagerPartOrder").show();
                if (fromPartOrder > 0) {
                    $("#nextPagerPartOrder").attr('disabled', true);
                    $("#prePagerPartOrder").attr('disabled', false);
                } else {
                    $("#nextPagerPartOrder").attr('disabled', false);
                    $("#prePagerPartOrder").attr('disabled', true);
                }
                return;
            }
            showHideLoader("partGroupRecomenOrderLoader", false);
            partRecomOrderTableCreate(partOrderDrillData);
            $("#prePagerPartOrder").show();

        }),
        error: (function (err) {
            partOrderDrillObj = null;
            console.log(err);
        })
    });
}





function partRecomSaleTableCreate(partSaleDrillData){
    $("#hide").click(function () {
        $("#container").show();
        $('#container1').hide();
    });

    jQuery("#channelViewRecomendDrillSales").jqGrid({
        data: partSaleDrillData,
        datatype: "local",
        maxHeight: 210,
        minWidth: 1200,
        width: 1200,
        maxWidth: 1200,
        rowNum: 10,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Category", "Qty","Total Purchase Value"],
        colModel: [
            { name: 'Part_Category', index: 'Part_Category', sortable: true, },
            { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Total_Purchase_Value', index: 'Total_Purchase_Value', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true }
            ],

        loadComplete: function () {
                if (fromPartSale > 0) {
                    $("#prePagerPartSale").attr('disabled', true);
                } else {
                    $("#prePagerPartSale").attr('disabled', false);
                }
                $("#nextPagerPartSale").show();
                $("#nextPagerPartSale").attr('disabled', false);
            }
    });
    jQuery("#channelViewRecomendDrillSales").jqGrid('navGrid', '#partGroupRecomenSaleLoader', { edit: false, add: false, del: false, refresh: true });

}


function prePartSalesData() {
    if (fromPartSale > 0) {
        showHideLoader("partGroupRecomenSaleLoader", true);
        $("#channelViewRecomendDrillSales").jqGrid('GridUnload');
        $("#channelViewRecomendDrillSales").empty();
        fromPartSale = fromPartSale - 50;
        toPartSale = toPartSale - 50;
        partalesDataFromApiWithPagination(fromPartSale, toPartSale,retailerId);
    }
};

function nextPartSalesData() {
    $("#channelViewRecomendDrillSales").jqGrid('GridUnload');
    $("#channelViewRecomendDrillSales").empty();
    showHideLoader("partGroupRecomenSaleLoader", true);
    fromPartSale = fromPartSale + 50;
    toPartSale = toPartSale + 50;
    partalesDataFromApiWithPagination(fromPartSale, toPartSale,retailerId);

};



function partRecomOrderTableCreate(partSaleDrillData){
    $("#hide").click(function () {
        $("#container").show();
        $('#container1').hide();
    });

    jQuery("#channelViewRecomendDrillOrders").jqGrid({
        data: partSaleDrillData,
        datatype: "local",
        maxHeight: 210,
        minWidth: 1200,
        width: 1200,
        maxWidth: 1200,
        rowNum: 10,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Code","Qty","Total Purchase Value"],
        colModel: [
            { name: 'Partcode', index: 'Partcode', sortable: true },
            { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Total_Purchase_Value', index: 'Total_Purchase_Value', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true }
            ],

        loadComplete: function () {
                if (fromPartOrder > 0) {
                    $("#prePagerPartOrder").attr('disabled', true);
                } else {
                    $("#prePagerPartOrder").attr('disabled', false);
                }
                $("#nextPagerPartOrder").show();
                $("#nextPagerPartOrder").attr('disabled', false);
            }
    });
    jQuery("#channelViewRecomendDrillSales").jqGrid('navGrid', '#partGroupRecomenOrderLoader', { edit: false, add: false, del: false, refresh: true });

}


function prePartOrderData() {
    if (fromPartOrder > 0) {
        showHideLoader("partGroupRecomenOrderLoader", true);
        $("#channelViewRecomendDrillOrders").jqGrid('GridUnload');
        $("#channelViewRecomendDrillOrders").empty();
        fromPartOrder = fromPartOrder - 50;
        toPartOrder = toPartOrder - 50;
        partOrderDataFromApiWithPagination(fromPartOrder, toPartOrder,retailerId);
    }
};

function nextPartOrderData() {
    $("#channelViewRecomendDrillOrders").jqGrid('GridUnload');
    $("#channelViewRecomendDrillOrders").empty();
    showHideLoader("partGroupRecomenOrderLoader", true);
    fromPartOrder = fromPartOrder + 50;
    toPartOrder = toPartOrder + 50;
    partOrderDataFromApiWithPagination(fromPartOrder, toPartOrder,retailerId);

};




   
let RetailerRecSaleSharedData=[];
function retailerRecSalesPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData = createChannelFilterData();
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId }); 
       const retsummFilterData =channelFilterData;
       RetailerRecSaleSharedData.push(["Part Category","Qty","Total Purchase Value"]);
    getFetchAllRetailerRecSaleBaseOnFilter(retsummFilterData);      
}

function getFetchAllRetailerRecSaleBaseOnFilter(summeryFilteData){  
      const retsummFilterData = getFilterData(summeryFilteData);
   getFetchretailRecSalesDataInBatch(retsummFilterData);      
}

function getFetchretailRecSalesDataInBatch(retsummFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Partcategory_Summary", 'chartDataForms': retsummFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
            const RetailerRecSaleSharedDataconvArray = [];
            RetailerRecSaleSharedDataconvArray.push(originalData[i].Part_Category);
            RetailerRecSaleSharedDataconvArray.push(parseFloat(originalData[i].Qty));
            RetailerRecSaleSharedDataconvArray.push(parseFloat(originalData[i].Total_Purchase_Value)).toFixed(2);
            RetailerRecSaleSharedData.push(RetailerRecSaleSharedDataconvArray);         
           }              
           if(originalData.length >= 500 ){
            getFetchAllRetailerRecSaleBaseOnFilter(retsummFilterData);
             }else{              
               exportToCsv('RetailerRecomSalesDrillDown.csv',RetailerRecSaleSharedData);
               RetailerRecSaleSharedData = [];
               $('#downloadCsvLoader,#retailerDrillSalesshowDownload').hide();
               $('#retailRecomshowDownload').show();
               $("#RetailerRecomendDrillSales").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           RetailerRecSaleSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#RetailerRecomendDrillSales").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


let RetailerRecOrderSharedData=[];
function retailerRecOrderPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData = createChannelFilterData();
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId }); 
       const retsummFilterData =channelFilterData;
       RetailerRecOrderSharedData.push(["Part Category","Qty","Total Purchase Value"]);
    getFetchAllRetailerRecOrderBaseOnFilter(retsummFilterData);      
}

function getFetchAllRetailerRecOrderBaseOnFilter(summeryFilteData){  
      const retsummFilterData = getFilterData(summeryFilteData);
   getFetchretailRecOrderDataInBatch(retsummFilterData);      
}

function getFetchretailRecOrderDataInBatch(retsummFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Parts_Summary", 'chartDataForms': retsummFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
            const RetailerRecSaleSharedDataconvArray = [];
            RetailerRecSaleSharedDataconvArray.push(originalData[i].Partcode);
            RetailerRecSaleSharedDataconvArray.push(parseFloat(originalData[i].Qty));
            RetailerRecSaleSharedDataconvArray.push(parseFloat(originalData[i].Total_Purchase_Value)).toFixed(2);
            RetailerRecSaleSharedData.push(RetailerRecSaleSharedDataconvArray);         
           }              
           if(originalData.length >= 500 ){
            getFetchAllRetailerRecSaleBaseOnFilter(retsummFilterData);
             }else{              
               exportToCsv('RetailerRecomOrderDrillDown.csv',RetailerRecSaleSharedData);
               RetailerRecSaleSharedData = [];
               $('#downloadCsvLoader,#retailerDrillOrderBanDownload').hide();
               $('#retailerDrillOrderDownload').show();
               $("#retailerOrderDrillDown").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           RetailerRecSaleSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#retailerOrderDrillDown").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}