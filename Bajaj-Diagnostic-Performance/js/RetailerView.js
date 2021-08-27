//shared data Metrices
let noOfRetaiShareValues;
let avgSalesRetaiShareValues;
let invoiceFrRetaiShareValues;
let contribSaRetaiShareValues;
let skuRetaiShareValues;
let RetperDataObj;
let fromCount;
let toCount;
let drillFromCount;
let drillToCount;
let totalRetailerCount;
let limitRange = false;
let sharePartCode;
function retailerViewTableCreateApi() {
    fromCount = 1;
    toCount = 50;

    retailerViewTableCreateApiWithPagination(fromCount, toCount);
}

function retailerViewTableCreateApiWithPagination(fromCount, toCount) {
    $("#prePager").hide();
    $("#nextPager").hide();
    if (RetperDataObj) {
        RetperDataObj.abort();
        RetperDataObj = null;
    }

    let retailerperformData = createRetFilterData();
    retailerperformData.push({ dataType: "String", key: 'fromCount', value: fromCount.toString() });
    retailerperformData.push({ dataType: "String", key: 'toCount', value: toCount.toString() });


    RetperDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "[Retailer_View_Retailer_Performance_Page_V2]", 'chartDataForms': retailerperformData }),
        success: (function (resultData) {
            let retailertableData = resultData.data.data[0];
            RetperDataObj = null;
            showHideLoader("RetailerviewtableId", false)
            $(".loader").css('margin-left', '');
            if (retailertableData.length <= 0) {
                $("#RetailerviewtableId").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPager").show();
                $("#prePager").show();
                if (fromCount > 0) {
                    $("#nextPager").attr('disabled', true);
                    $("#prePager").attr('disabled', false);
                } else {
                    $("#nextPager").attr('disabled', false);
                    $("#prePager").attr('disabled', true);
                }
                $("#pager7").hide();
                return;
            }

            retailerViewTableCreate(retailertableData);
            $("#prePager").show();
            $("#pager7").hide();

        }),
        error: (function (err) {
            RetperDataObj = null;
            console.log(err);
        })
    });
}



function retailerViewTableCreate(retailertableData) {
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#RetailerviewtableId").jqGrid({
        data: retailertableData,
        datatype: "local",
        height: 326,
        width: 914,
        rowNum: 10,
        autowidth: false,
        shrinkToFit: false,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",


        colNames: ["Retailername", "RetailerCode", "City", "Sales Value(&#x20B9)",
            "Last 6 Month Avg",
            "% Contribution",
            "Day Since Last Order",
            "Retailer Segment",
            "Highest Sales By Retailer(&#x20B9)",
            "SKU Sold",
            "Invoice Frequency"
        ],


        colModel: [
            { name: 'ContactName', index: 'ContactName', sortable: true },
            { name: 'ContactCode', index: 'ContactCode', sortable: true },
            { name: 'City', index: 'City', sortable: true },
            { name: 'Sales', index: 'Sales', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Percent_Contrib', index: 'Percent_Contrib', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'days_since_last_order', index: 'days_since_last_order', sortable: true },
            { name: 'Retailer_Segment', index: 'Retailer_Segment', sortable: true },
            { name: 'Sales_Highest', index: 'Sales_Highest', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'SKU_Count', index: 'SKU_Count',  sorttype:'int', sortable: true },
            { name: 'Invoice_Frequncy', index: 'Invoice_Frequncy',  sorttype:'int', sortable: true }

        ],

        onSelectRow: function (rowId) {
            let rowData = $('#RetailerviewtableId').jqGrid('getRowData', rowId);
            retailerPart(rowData.ContactCode);
        },
        loadComplete: function () {
            if (fromCount <= 1) {
                $("#prePager").attr('disabled', true);
            } else {
                $("#prePager").attr('disabled', false);
            }
            $("#nextPager").show();
            $("#nextPager").attr('disabled', false);
            $("#pager7").hide();
        }

    });
    jQuery("#RetailerviewtableId").jqGrid('navGrid', '#pager7', { edit: false, add: false, del: false, refresh: true });

}

