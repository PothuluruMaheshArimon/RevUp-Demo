let fromPartGroup;
let toPartGroup;
let fromPartSpecific;
let toPartSpecific;
let fromPartNotPur;
let toPartNotPur;
let fromPartOverall;
let toPartOverall;
var retailerName;
let contactId;
let retailerId;

// function goBackChannelView(){
//     $('.reportTitle').text('Channel View');
//     $("#backButton").hide();
//     appInsiteCall();
//     $('#retailernameDiv,#channelRecomendedDrillContent,#districtDiv,#breakingNew,#breakingNews1,#breakingNews2,#retailerDiv,#pager7,#retailContent,#partCategoryDiv,#classifictionDiv,#indiaContent,#stateContent,#distriContent,#retdrillContent,#pertContent,#partdrillContent,#perforContent,#channelDrillContent').hide();
//     $("#territoryDiv,#distributerDiv,#stateDiv,#channelContent,#channelContent,#nextPagerChannel,.filterRow,.mx-auto").show();
//     $("#RetailerviewtableId,#partviewtableId1,#partviewtableId").jqGrid('GridUnload');
//     $("#keyMetricsLoaderRetai").css('display', 'block');

//    // filterPageWiseShowing(this.id);
// }

let preSelecetedOfTerry;
let preSelecetedOfDistry;
let preSelecetedOfState;
let drillDownBack = false;
function goBackChannelView() {
    $('.reportTitle').text('Channel View');
    $("#channelContent").show();
    $("#recomendView").css('font-weight', '300');
    $("#channelView").css('font-weight', 'bold');
    $("#subViewOfRecomme").hide();//mahesh
    recomend=true;
    drillDownBack=true;
    preSelecetedOfTerry = $("#territoryFilter").val();
    preSelecetedOfDistry = $("#distributorFilter").val();
    preSelecetedOfState = $("#stateFilter").val();
    $(".mx-auto,#yearDiv,#monthDiv,#stateDiv,#distributerDiv").show();
    $("#channelDrillContent,#districtDiv,#retailerDiv,#drillheadersChannel").hide();
    filterChannelViewPage("channelView");
};



function channelDrilldown(){
    $("#channelContent").hide();
    $('#navigateModal').modal('hide');
    onloadFunction = false;
    $("#subViewOfRecomme").show();//mahesh
    recomend=false;
    retailerName = retailerId;
    // $(".filterRow").hide();
    $("#retaileNameForDrill").val(currentRetailerName);
    $("#salesOppert").val(retailerOpporIn);
    $("#recomendView").css('font-weight', '600');
    $(".mx-auto,#yearDiv,#monthDiv,#stateDiv").hide();
    $("#channelDrillContent,#distributerDiv,#districtDiv,#retailerDiv,#drillheadersChannel").show();
    $('.reportTitle').text('Up Sell / Cross Sell Opportunities');
    $("#channelViewDrillM1M2M3").jqGrid('GridUnload');
    $("#partGrouptableId").jqGrid('GridUnload');
    $("#breakingNew").hide();
    $("#breakingNews1").hide();
    $("#breakingNews2").hide();
    $("#channelViewDrillSpecific").jqGrid('GridUnload');
    $("#channelViewTableDrillNotPur").jqGrid('GridUnload');
    showHideLoader("partGroupLoader", true);
    showHideLoader("PartSpecificLoader", true);
    showHideLoader("partSalePotenLoader", true);
    showHideLoader("partPotentialLoader", true);
    let selectedFilter = [];
    selectedFilter.push({ dataType: "String", key: 'RetailerID', value: retailerName.toString() });
    selectedFilter.push({ dataType: "String", key: 'Year', value: drillYear.toString() });
    selectedFilter.push({ dataType: "String", key: 'Month', value: drillMonth.toString() });      
    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Dependency_V1_backup_h5", 'chartDataForms': selectedFilter }),
        success: (function (data) {
            let filterData = data.data.data;
            
            populateFilterCombo(filterData, "Retailer");
            $("#breakingNew").hide();
            $("#breakingNews1").hide();
            $("#breakingNews2").hide();
            $("#indiaView,#stateView,#perforView,#LMSaherView,#channelView,#MSCView,#RCView,#RoSView,#disrtiView,#benchView").css('font-weight', '100');
       

        }),
        error: (function (err) {
            console.log(err);
        })
    });
    
    // partGroupDataFromApi(retailerId);
    // partSpecificDataFromApi(retailerId);
   // partNotPurchasedDataFromApi(retailerId);
  //  partHeadersDataFromAPi(retailerId);
   // partOverallDataFromApi(retailerId);
}

function partGroupDataFromApi(retailerId){
    fromPartGroup = 1;
    toPartGroup = 50;
    partGroupDataFromApiWithPagination(retailerId);
}

function partSpecificDataFromApi(retailerId){
    fromPartSpecific = 1;
    toPartSpecific = 50;
    partSpecificDataFromApiWithPagination(retailerId);
}

// function partNotPurchasedDataFromApi(retailerId){
//     fromPartNotPur = 1;
//     toPartNotPur = 50;
//     partNotPurchasedDataFromApiWithPagination(fromPartNotPur, toPartNotPur,retailerId);
// }

function prePartGroupSalesData() {
    if (fromCountNineMon > 0) {
        $("#partGrouptableId").jqGrid('GridUnload');
        $("#partGrouptableId").empty();
        showHideLoader("partGroupLoader", true);
        fromPartGroup = fromPartGroup - 50;
        toPartGroup = toPartGroup - 50;
        retailerId=retailerName;
        partGroupDataFromApiWithPagination(fromPartGroup, toPartGroup,retailerId);
    }
}

function nextPartGroupSalesData() {
    if (fromCountNineMon > 0) {
        $("#partGrouptableId").jqGrid('GridUnload');
        $("#partGrouptableId").empty();
        showHideLoader("partGroupLoader", true);
        fromPartGroup = fromPartGroup + 50;
        toPartGroup = toPartGroup + 50;
        retailerId=retailerName;
        partGroupDataFromApiWithPagination(fromPartGroup, toPartGroup,retailerId);
    }
}

function prePartRecommendedRetailData() {
    if (fromCountNineMon > 0) {
        $("#channelViewDrillSpecific").jqGrid('GridUnload');
        $("#channelViewDrillSpecific").empty();
        showHideLoader("PartSpecificLoader", true);
        fromPartSpecific = fromPartSpecific - 50;
        toPartSpecific = toPartSpecific - 50;
        retailerId=retailerName;
        partSpecificDataFromApiWithPagination(fromPartSpecific, toPartSpecific,retailerId);
    }
}

function nextPartRecommendedRetailData() {
    if (fromCountNineMon > 0) {
        $("#channelViewDrillSpecific").jqGrid('GridUnload');
        $("#channelViewDrillSpecific").empty();
        showHideLoader("PartSpecificLoader", true);
        fromPartSpecific = fromPartSpecific + 50;
        toPartSpecific = toPartSpecific + 50;
        retailerId=retailerName;
        partSpecificDataFromApiWithPagination(fromPartSpecific, toPartSpecific,retailerId);
    }
}

function prePartNotPurchageData() {
    if (fromCountNineMon > 0) {
        $("#channelViewTableDrillNotPur").jqGrid('GridUnload');
        $("#channelViewTableDrillNotPur").empty();
        showHideLoader("partNotPurLoader", true);
        fromPartNotPur = fromPartNotPur - 50;
        toPartNotPur = toPartNotPur - 50;
        retailerId=retailerName;
        partNotPurchasedDataFromApiWithPagination(fromPartNotPur, toPartNotPur,retailerId);
    }
}

function nextPartNotPurchageData() {
    if (fromCountNineMon > 0) {
        $("#channelViewTableDrillNotPur").jqGrid('GridUnload');
        $("#channelViewTableDrillNotPur").empty();
        showHideLoader("partNotPurLoader", true);
        fromPartNotPur = fromPartNotPur + 50;
        toPartNotPur = toPartNotPur + 50;
        retailerId=retailerName;
        partNotPurchasedDataFromApiWithPagination(fromPartNotPur, toPartNotPur,retailerId);
    }
}

//============== API Call Start ==============//
// let partHeaderObj;
// function partHeadersDataFromAPi(retailerId){
//     if (partHeaderObj) {
//         partHeaderObj.abort();
//         partHeaderObj = null;
//     }

//     let channelFilterData = createChannelFilterData();
//     channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId });
//     partHeaderObj = $.ajax({
//         url: getApiDomain(),
//         type: 'POST',
//         data: JSON.stringify({ 'filter': "Retailer_View_Header", 'chartDataForms': channelFilterData }),
//         success: (function (resultData) {
//             let partHeaderData = resultData.data.data[0];
//             partHeaderObj = null;
                      