function prePageData() {
    if (fromCount > 0) {
        $("#pager7").show();
        $("#RetailerviewtableId").jqGrid('GridUnload');
        fromCount = fromCount - 50;
        toCount = toCount - 50;
        retailerViewTableCreateApiWithPagination(fromCount, toCount);
    }
};

function nextPageData() {
    $("#RetailerviewtableId").jqGrid('GridUnload');
    $("#pager7").show();
    fromCount = fromCount + 50;
    toCount = toCount + 50;
    retailerViewTableCreateApiWithPagination(fromCount, toCount);

};

function retailerPart(partCode) {
    $('.reportTitle').text('Recommended Parts for Retailer')
    $('#stateDiv').show();
    $('#retailernameDiv').hide();
    $('#districtDiv').show();
    $('#territoryDiv').show();
    $('#distributerDiv').hide();
    $('#retailerDiv').hide();
    $('#yearDiv').hide();
    $('#monthDiv').hide();
    $('#partCategoryDiv').show();
    $("#indiaContent").hide();
    $("#stateContent").hide();
    $("#distriContent").hide();
    $("#retailContent").hide();
    $("#retdrillContent").show();
    $("#pertContent").hide();
    $("#partdrillContent").hide();
    $("#perforContent").hide();

    $("#keyMetricsLoaderPartDrillDown").css('display', 'block');
    showHideLoader("retdrilltableId", true)
    $("#RetailerviewtableId").jqGrid('GridUnload');

    retailerNameAppend = true;
    callIndOrAnyView = false;
    changeFilter = false;

    currentPage = "retailerDrillView"
    filtterSelected(partCode, "RetailerID");
    retailerViewDrill(partCode);
}