//             if (partHeaderData.length <= 0) {
//                return;
//             }
//             $("#RName").text(partHeaderData[0].ContactName);
//             $("#saleLastFy").text(getnumFormatterRupe(partHeaderData[0].Total_Sales));
//             $("#ContribuSales").text(partHeaderData[0].Percentage_Contrib+"%");

//         }),
//         error: (function (err) {
//             partHeaderObj = null;
//             console.log(err);
//         })
//     });
// }

// let partOverallObj;
// function partOverallDataFromApi(retailerId){
//     if (partOverallObj) {
//         partOverallObj.abort();
//         partOverallObj = null;
//     }

//     let channelFilterData = createChannelFilterData();
//     channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId });
//     partOverallObj = $.ajax({
//         url: getApiDomain(),
//         type: 'POST',
//         data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Monthly_Summary", 'chartDataForms': channelFilterData }),
//         success: (function (resultData) {
//             let partOverallDrillData = resultData.data.data[0];
//             partOverallObj = null;
                      
//             if (partOverallDrillData.length <= 0) {
//                 showHideLoader("drillM1M2M3Loader", false);
//                 $("#channelViewDrillM1M2M3").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
//                 return;
//             }
//             showHideLoader("drillM1M2M3Loader", false);
//             partOverallDrillTableCreate(partOverallDrillData);

//         }),
//         error: (function (err) {
//             partOverallObj = null;
//             console.log(err);
//         })
//     });
// }

let partGroupDrillObj;
function partGroupDataFromApiWithPagination(retailerId){
    $("#prePagerPartGroup").hide();
    $("#nextPagerPartGroup").hide();
    if (partGroupDrillObj) {
        partGroupDrillObj.abort();
        partGroupDrillObj = null;
    }

    let procedureName = "Retailer_Recommendation_CrossSell";
    let channelFilterData = [];
    // channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromPartGroup.toString() });
    // channelFilterData.push({ dataType: "String", key: 'toCount', value: toPartGroup.toString() });
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId.toString() });
    partGroupDrillObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: channelFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(channelFilterData)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_Recommendation_CrossSell", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let partGroupDrillData = resultData.data.data[0];
            partGroupDrillObj = null;
                      
            if (partGroupDrillData.length <= 0) {
                showHideLoader("partGroupLoader", false);
                $("#partGrouptableId").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                // $("#nextPagerPartGroup").show();
                // $("#prePagerPartGroup").show();
                // if (fromPartGroup > 0) {
                //     $("#nextPagerPartGroup").attr('disabled', true);
                //     $("#prePagerPartGroup").attr('disabled', false);
                // } else {
                //     $("#nextPagerPartGroup").attr('disabled', false);
                //     $("#prePagerPartGroup").attr('disabled', true);
                // }
                return;
            }
            showHideLoader("partGroupLoader", false);
            partGroupDrillTableCreate(partGroupDrillData);
            // $("#prePagerPartGroup").show();

        }),
        error: (function (err) {
            partGroupDrillObj = null;
            console.log(err);
        })
    });
}

let partSpecificDrillObj;
function partSpecificDataFromApiWithPagination(retailerId){
    $("#prePagerSpecific").hide();
    $("#nextPagerSpecific").hide();
    if (partSpecificDrillObj) {
        partSpecificDrillObj.abort();
        partSpecificDrillObj = null;
    }

    let channelFilterData = [];
    let procedureName = "Retailer_Recommendation_UpSell";
    // channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromPartSpecific.toString() });
    // channelFilterData.push({ dataType: "String", key: 'toCount', value: toPartSpecific.toString() });
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId.toString() });
    partSpecificDrillObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: channelFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(channelFilterData)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Retailer_Recommendation_UpSell", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let partSpecificDrillData = resultData.data.data[0];
            partSpecificDrillObj = null;         
            if (partSpecificDrillData.length <= 0) {
                showHideLoader("PartSpecificLoader", false);
                $("#channelViewDrillSpecific").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                // $("#nextPagerSpecific").show();
                // $("#prePagerSpecific").show();
                // if (fromPartSpecific > 0) {
                //     $("#nextPagerSpecific").attr('disabled', true);
                //     $("#prePagerSpecific").attr('disabled', false);
                // } else {
                //     $("#nextPagerSpecific").attr('disabled', false);
                //     $("#prePagerSpecific").attr('disabled', true);
                // }
                return;
            }
            showHideLoader("PartSpecificLoader", false);
            partOverallDrillTableCreate(partSpecificDrillData);
           // $("#prePagerSpecific").show();

        }),
        error: (function (err) {
            partSpecificDrillObj = null;
            console.log(err);
        })
    });
}

// let partNotPurDrillObj;
// function partNotPurchasedDataFromApiWithPagination(fromPartNotPur, toPartNotPur,retailerId){
//     $("#prePagerDrillNotPur").hide();
//     $("#nextPagerDrillNotPur").hide();
//     if (partNotPurDrillObj) {
//         partNotPurDrillObj.abort();
//         partNotPurDrillObj = null;
//     }

//     let channelFilterData = createChannelFilterData();
//     channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromPartNotPur.toString() });
//     channelFilterData.push({ dataType: "String", key: 'toCount', value: toPartNotPur.toString() });
//     channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerId });

//     partNotPurDrillObj = $.ajax({
//         url: getApiDomain(),
//         type: 'POST',
//         data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Part_Summary", 'chartDataForms': channelFilterData }),
//         success: (function (resultData) {
//             let partNotPurDrillData = resultData.data.data[0];
//             partNotPurDrillObj = null;
                      
//             if (partNotPurDrillData .length <= 0) {
//                 showHideLoader("partNotPurLoader", false);
//                 $("#channelViewTableDrillNotPur").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
//                 $("#nextPagerDrillNotPur").show();
//                 $("#prePagerDrillNotPur").show();
//                 if (fromPartNotPur > 0) {
//                     $("#nextPagerDrillNotPur").attr('disabled', true);
//                     $("#prePagerDrillNotPur").attr('disabled', false);
//                 } else {
//                     $("#nextPagerDrillNotPur").attr('disabled', false);
//                     $("#prePagerDrillNotPur").attr('disabled', true);
//                 }
//                 return;
//             }
//             showHideLoader("partNotPurLoader", false);
//             partNotPurDrillTableCreate(partNotPurDrillData);
//             $("#prePagerDrillNotPur").show();


//         }),
//         error: (function (err) {
//             partNotPurDrillObj = null;
//             console.log(err);
//         })
//     });
// }

//============== API Calls END ==============//


//============= Populating Data in to Table Start =================//

function partOverallDrillTableCreate(partSpecificDrillData){
    $("#hide").click(function () {
        $("#container").show();
        $('#container1').hide();
    });

    jQuery("#channelViewDrillSpecific").jqGrid({
        data: partSpecificDrillData,
        datatype: "local",
        maxHeight: 150,
        minWidth: 1240,
        width: 1240,
        maxWidth: 1240,
        rowNum: 10,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Category","Part Code", "Part Name", "Quantity"],
        colModel: [
            { name: 'Part_Category', index: 'Part_Category', sortable: true },
            { name: 'PartCode', index: 'PartCode', sortable: true },
            { name: 'PartName', index: 'PartName',  sortable: true },
            { name: 'Recommended_Qty', index: 'Recommended_Qty',formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
          ]
    });
    jQuery("#channelViewDrillSpecific").jqGrid('navGrid', '#PartSpecificLoader', { edit: false, add: false, del: false, refresh: true });

}

function partGroupDrillTableCreate(partGroupDrillData){
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#partGrouptableId").jqGrid({
        data: partGroupDrillData,
        datatype: "local",
        maxHeight: 153,
        width: 1240,
        rowNum: 10,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Category","Part Code", "Part Name", "Quantity"],
        colModel: [
            { name: 'Part_Category', index: 'Part_Category', sortable: true },
            { name: 'PartCode', index: 'PartCode', sortable: true },
            { name: 'PartName', index: 'PartName',  sortable: true },
            { name: 'Qty', index: 'Qty',formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            ],

    });
    jQuery("#partGrouptableId").jqGrid('navGrid', '#partGroupLoader', { edit: false, add: false, del: false, refresh: true });

}

// function  partSpecificDrillTableCreate(partSpecificDrillData){
//     $("#hide").click(function () {
//         $("#container").show();
//         $('#container1').hide();
//     });