//Retailer View Retailer Count
var retcountReqObj;
function retcountDataFromApi() {
    if (retcountReqObj) {
        retcountReqObj.abort();
        retcountReqObj = null;
    }

    noOfRetaiShareValues = null;
    let procedureName = "Retailer_View_Key_Metrics_Retailer_Count_V2";
    let retfilterdatacount = createRetFilterData();
    retcountReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: retfilterdatacount, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(retfilterdatacount)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Retailer_Count_V2", 'chartDataForms': retfilterdatacount }),
        success: (function (resultData) {
            let retcountData = resultData.data.data[0];
            noOfRetaiShareValues = retcountData;
            $("#retNumId td").remove();
            $("#retNumId td").empty();
            $("#retNumId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retcountData.length != 0) {
                totalRetailerCount = retcountData[0].CY_Count;
                $("#retNumId").append("<td class='metricsValue'>" + numberFormatter(retcountData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retNumId").append("<td class='metricsValue'>" + numberFormatter(retcountData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retNumId").append("<td class=" + addClassColor(retcountData[0].YoY_Count) + ">" + numberAvgFormatter(retcountData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retNumId").append("<td class='metricsValue'> 0 </td>");
            }
            retSkuDataFromApi();
            retcountReqObj = null;
            retcountData = null;
        }),
        error: (function (err) {
            retcountReqObj = null;
            console.log(err);
        })
    });
}

//Retailer View Avg sale
var retavgsaleReqObj;
function retAvgsaleDataFromApi() {
    if (retavgsaleReqObj) {
        retavgsaleReqObj.abort();
        retavgsaleReqObj = null;
    }
    avgSalesRetaiShareValues = null;
    let retfilterdatasale = createRetFilterData();
    let procedureName = "Retailer_View_Key_Metrics_Average_Sales_V2";
    retavgsaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: retfilterdatasale, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(retfilterdatasale)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Average_Sales_V2", 'chartDataForms': retfilterdatasale }),
        success: (function (resultData) {
            let retsaleData = resultData.data.data[0];
            avgSalesRetaiShareValues = retsaleData;
            $("#retAvg6Id td").remove();
            $("#retAvg6Id td").empty();
            $("#retAvg6Id").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retsaleData.length != 0) {
                $("#retAvg6Id").append("<td class='metricsValue'>" + numberFormatter(retsaleData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#retAvg6Id").append("<td class='metricsValue'>" + numberFormatter(retsaleData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#retAvg6Id").append("<td class=" + addClassColor(retsaleData[0].YoY_Sales) + ">" + numberAvgFormatter(retsaleData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#retAvg6Id").append("<td class='metricsValue'> 0 </td>");
            }
            // retInvoFreqDataFromApi();
            retavgsaleReqObj = null;
            retsaleData = null;
        }),
        error: (function (err) {
            retavgsaleReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View SKU Sold
var retavgskuReqObj;
function retSkuDataFromApi() {
    if (retavgskuReqObj) {
        retavgskuReqObj.abort();
        retavgskuReqObj = null;
    }
    skuRetaiShareValues = null;
    let retfilterdatasku = createRetFilterData();
    let procedureName = "Retailer_View_Key_Metrics_SKU_Count_V2";
    retavgskuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: retfilterdatasku, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(retfilterdatasku)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': retfilterdatasku }),
        success: (function (resultData) {
            let retskuData = resultData.data.data[0];
            skuRetaiShareValues = retskuData
            $("#retSkuId td").remove();
            $("#retSkuId td").empty();
            $("#retSkuId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retskuData.length != 0) {
                $("#retSkuId").append("<td class='metricsValue'>" + valueFormater(retskuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retSkuId").append("<td class='metricsValue'>" + valueFormater(retskuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retSkuId").append("<td class=" + addClassColor(retskuData[0].YoY_Count) + ">" + valueFormater(retskuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            retPerFreqDataFromApi();
            retavgskuReqObj = null;
            retskuData = null;
        }),
        error: (function (err) {
            retavgskuReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View Retailer Invoice freq
var retavgInvoReqObj;
function retInvoFreqDataFromApi() {
    if (retavgInvoReqObj) {
        retavgInvoReqObj.abort();
        retavgInvoReqObj = null;
    }

    invoiceFrRetaiShareValues = null;
    let retfilterdatafeq = createRetFilterData();
    let procedureName = "Retailer_View_Key_Metrics_Retailer_Invoice_Frequency_V2";
    retavgInvoReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: retfilterdatafeq, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(retfilterdatafeq)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Retailer_Invoice_Frequency_V2", 'chartDataForms': retfilterdatafeq }),
        success: (function (resultData) {
            let retfeqData = resultData.data.data[0];
            invoiceFrRetaiShareValues = retfeqData;
            $("#retInvoId td").remove();
            $("#retInvoId td").empty();
            $("#retInvoId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retfeqData.length != 0) {
                $("#retInvoId").append("<td class='metricsValue'>" + valueFormater(retfeqData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retInvoId").append("<td class='metricsValue'>" + valueFormater(retfeqData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retInvoId").append("<td class=" + addClassColor(retfeqData[0].YoY_Count) + ">" + valueFormater(retfeqData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retInvoId").append("<td class='metricsValue'> 0 </td>");
            }
            retavgInvoReqObj = null;
            retfeqData = null;
        }),
        error: (function (err) {
            retavgInvoReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View Percentage Contribution
var retavgPerReqObj;
function retPerFreqDataFromApi() {
    if (retavgPerReqObj) {
        retavgPerReqObj.abort();
        retavgPerReqObj = null;
    }
    contribSaRetaiShareValues = null;
    let retfilterdataper = createRetFilterData();
    let procedureName = "Retailer_View_Key_Percentage_Contrib_V2";
    retavgPerReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: retfilterdataper, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(retfilterdataper)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_View_Key_Percentage_Contrib_V2", 'chartDataForms': retfilterdataper }),
        success: (function (resultData) {
            let retperData = resultData.data.data[0];
            contribSaRetaiShareValues = retperData;
            $("#retcontriId td").remove();
            $("#retcontriId td").empty();
            $("#retcontriId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retperData.length != 0) {
                $("#retcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(retperData[0].CY_Percent, prefixSymbol = '') + " %</td>");
                $("#retcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(retperData[0].PY_Percent, prefixSymbol = '') + " %</td>");
                $("#retcontriId").append("<td class=" + addClassColor(retperData[0].YoY_Sales) + ">" + numberAvgFormatter(retperData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#retcontriId").append("<td class='metricsValue'> 0 </td>");
            }
            retavgPerReqObj = null;
            retperData = null;
            $("#keyMetricsLoaderRetai").css('display', 'none');
        }),
        error: (function (err) {
            retavgPerReqObj = null;
            console.log(err);
        })
    });
}

let status = true;
function createRetFilterData() {
    allRetailerFilterData = [];
    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    let stateData = $("#stateFilter").val();

    let categoryData = $("#partCategoryFilter").val();
    var notSelected = $("#partCategoryFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        categoryData = "";
    }
    // let territoryData=$("#territoryFilter").val();
    let territoryData = $("#territoryFilter").val();
    var notSelected1 = $("#territoryFilter").find('option').not(':selected');
    var arrayOfUnselectedTerry = notSelected1.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselectedTerry.length == 0) {
        territoryData = "";
    }

    let distributorData = '';
    //if (idMeta != '') {
        if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
    } else {
        distributorData = $("#distributorFilter").val();
        if(distributorData.length > 1){
        var notSelected = $("#distributorFilter").find('option').not(':selected');
        var arrayOfUnselected = notSelected.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            distributorData = "";
        }
      }
    }

    let segmentData = $("#segmentFilter").val();

    var notSelected = $("#segmentFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        segmentData = "";
    }

    let classifictionFilterData = $("#classifictionFilter").val();
    var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        classifictionFilterData = "";
    }

    allRetailerFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'RetailerSegment', value: segmentData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });

    return allRetailerFilterData;
}

let partCodeFullScope;
function retailerViewDrill(partCode) {
    drillFromCount = 1;
    drillToCount = 50;
    partCodeFullScope = partCode;
    sharePartCode = partCode;
    retailerPartCountDataFromApi(partCode);
    retailerViewDrillTableCreateApi(partCode, drillFromCount, drillToCount);
};



//Retailer Part Count
var partCountReqObj;
function retailerPartCountDataFromApi(partCode) {

    if (partCountReqObj) {
        partCountReqObj.abort();
        partCountReqObj = null;
    }

    let retailerpartfilterdata = createRetailerdrillFilterData(partCode)

    partCountReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_DrillDown_Part_NotOrdered_V2", 'chartDataForms': retailerpartfilterdata }),
        success: (function (resultData) {
            let partCountData = resultData.data.data[0];
            $("#keyMetricsLoaderPartDrillDown").css('display', 'none');
            partCountReqObj = null;

            $("#retdrillId td").remove();
            $("#retdrillId td").empty();
            if (partCountData.length != 0) {
                $("#retdrillId").append("<td class='metricsValue'>" + partCountData[0].Part_Count + " </td>");
            } else {
                $("#retdrillId").append("<td class='metricsValue'> 0 </td>");
            }
            partCountData = null;
        }),
        error: (function (err) {
            partCountReqObj = null;
            $("#keyMetricsLoaderPartDrillDown").css('display', 'none');
            console.log(err);
        })
    });

}

// RetailerTableDrillDownView
let RetperDrillDataObj;
function retailerViewDrillTableCreateApi(partCode, drillFromCount, drillToCount) {
    $("#nextPagerdrill").hide();
    $("#prePagerdrill").hide();
    $("#pager9").show();
    if (RetperDrillDataObj) {
        RetperDrillDataObj.abort();
        RetperDrillDataObj = null;
    }
    let retailerperDrillformData = createRetailerdrillFilterData(partCode);
    retailerperDrillformData.push({ dataType: "String", key: 'fromCount', value: drillFromCount.toString() });
    retailerperDrillformData.push({ dataType: "String", key: 'toCount', value: drillToCount.toString() });

    RetperDrillDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "DrillDown_Performance_pager_V2", 'chartDataForms': retailerperDrillformData }),
        success: (function (resultData) {
            let retailerdrilltableData = resultData.data.data[0];
            RetperDrillDataObj = null;
            showHideLoader("retdrilltableId", false)
            if (retailerdrilltableData.length <= 0) {
                //  $("#retdrilltableId").append("<div class='noData'>No Data</div>");
                $("#retdrilltableId").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerdrill").show();
                $("#prePagerdrill").show();
                if (drillFromCount > 0) {
                    $("#nextPagerdrill").attr('disabled', true);
                    $("#prePagerdrill").attr('disabled', false);
                } else {
                    $("#nextPagerdrill").attr('disabled', false);
                    $("#prePagerdrill").attr('disabled', true);
                }
                $("#pager9").hide();
                return;
            }
            retailerViewDrillTableCreate(retailerdrilltableData);
            $("#prePagerdrill").show();
            $("#pager9").hide();
        }),
        error: (function (err) {
            RetperDrillDataObj = null;
            showHideLoader("retdrilltableId", true)
            console.log(err);
        })
    });
}


function retailerViewDrillTableCreate(retailerdrilltableData) {
    if ($.fn.dataTable.isDataTable('#retdrilltableId')) {
        $('#retdrilltableId').DataTable().destroy();
    }
    var rowSet2 = []

    for (let i = 0; i < retailerdrilltableData.length; i++) {
        let row2 = [retailerdrilltableData[i].contactcode,
        retailerdrilltableData[i].ContactName,
        retailerdrilltableData[i].Partcode,
        retailerdrilltableData[i].Part_Category,
       // parseFloat(retailerdrilltableData[i].SalesPart).toFixed(2)
       getnumFormatterRupe(retailerdrilltableData[i].SalesPart)
        ];
        rowSet2.push(row2);
    };

    $('#retdrilltableId').DataTable({
        data: rowSet2,
        bFilter: false,
        bAutoWidth: true,
        bLengthChange: false,
        scrollY: "300px",
        scrollCollapse: true,
        paging: false,
        bInfo: false,
        class: "custom_table",
        columns: [
            { title: "Retailer ID" },
            { title: "Retailer Name" },
            { title: "Part Code" },
            { title: "Part Name", height: 2 },
            { title: "Highest sales by Retailer(&#x20B9)" }
        ],


    });
    if (drillFromCount <= 1) {
        $("#prePagerdrill").attr('disabled', true);
    } else {
        $("#prePagerdrill").attr('disabled', false);
    }
    $("#nextPagerdrill").show();
    $("#nextPagerdrill").attr('disabled', false);
    $("#pager9").hide();

}

function prePageDataDrill() {
    if (drillFromCount > 0) {
        $("#pager9").show();
        drillFromCount = drillFromCount - 50;
        drillToCount = drillToCount - 50;
        retailerViewDrillTableCreateApi(partCodeFullScope, drillFromCount, drillToCount);
    }
};

function nextPageDataDrill() {
    $("#pager9").show();
    drillFromCount = drillFromCount + 50;
    drillToCount = drillToCount + 50;
    retailerViewDrillTableCreateApi(partCodeFullScope, drillFromCount, drillToCount);
};








//Retailer Drill Down Filter
function createRetailerdrillFilterData(partCode) {
    allretdrillFilterData = [];

    let territoryData = $("#territoryFilter").val();
    if(territoryData.length== 1 &&keyPersentInFilterSelection("territoryFilter")){
    }else{
    var notSelected1 = $("#territoryFilter").find('option').not(':selected');
    var arrayOfUnselectedTerry = notSelected1.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselectedTerry.length == 0) {
        territoryData = "";
    }
}
    let districtData = $("#districtFilter").val();
    if(districtData.length== 1 &&keyPersentInFilterSelection("districtFilter")){
    }else{
    var notSelected2 = $("#districtFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected2.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        districtData = "";
    }
}

    let classifictionFilterData = $("#classifictionFilter").val();
    if(classifictionFilterData.length== 1 &&keyPersentInFilterSelection("classifictionFilter")){
    }else{
    var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        classifictionFilterData = "";
    }
}
    
    let stateData = $("#stateFilter").val();

    let categoryData = $("#partCategoryFilter").val();
    if(categoryData.length== 1 &&keyPersentInFilterSelection("partCategoryFilter")){
    }else{
    var notSelected5 = $("#partCategoryFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected5.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        categoryData = "";
    }
}

    
    let distributorData ='';
    if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
   }else{
     distributorData=$("#distributorFilter").val();
     if(distributorData.length== 1 &&keyPersentInFilterSelection("distributorFilter")){
    }else{
    var notSelected = $("#distributorFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected==0){
        distributorData="";
    }
  }
}
     allretdrillFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allretdrillFilterData.push({ dataType: "String", key: 'RetailerID', value: partCode.toString() });

    if (territoryData != '') {
        allretdrillFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    }
    if (districtData != '') {
        allretdrillFilterData.push({ dataType: "String", key: 'District', value: districtData.toString() });
    }
    if (classifictionFilterData != '') {
        allretdrillFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });
    }
    if (categoryData != '') {
        allretdrillFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    }
    if (distributorData != '') {
        allretdrillFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    }
    return allretdrillFilterData;
}


function sharedDataRetailCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let shareNooFRetai = "No of Retailer," + sharedFormatter(noOfRetaiShareValues[0].CY_Count) + "," + sharedFormatter(noOfRetaiShareValues[0].CY_Count) + "," + sharedFormatter(noOfRetaiShareValues[0].CY_Count) + "%";
    let shareSixMonSale = "Avg of Last 6 Months Sales(INR)," + sharedFormatter(avgSalesRetaiShareValues[0].CY_Sales) + "," + sharedFormatter(avgSalesRetaiShareValues[0].PY_Sales) + "," + sharedFormatter(avgSalesRetaiShareValues[0].YoY_Sales) + "%";
    let shareInvoiceFre = "Retailer Invoice Frequency," + sharedFormatter(invoiceFrRetaiShareValues[0].CY_Count) + "," + sharedFormatter(invoiceFrRetaiShareValues[0].PY_Count) + "," + sharedFormatter(invoiceFrRetaiShareValues[0].YoY_Count) + "%";
    let shareContribSale = "% Contribution to Sales," + sharedFormatter(contribSaRetaiShareValues[0].CY_Percent) + "," + sharedFormatter(contribSaRetaiShareValues[0].PY_Percent) + "," + sharedFormatter(contribSaRetaiShareValues[0].YoY_Sales) + "%";
    let shareSku = "#SKUs Sold," + sharedFormatter(skuRetaiShareValues[0].CY_Count) + "," + sharedFormatter(skuRetaiShareValues[0].PY_Count) + "," + sharedFormatter(skuRetaiShareValues[0].YoY_Count) + "%";


    let sharedData = "Category,CY,LY,YOY Growth \n" + shareNooFRetai + "\n" + shareSixMonSale + "\n" + shareSku + "\n" + shareInvoiceFre + "\n" + shareContribSale + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');
}   


let RetperDataObjPager;
function retailerPerformancePageShareData(){

    if (RetperDataObjPager) {
        RetperDataObjPager.abort();
        RetperDataObjPager = null;
    }
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = " Retailer Performance ";
    command.reportDisplayName = "Retailer Performance Top 500 Details of " + title;
    command.filterData = filterData

    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    limitRange = true;

    let fromZeroCount=0;
    let toLastCount = 500;
    let retailerperformData = createRetFilterData();
    retailerperformData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
    retailerperformData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
    $('#myShareModal').modal('show');

    RetperDataObjPager = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "[Retailer_View_Retailer_Performance_Page_V2]", 'chartDataForms': retailerperformData }),
        success: (function (resultData) {
            $('#myShareModal').modal('hide');
           originalData = resultData.data.data[0];
           shareDataHeaders = "Retailer Name,Retailer Code,City,Sales Value,Last 6 Months Avg,%Contribution,Day Since last Order,Retailer Segment,Highest Sales By Retailer,SKU Sold,Invoice Frequency\n"
           sharedData += shareDataHeaders;
           for (let i = 0; i < originalData.length; i++) {
               sharedData += (nullModification(originalData[i].ContactName)).toString().replace(/,/g,"") + "," + (nullModification(originalData[i].ContactCode)).toString() + "," + (nullModification(originalData[i].City)).toString() + "," + parseFloat(nullModification(originalData[i].Sales)).toFixed(2).toString() + "," + parseFloat(nullModification(originalData[i].Last_6_month_Average)).toFixed(2).toString() + "," + parseFloat(nullModification(originalData[i].Percent_Contrib)).toFixed(2).toString() + "," + (nullModification(originalData[i].days_since_last_order)).toString() + "," + (nullModification(originalData[i].Retailer_Segment)).toString() + "," + parseFloat(nullModification(originalData[i].Sales_Highest)).toFixed(2).toString() + "," + (nullModification(originalData[i].SKU_Count)).toString() + "," + (nullModification(originalData[i].Invoice_Frequncy)).toString() + "\n";
           }
           shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
           trackCustomEvent('Share Data Pop up Open', {
               "companyId": companyId.toString(),
               "userId": userId.toString(),
               "dashboardId": dashboardId.toString(),
               "reportName": reportTitle.toString()
           });
           RetperDataObjPager = null;
           $('#myModal').modal('show');
        }),
        error: (function (err) {
            RetperDataObjPager = null;
            console.log(err);
            originalData =  null;
        })
    });


}

function nullModification(num){
    if(num == null || num == undefined){
        return ""
    }
    return num;
}


// ###########################     CSV download start       #################################################

let sharedData=[];
function retailerPerformancePageShareDataDownload(){  
    const retailerFilterData = createRetFilterData();
 sharedData.push(["Retailer Name","Retailer Code","City","Sales Value","Last 6 Months Avg","%Contribution","Day Since last Order","Retailer Segment","Highest Sales By Retailer","SKU Sold","Invoice Frequency"]);
 getFetchAllRetailerPerformanceBaseOnFilter(retailerFilterData);      
}

function getFetchAllRetailerPerformanceBaseOnFilter(retailerFilterData){  
  const retailerFilterDataWithPagi = getFilterData(retailerFilterData);
getFetchRetailerPerformanceDataInBatch(retailerFilterDataWithPagi);      
}

 function getFetchRetailerPerformanceDataInBatch(retailerperformData){    
     $.ajax({
        url: getApiDomain(),
        type: 'POST',
        async : true,
        data: JSON.stringify({ 'filter': "[Retailer_View_Retailer_Performance_Page_V2]", 'chartDataForms': retailerperformData }),
        success: (function (resultData) {      
            let originalData = resultData.data.data[0];                          

       for (let i = 0; i < originalData.length; i++) {
        const sharedDataconvArray = [];
         sharedDataconvArray.push(originalData[i].ContactName);
         sharedDataconvArray.push(originalData[i].ContactCode);
         sharedDataconvArray.push(originalData[i].City);
         sharedDataconvArray.push(parseFloat(originalData[i].Sales)).toFixed(2);
         sharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
         sharedDataconvArray.push(parseFloat(originalData[i].Percent_Contrib)).toFixed(2);
         sharedDataconvArray.push(originalData[i].days_since_last_order);
         sharedDataconvArray.push(originalData[i].Retailer_Segment);
         sharedDataconvArray.push(parseFloat(originalData[i].Sales_Highest)).toFixed(2);;
         sharedDataconvArray.push(originalData[i].SKU_Count);
         sharedDataconvArray.push(originalData[i].Invoice_Frequncy);
         sharedData.push(sharedDataconvArray);         
            }    
            
             
            if(originalData.length >= 500 ){
                getFetchAllRetailerPerformanceBaseOnFilter(retailerperformData);
              }else{              
                exportToCsv('RetailerPerformance.csv',sharedData);
                sharedData = [];
                $('#downloadCsvLoader,#banDownload').hide();
                $('#showDownload').show();
                $("#retailerCsvDownload").removeAttr("disabled");
                methodQueueRerun();
              }   
          
        }),
        error: (function (err) {
             console.log(err);
            originalData =  null;
            sharedData = [];
            $('#downloadCsvLoader').hide();
            $("#retailerCsvDownload").removeAttr("disabled");
            methodQueueRerun();
            
        })
    });

}