//     jQuery("#channelViewDrillSpecific").jqGrid({
//         data: partSpecificDrillData,
//         datatype: "local",
//         height: 200,
//         width: 1240,
//         rowNum: 10,
//         autowidth: true,
//         shrinkToFit: true,
//         forceFit: true,
//         viewrecords: true,
//         sortorder: "desc",
//         colNames: ["Part Code", "Current Month Purchase (&#x20B9)", "Qty", "Last 6 Month Average Sales (&#x20B9)", "Highest Qty ordered", "% Contribution"],
//         colModel: [
//             { name: 'Partcode', index: 'Partcode', sortable: true },
//             { name: 'Total_Purchase_Value', index: 'Total_Purchase_Value', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
//             { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
//             { name: 'Avg_6_Month_Sales', index: 'Avg_6_Month_Sales', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
//             { name: 'Highest_Qty', index: 'Highest_Qty',formatter:getnumFormatterRupe,  sorttype:'int', sortable: true },
//             { name: 'Sales_Contrib', index: 'Sales_Contrib', formatter:getnumFormatterRupe,  sorttype:'int', sortable: true }
//         ],
//         loadComplete: function () {
//             if (fromCountChannel <= 1) {
//                 $("#prePagerSpecific").attr('disabled', true);
//             } else {
//                 $("#prePagerSpecific").attr('disabled', false);
//             }
//             $("#nextPagerSpecific").show();
//             $("#nextPagerSpecific").attr('disabled', false);
//         }

//     });
//     jQuery("#channelViewDrillSpecific").jqGrid('navGrid', '#PartSpecificLoader', { edit: false, add: false, del: false, refresh: true });

// }

// function partNotPurDrillTableCreate(partNotPurDrillData){
//     $("#hide").click(function () {
//         $("#container").show()
//         $('#container1').hide()
//     });

//     jQuery("#channelViewTableDrillNotPur").jqGrid({
//         data: partNotPurDrillData,
//         datatype: "local",
//         height: 200,
//         width: 1187,
//         rowNum: 10,
//         autowidth: true,
//         shrinkToFit: true,
//         forceFit: true,
//         viewrecords: true,
//         sortorder: "desc",
//         colNames: ["Part Code", "Current Month Distributor Retail (&#x20B9)", "Qty", "Last 6 Month Average Sales (&#x20B9)", "Highest Qty ordered", "% Contribution"],
//         colModel: [
//             { name: 'PartCode', index: 'PartCode', sortable: true },
//             { name: 'Total_Purchase_Value', index: 'Total_Purchase_Value', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
//             { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
//             { name: 'Avg_6_Month_Qty', index: 'Avg_6_Month_Qty', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
//             { name: 'Highest_Qty', index: 'Highest_Qty', formatter:getnumFormatterRupe,  sorttype:'int',sortable: true },
//             { name: 'Qty_Contrib', index: 'Qty_Contrib', formatter:getnumFormatterRupe,  sorttype:'int', sortable: true }
//         ],
//         loadComplete: function () {
//             if (fromCountChannel <= 1) {
//                 $("#prePagerDrillNotPur").attr('disabled', true);
//             } else {
//                 $("#prePagerDrillNotPur").attr('disabled', false);
//             }
//             $("#nextPagerDrillNotPur").show();
//             $("#nextPagerDrillNotPur").attr('disabled', false);
//         }

//     });
//     jQuery("#channelViewTableDrillNotPur").jqGrid('navGrid', '#partNotPurLoader', { edit: false, add: false, del: false, refresh: true });

// }


//############################ part group wise sales csv download   ########################################################
   
let retailerDrillSharedData=[];
function retailerDrillPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    
       const retailerDrillFilterData =channelFilterData;
    retailerDrillSharedData.push(["Part Group","Current Month Purchase","Unique SKUs Sold","Highest Sales Value","Last 6 Month Average Sales","%Contribution"]);
    getFetchAllretailerDrillBaseOnFilter(retailerDrillFilterData);      
}

function getFetchAllretailerDrillBaseOnFilter(retailerDrillFilteData){  
     const retailerDrillFilterData = getFilterData(retailerDrillFilteData);
   getFetchretailerDrillDataInBatch(retailerDrillFilterData);      
}

function getFetchretailerDrillDataInBatch(retailerDrillFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Partcategory_Summary", 'chartDataForms': retailerDrillFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const retailerDrillSharedDataconvArray = [];
       retailerDrillSharedDataconvArray.push(originalData[i].Part_Category);
       retailerDrillSharedDataconvArray.push(originalData[i].Total_Purchase_Value);
       retailerDrillSharedDataconvArray.push(originalData[i].SKU_Range);
       retailerDrillSharedDataconvArray.push(originalData[i].Highest_Sales);
       retailerDrillSharedDataconvArray.push(parseFloat(originalData[i].Avg_6_Month_Sales)).toFixed(2);
       retailerDrillSharedDataconvArray.push(parseFloat(originalData[i].Sales_Contrib)).toFixed(2);
        retailerDrillSharedData.push(retailerDrillSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
               getFetchAllretailerDrillBaseOnFilter(retailerDrillFilterData);
             }else{              
               exportToCsv('ContactCodeDrillDown.csv',retailerDrillSharedData);
               retailerDrillSharedData = [];
               $('#downloadCsvLoader,#retailerDrillbanDownload').hide();
               $('#retailerDrillshowDownload').show();
               $("#ContactCodeDrillDown").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           retailerDrillSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#ContactCodeDrillDown").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


//############################ Retailer Specific Recommended order csv download  ##################################
   
let retailerspeciSharedData=[];
function retailerSpeciPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    
       const retailerSpeciFilterData =channelFilterData;
       retailerspeciSharedData.push(["Part Code","Total Sales Value","Qty","Last 6 Month Average Sales","Highest Qty Ordered","%Contribution"]);
    getFetchAllretailerSpeciBaseOnFilter(retailerSpeciFilterData);      
}

function getFetchAllretailerSpeciBaseOnFilter(retailerSpecFilteData){  
     const retailerSpeciFilterData = getFilterData(retailerSpecFilteData);
   getFetchretailerSpeciDataInBatch(retailerSpeciFilterData);      
}

function getFetchretailerSpeciDataInBatch(retailerSpeciFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Part_Summary", 'chartDataForms': retailerSpeciFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const retailerspeciSharedDataconvArray = [];
       retailerspeciSharedDataconvArray.push(originalData[i].Partcode);
       retailerspeciSharedDataconvArray.push(originalData[i].Total_Purchase_Value);
       retailerspeciSharedDataconvArray.push(originalData[i].Qty);
       retailerspeciSharedDataconvArray.push(parseFloat(originalData[i].Avg_6_Month_Sales)).toFixed(2);
       retailerspeciSharedDataconvArray.push(originalData[i].Highest_Qty);
       retailerspeciSharedDataconvArray.push(parseFloat(originalData[i].Sales_Contrib)).toFixed(2);
        retailerspeciSharedData.push(retailerspeciSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
            getFetchAllretailerSpeciBaseOnFilter(retailerSpeciFilterData);
             }else{              
               exportToCsv('ContactCodeSpeciDrillDown.csv',retailerspeciSharedData);
               retailerspeciSharedData = [];
               $('#downloadCsvLoader,#retailerSpecibanDownload').hide();
               $('#retailerSpecishowDownload').show();
               $("#ContactCodeSpeciDrillDown").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           retailerspeciSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#ContactCodeSpeciDrillDown").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}





//############################ Part not Purchased by this Retailer  ##################################
   
let partnotpurSharedData=[];
function partnotpurPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    
       const partnotpurFilterData =channelFilterData;
       partnotpurSharedData.push(["Part Code","Total Sales Value","Qty","Last 6 Month Average Sales","Highest Qty Ordered","%Contribution"]);
    getFetchAllpartnotpurBaseOnFilter(partnotpurFilterData);      
}

function getFetchAllpartnotpurBaseOnFilter(partnotFilteData){  
     const partnotpurFilterData = getFilterData(partnotFilteData);
   getFetchpartnotpurDataInBatch(partnotpurFilterData);      
}

function getFetchpartnotpurDataInBatch(partnotpurFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Recommended_Part_Summary", 'chartDataForms': partnotpurFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const partnotpurSharedDataconvArray = [];
       partnotpurSharedDataconvArray.push(originalData[i].PartCode);
       partnotpurSharedDataconvArray.push(parseFloat(originalData[i].Total_Purchase_Value)).toFixed(2);
       partnotpurSharedDataconvArray.push(parseFloat(originalData[i].Qty));
       partnotpurSharedDataconvArray.push(originalData[i].Avg_6_Month_Qty);
       partnotpurSharedDataconvArray.push(parseFloat(originalData[i].Highest_Qty)).toFixed(2);
       partnotpurSharedDataconvArray.push(parseFloat(originalData[i].Qty_Contrib)).toFixed(2);
       partnotpurSharedData.push(partnotpurSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
            getFetchAllpartnotpurBaseOnFilter(partnotpurFilterData);
             }else{              
               exportToCsv('PartcodenotDrillDown.csv',partnotpurSharedData);
               partnotpurSharedData = [];
               $('#downloadCsvLoader,#partcodebanDownload').hide();
               $('#partcodeshowDownload').show();
               $("#RetailerRecomendDrillSales").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           partnotpurSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#PartcodenotDrillDown").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


//############################################# Retailer Summery  ####################################################################
   
let RetailersummSharedData=[];
function retailersummeryPageShareDataDownload(){  
    let channelFilterData=[];
    channelFilterData.push({ dataType: "String", key: 'RetailerID', value: retailerName });
    
       const retsummFilterData =channelFilterData;
       RetailersummSharedData.push(["Month","Total Purchase Value","No. Of Orders","Days between Orders","Sku Range","Highest Sales By Month","Contribution to Overall Sales"]);
    getFetchAllRetailerSummeryBaseOnFilter(retsummFilterData);      
}

function getFetchAllRetailerSummeryBaseOnFilter(summeryFilteData){  
      const retsummFilterData = summeryFilteData;
   getFetchretailsummeDataInBatch(retsummFilterData);      
}

function getFetchretailsummeDataInBatch(retsummFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Monthly_Summary", 'chartDataForms': retsummFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const RetailersummSharedDataconvArray = [];
       RetailersummSharedDataconvArray.push(originalData[i].Month);
       RetailersummSharedDataconvArray.push(parseFloat(originalData[i].Total_Purchase_Value)).toFixed(2);
       RetailersummSharedDataconvArray.push(parseFloat(originalData[i].Order_Count));
       RetailersummSharedDataconvArray.push(originalData[i].days_between_order);
       RetailersummSharedDataconvArray.push(parseFloat(originalData[i].SKU_Range)).toFixed(2);
       RetailersummSharedDataconvArray.push(parseFloat(originalData[i].Max_Monthly_Sales)).toFixed(2);
       RetailersummSharedDataconvArray.push(parseFloat(originalData[i].Sales_Contrib)).toFixed(2);
       RetailersummSharedData.push(RetailersummSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
            getFetchAllRetailerSummeryBaseOnFilter(retsummFilterData);
             }else{              
               exportToCsv('RetailerSummeryDrillDown.csv',RetailersummSharedData);
               RetailersummSharedData = [];
               $('#downloadCsvLoader,#retaisumbanDownload').hide();
               $('#retailsummshowDownload').show();
               $("#RetailerSummeryDrillDown").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           RetailersummSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#RetailerSummeryDrillDown").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


//share Data code 

function channelRetailerViewShareData(value){
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createChannelFilterData();
    let command = {};
  //  command.displayName = " Part Group Performance ";
   // command.reportDisplayName = "Part Group Details of " + title;
    command.filterData = filterData;
    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    if(title == "Channel View"){
        if(value.id =="channelviewtableId"){
            command.displayName = " Channel View ";
            command.reportDisplayName = "Core & Whales Retailers " + title;
        }else if(value.id =="channelViewTableForSixMontId"){
            command.displayName = " Channel View ";
            command.reportDisplayName = "Loyal Retailer " + title;
        }else if(value.id =="channelViewTableForNineMontId"){
            command.displayName = " Channel View ";
            command.reportDisplayName = "Promising & Slipping Retailers " + title;
        }else{
            command.displayName = " ";
            command.reportDisplayName = "";
        }
        shareDataHeaders = "Contact Code,Retailername,Town,Current Month Purchase (&#x20B9),Avg. Last 6 months sale(&#x20B9),Last Month Purchase (&#x20B9),Highest Sales in a month,Last Transaction Value,Days since last transaction,Retailer Segment \n";
        originalData = jQuery("#"+value.id).jqGrid("getRowData");
        sharedData += shareDataHeaders;
        for (let i = 0; i < originalData.length; i++) {
            sharedData += (originalData[i].Contactcode).toString().replace(/,/g,"") + "," + (originalData[i].ContactName).toString().replace(/,/g,"") + "," + (originalData[i].Town).toString().replace(/,/g,"") + "," + (originalData[i].Current_Month_Purchase).toString().replace(/,/g,"") + "," 
            + (originalData[i].Last_6_month_Average).toString().replace(/,/g,"") + ","+ (originalData[i].Last_Month_Purchase).toString().replace(/,/g,"") + ","+(originalData[i].Sales_Highest).toString().replace(/,/g,"") 
            + ","+ (originalData[i].Last_Transaction_Value).toString().replace(/,/g,"") + ","+ (originalData[i].days_since_last_order).toString().replace(/,/g,"")+ ","+ (originalData[i].RetailerSegment).toString().replace(/,/g,"") +"\n";
        }
    }else if (title == "Retailer Recomended View"){
        if(value.id =="channelViewRecomendDrillSales"){
            command.displayName = " Retailer Recomended View ";
            command.reportDisplayName = "Recommended Part Group wise Sales " + title;
            shareDataHeaders = "Part Category,QTY,Total Purchase Value \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Part_Category).toString().replace(/,/g,"") + "," + (originalData[i].Qty).toString().replace(/,/g,"") +","+ (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"") + "\n";
            }
        }else if(value.id =="channelViewRecomendDrillOrders"){
            command.displayName = " Retailer Recomended View ";
            command.reportDisplayName = "Recommended Part wise Order " + title;
            shareDataHeaders = "Part Code,QTY,Total Purchase Value \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Partcode).toString().replace(/,/g,"") + "," + (originalData[i].Qty).toString().replace(/,/g,"") +","+ (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"") + "\n";
            }
        }else{
            command.displayName = " ";
            command.reportDisplayName = "";
            shareDataHeaders = "";
        }
    }else{
        if(value.id == "channelViewTableDrillNotPur"){
            shareDataHeaders = "Part Code,Current Month Distributor Retail (&#x20B9),Qty,Last 6 Month Average Sales (&#x20B9),Highest Qty ordered,% Contribution \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].PartCode).toString().replace(/,/g,"") + "," + (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"") + "," + (originalData[i].Qty).toString().replace(/,/g,"") + ","
                + (originalData[i].Avg_6_Month_Qty).toString().replace(/,/g,"") + ","+ (originalData[i].Highest_Qty).toString().replace(/,/g,"")+ "," +(originalData[i].Qty_Contrib).toString().replace(/,/g,"") +"\n";
            }
        }else if(value.id == "channelViewDrillM1M2M3"){
            command.displayName = " Retailer View ";
            command.reportDisplayName = "Retailer Summery " + title;
            shareDataHeaders = "Month,Total Purchase Value (&#x20B9),No.Of Orders,Days Between Orders,SKU Range,Highest Sales by Month (&#x20B9),Contribution to Overall Sales \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Month).toString().replace(/,/g,"") + "," + (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"") + "," + (originalData[i].Order_Count).toString().replace(/,/g,"")
                + ","+ (originalData[i].days_between_order).toString().replace(/,/g,"") + ","+ (originalData[i].SKU_Range).toString().replace(/,/g,"") + ","+(originalData[i].Max_Monthly_Sales).toString().replace(/,/g,"")+ "," +(originalData[i].Sales_Contrib).toString().replace(/,/g,"") +"\n";
            }
        }else if(value.id == "partGrouptableId"){
            command.displayName = " Retailer View ";
            command.reportDisplayName = "Part Group wise Sales " + title;
            shareDataHeaders = "Part Group,Current Month Purchase (&#x20B9),Unique SKUs Sold,Last 6 Month Average Sales (&#x20B9),Highest Sales Value (&#x20B9),% Contribution \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Part_Category).toString().replace(/,/g,"") + "," + (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"")
                + ","+ (originalData[i].Avg_6_Month_Sales).toString().replace(/,/g,"") + ","+ (originalData[i].Highest_Sales).toString().replace(/,/g,"") + ","+(originalData[i].Sales_Contrib).toString().replace(/,/g,"") +"\n";
            } 
        }else if(value.id == "channelViewDrillSpecific"){
            command.displayName = " Retailer View ";
            command.reportDisplayName = "Retailer Specific Recommended order " + title;
            shareDataHeaders = "Part Code,Current Month Purchase (&#x20B9),Qty,Last 6 Month Average Sales (&#x20B9),Highest Qty ordered,% Contribution \n";
            originalData = jQuery("#"+value.id).jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Partcode).toString().replace(/,/g,"") + "," + (originalData[i].Total_Purchase_Value).toString().replace(/,/g,"")
                + "," + (originalData[i].Avg_6_Month_Sales).toString().replace(/,/g,"") + ","+ (originalData[i].Highest_Qty).toString().replace(/,/g,"") + ","+(originalData[i].Sales_Contrib).toString().replace(/,/g,"") +"\n";
            } 
        }
    }
    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": title.toString()
    });
    $('#myModal').modal('show');
}