// ########################## retailer drill down csv download   ############################################################



let sharedDataRetDrillDown = [];
function retailerPerfDrillDownDataDownload(){  
    const retailerFilterDrilldownData = createRetailerdrillFilterData(sharePartCode);
 sharedDataRetDrillDown.push(["Retailer Id","Retailer Name","Part Code","Part Name","Highest Sales By Retailer"]);
 getFetchAllRetaiPerfDirllDownBaseOnFilter(retailerFilterDrilldownData);      
}

function getFetchAllRetaiPerfDirllDownBaseOnFilter(retailerFilterDrilldownData){  
  const retaDrillFilterDataWithPagi = getFilterData(retailerFilterDrilldownData);
getFetchRetailerPerformanceDirllDownDataInBatch(retaDrillFilterDataWithPagi);      
}

 function getFetchRetailerPerformanceDirllDownDataInBatch(retailerFilterDrilldownData){    
     $.ajax({
        url: getApiDomain(),
        type: 'POST',
        async : true,
        data: JSON.stringify({ 'filter': "[DrillDown_Performance_pager_V2]", 'chartDataForms': retailerFilterDrilldownData }),
        success: (function (resultData) {      
            let originalData = resultData.data.data[0];                          

       for (let i = 0; i < originalData.length; i++) {
     
        const sharedDataRetDrillDownconvArray = [];
        sharedDataRetDrillDownconvArray.push(originalData[i].contactcode);
         sharedDataRetDrillDownconvArray.push(originalData[i].ContactName);
         sharedDataRetDrillDownconvArray.push(originalData[i].Partcode);
         sharedDataRetDrillDownconvArray.push(originalData[i].Part_Category);
         sharedDataRetDrillDownconvArray.push(parseFloat(originalData[i].SalesPart)).toFixed(2);
         sharedDataRetDrillDown.push(sharedDataRetDrillDownconvArray);         
            }    
            
          
            if(originalData.length >= 500 ){
                getFetchAllRetaiPerfDirllDownBaseOnFilter(retailerFilterDrilldownData);
              }else{              
                exportToCsv('PartCategoryPerformance.csv',sharedDataRetDrillDown);
                sharedDataRetDrillDown = [];
                $('#downloadCsvLoader,#banDownloadRetailerDril').hide();
                $('#showDownloadRetailerDril').show();
                $("#retailerCsvDownloadRetailerDril").removeAttr("disabled");
                methodQueueRerun();
              }   
          
        }),
        error: (function (err) {
             console.log(err);
            originalData =  null;
            sharedDataRetDrillDown = [];
            $('#downloadCsvLoader').hide();
            $("#retailerCsvDownloadRetailerDril").removeAttr("disabled");
            methodQueueRerun();
            
            
        })
    });

}




