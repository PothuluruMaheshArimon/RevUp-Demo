//shared data Metrices
let potentialPartShareValues;
let penetraPartShareValues;
let retaiInFrePartShareValues;
let perContribuPartShareValues;
let skuPartShareValues;
//drill Metrices
let noOfRetaDidNotShareValues;
let highSaleRetaiShareValues;
let fromCount1;
let toCount1;
let fromCount2;
let toCount2;
let drillFromCount1;
let drillToCount1;

//Part View Potential
var partPotReqObj;
function partPotDataFromApi() {
    if (partPotReqObj) {
        partPotReqObj.abort();
        partPotReqObj = null;
    }
    potentialPartShareValues = null;
    let partfilterdatapot = createPartFilterData();
    partPotReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Key_Metrics_Potential_V2", 'chartDataForms': partfilterdatapot }),
        success: (function (resultData) {
            let partpotData = resultData.data.data[0];
            potentialPartShareValues = partpotData;
            partSKUDataFromApi();

            $("#partPonId td").remove();
            $("#partPonId td").empty();
            if (partpotData.length != 0) {
                $("#partPonId").append("<td class='metricsValue'>" + numberFormatter(partpotData[0].CY_Potential, prefixSymbol = '') + " </td>");
                $("#partPonId").append("<td class='metricsValue'>" + numberFormatter(partpotData[0].PY_Potential, prefixSymbol = '') + " </td>");
                $("#partPonId").append("<td class=" + addClassColor(partpotData[0].YoY_Potential) + ">" + numberAvgFormatter(partpotData[0].YoY_Potential, prefixSymbol = '') + "%</td>");
            } else {
                $("#partPonId").append("<td class='metricsValue'> 0 </td>");
            }
            partPotReqObj = null;
            partpotData = null;
        }),
        error: (function (err) {
            partPotReqObj = null;
            console.log(err);
        })
    });
}

//Part View Penetration
var partPeneReqObj;
function partPenetDataFromApi() {
    if (partPeneReqObj) {
        partPeneReqObj.abort();
        partPeneReqObj = null;
    }
    penetraPartShareValues = null;
    let partfilterdatapene = createPartFilterData();
    partPeneReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_VIew_Key_Metrics_Penetration_V2", 'chartDataForms': partfilterdatapene }),
        success: (function (resultData) {
            let partpeneData = resultData.data.data[0];
            penetraPartShareValues = partpeneData;
            $("#partPenId td").remove();
            $("#partPenId td").empty();
            if (partpeneData.length != 0) {
                $("#partPenId").append("<td class='metricsValue'>" + numberFormatter(partpeneData[0].CY_Penetration, prefixSymbol = '') + " %</td>");
                $("#partPenId").append("<td class='metricsValue'>" + numberFormatter(partpeneData[0].PY_Penetration, prefixSymbol = '') + " %</td>");
                $("#partPenId").append("<td class=" + addClassColor(partpeneData[0].YoY_Penetration) + ">" + numberAvgFormatter(partpeneData[0].YoY_Penetration, prefixSymbol = '') + "%</td>");
            } else {
                $("#partPenId").append("<td class='metricsValue'> 0 </td>");
            }
            partRetInvoDataFromApi();
            partPeneReqObj = null;
            partpeneData = null;
        }),
        error: (function (err) {
            partPeneReqObj = null;
            console.log(err);
        })
    });
}

//Part View SKU Sold
var partSkuReqObj;
function partSKUDataFromApi() {
    if (partSkuReqObj) {
        partSkuReqObj.abort();
        partSkuReqObj = null;
    }

    skuPartShareValues = null;
    let partfilterdatasku = createPartFilterData();
    partSkuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': partfilterdatasku }),
        success: (function (resultData) {
            let partskuData = resultData.data.data[0];
            skuPartShareValues = partskuData;
            $("#partSkuId td").remove();
            $("#partSkuId td").empty();
            if (partskuData.length != 0) {
                $("#partSkuId").append("<td class='metricsValue'>" + valueFormater(partskuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#partSkuId").append("<td class='metricsValue'>" + valueFormater(partskuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#partSkuId").append("<td class=" + addClassColor(partskuData[0].YoY_Count) + ">" + valueFormater(partskuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#partSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            partContriDataFromApi();
            partSkuReqObj = null;
            partskuData = null;
        }),
        error: (function (err) {
            partSkuReqObj = null;
            console.log(err);
        })
    });
}

//Part View RetailerInvoice Frequency
var partretinoReqObj;
function partRetInvoDataFromApi() {
    if (partretinoReqObj) {
        partretinoReqObj.abort();
        partretinoReqObj = null;
    }
    retaiInFrePartShareValues = null;
    let partfilterdataretinvo = createPartFilterData();
    partretinoReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Key_Metrics_Retailer_Invoice_Frequency_V2", 'chartDataForms': partfilterdataretinvo }),
        success: (function (resultData) {
            let partskuData = resultData.data.data[0];
            retaiInFrePartShareValues = partskuData;
            $("#partInvoId td").remove();
            $("#partInvoId td").empty();
            if (partskuData.length != 0) {
                $("#partInvoId").append("<td class='metricsValue'>" + valueFormater(partskuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#partInvoId").append("<td class='metricsValue'>" + valueFormater(partskuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#partInvoId").append("<td class=" + addClassColor(partskuData[0].YoY_Count) + ">" + valueFormater(partskuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#partInvoId").append("<td class='metricsValue'> 0 </td>");
            }
            partretinoReqObj = null;
            partskuData = null;
        }),
        error: (function (err) {
            partretinoReqObj = null;
            console.log(err);
        })
    });
}

//Part View Contribution to sales 
var partcontsaleReqObj;
function partContriDataFromApi() {
    if (partcontsaleReqObj) {
        partcontsaleReqObj.abort();
        partcontsaleReqObj = null;
    }
    perContribuPartShareValues = null;
    let partfilterdatacontsale = createPartFilterData();
    partcontsaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Key_Percentage_Contrib_V2", 'chartDataForms': partfilterdatacontsale }),
        success: (function (resultData) {
            let partskuData = resultData.data.data[0];
            perContribuPartShareValues = partskuData;
            $("#partcontriId td").remove();
            $("#partcontriId td").empty();
            if (partskuData.length != 0) {
                $("#partcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(partskuData[0].CY_Percent, prefixSymbol = '') + " %</td>");
                $("#partcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(partskuData[0].PY_Percent, prefixSymbol = '') + " %</td>");
                $("#partcontriId").append("<td class=" + addClassColor(partskuData[0].YoY_Sales) + ">" + numberAvgFormatter(partskuData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#partcontriId").append("<td class='metricsValue'> 0 </td>");
            }
            partcontsaleReqObj = null;
            partskuData = null;
            $("#keyMetricsLoaderPart").css('display', 'none');
        }),
        error: (function (err) {
            partcontsaleReqObj = null;
            console.log(err);
        })
    });
}


// PartTableView
let PartperDataObj;
function partViewTableCreateApi() {
    fromCount1 = 1;
    toCount1 = 50;
    partViewTableCreateApiWithPagination(fromCount1, toCount1)
}

function partViewTableCreateApiWithPagination(fromCount1, toCount1) {
    $("#prePagerPartView1").hide();
    $("#nextPagerPartView1").hide();
    if (PartperDataObj) {
        PartperDataObj.abort();
        PartperDataObj = null;
    }

    let partperformData = createPartFilterData();
    partperformData.push({ dataType: "String", key: 'fromCount', value: fromCount1.toString() });
    partperformData.push({ dataType: "String", key: 'toCount', value: toCount1.toString() });


    PartperDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Part_Category_Performance_pager_V2", 'chartDataForms': partperformData }),
        success: (function (resultData) {
            let parttableData = resultData.data.data[0];
            PartperDataObj = null;
            if (parttableData.length <= 0) {
                //$("#PartviewtableId").append("<div class='noData'>No Data</div>");
                $("#PartviewtableId").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerPartView1").show();
                $("#prePagerPartView1").show();
                if (fromCount > 0) {
                    $("#nextPagerPartView1").attr('disabled', true);
                    $("#prePagerPartView1").attr('disabled', false);
                } else {
                    $("#nextPagerPartView1").attr('disabled', false);
                    $("#prePagerPartView1").attr('disabled', true);
                }
                $("#pager10").hide();
                return;
            }
            partViewTableCreate(parttableData);
            $("#prePagerPartView1").show();
            $("#pager10").hide();
        }),
        error: (function (err) {
            PartperDataObj = null;
            console.log(err);
        })
    });
}


function partViewTableCreate(parttableData) {
    jQuery("#partviewtableId").jqGrid({
        data: parttableData,
        datatype: "local",
        height: 140,
        width: 914,
        rowNum: 10,
        autowidth: false,
        shrinkToFit: false,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Group", "Sales(&#x20B9)", "Qty", "Last 6 Month Avg", "Sku Count", "Retailer Count", "Qty Highest", "% Contribution"
        ],
        colModel: [
            { name: 'Part_Category', index: 'Part_Category', sortable: true },
            { name: 'Sales', index: 'Sales', formatter: getnumFormatterRupe,   sorttype:'int', sortable: true },
            { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
            { name: 'SKU_Count', index: 'SKU_Count',  sorttype:'int', sortable: true },
            { name: 'Retailer_Count', index: 'Retailer_Count', formatter:getnumFormatterRupe,  sorttype:'int', sortable: true },
            { name: 'Qty_Highest', index: 'Qty_Highest', formatter:getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Percent_Contrib', index: 'Percent_Contrib', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },

        ],


        loadComplete: function () {
            if (fromCount1 <= 1) {
                $("#prePagerPartView1").attr('disabled', true);
            } else {
                $("#prePagerPartView1").attr('disabled', false);
            }
            $("#nextPagerPartView1").show();
            $("#nextPagerPartView1").attr('disabled', false);
            $("#pager10").hide();
        }
    });

    jQuery("#partviewtableId").jqGrid('navGrid', '#pager10', { edit: false, add: false, del: false, refresh: true });


}


function prePageDataPartView1() {
    if (fromCount1 > 0) {
        $("#partviewtableId").jqGrid('GridUnload');
        $("#pager10").show();
        fromCount1 = fromCount1 - 50;
        toCount1 = toCount1 - 50;
        partViewTableCreateApiWithPagination(fromCount1, toCount1);
    }
};

function nextPageDataPartView1() {
    $("#partviewtableId").jqGrid('GridUnload');
    $("#pager10").show();
    fromCount1 = fromCount1 + 50;
    toCount1 = toCount1 + 50;
    partViewTableCreateApiWithPagination(fromCount1, toCount1);

};



// PartTable Second View
let PartperSecDataObj;
function partViewSecTableCreateApi() {//(partcode){
    fromCount2 = 1;
    toCount2 = 50;

    partViewSecTableCreateApiwithPagination(fromCount2, toCount2);

}

function partViewSecTableCreateApiwithPagination(fromCount2, toCount2) {
    $("#prePagerPartView2").hide();
    $("#nextPagerPartView2").hide();
    $("#pager11").show();
    if (PartperSecDataObj) {
        PartperSecDataObj.abort();
        PartperSecDataObj = null;
    }

    let partperformData1 = createPartFilterData();
    partperformData1.push({ dataType: "String", key: 'fromCount', value: fromCount2.toString() });
    partperformData1.push({ dataType: "String", key: 'toCount', value: toCount2.toString() });



    PartperSecDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Part_Performance_pager_V2", 'chartDataForms': partperformData1 }),
        success: (function (resultData) {
            let parttableData1 = resultData.data.data[0];
            PartperSecDataObj = null;
            if (parttableData1.length <= 0) {
                //$("#PartviewtableId1").append("<div class='noData'>No Data</div>");
                $("#PartviewtableId1").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerPartView2").show();
                $("#prePagerPartView2").show();
                if (fromCount2 > 0) {
                    $("#nextPagerPartView2").attr('disabled', true);
                    $("#prePagerPartView2").attr('disabled', false);
                } else {
                    $("#nextPagerPartView2").attr('disabled', false);
                    $("#prePagerPartView2").attr('disabled', true);
                }
                $("#pager11").hide();

                return;
            }
            partViewSecTableCreate(parttableData1);
            $("#prePagerPartView2").show();
            $("#pager11").hide();

        }),
        error: (function (err) {
            PartperSecDataObj = null;
            console.log(err);
        })
    });
}

function partViewSecTableCreate(parttableData1) {
    jQuery("#partviewtableId1").jqGrid({
        data: parttableData1,
        datatype: "local",
        height: 140,
        width: 914,
        rowNum: 10,
        autowidth: false,
        shrinkToFit: false,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Part Code", "Sales(&#x20B9)", "Qty", "Last 6 Month Avg", "Sku Count", "Retailer Count", "Qty Highest", "% Contribution"
        ],

        colModel: [
            { name: 'Partcode', index: 'Partcode', sorttype:'int', sortable: true },
            { name: 'Sales', index: 'Sales', formatter: getnumFormatterRupe,   sorttype:'int', sortable: true },
            { name: 'Qty', index: 'Qty', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },
            { name: 'SKU_Count', index: 'SKU_Count',  sorttype:'int', sortable: true },
            { name: 'Retailer_Count', index: 'Retailer_Count', formatter: getnumFormatterRupe,  sorttype:'int',sortable: true },
            { name: 'Qty_Highest', index: 'Qty_Highest', formatter:getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Percent_Contrib', index: 'Percent_Contrib', formatter: getnumFormatterRupe,  sorttype:'int', sortable: true },

        ],


        onSelectRow: function (rowId) {
            let rowData = $('#partviewtableId1').jqGrid('getRowData', rowId);
            Partviewdrill1(rowData.Partcode);
        },
        loadComplete: function () {
            if (fromCount2 <= 1) {
                $("#prePagerPartView2").attr('disabled', true);
            } else {
                $("#prePagerPartView2").attr('disabled', false);
            }
            $("#nextPagerPartView2").show();
            $("#nextPagerPartView2").attr('disabled', false);
            $("#pager11").hide();
        }
    });

    jQuery("#partviewtableId1").jqGrid('navGrid', '#pager11', { edit: false, add: false, del: false, refresh: true });


}
function Partviewdrill1(partCode) {

    let partFilters = [];
    callIndOrAnyView = false;


    $('.reportTitle').text('Recommended Retailers for Selected Part')
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
    $("#retdrillContent").hide();
    $("#pertContent").hide();
    $("#partdrillContent").show();
    $("#perforContent").hide();

    $("#keyMetricsLoaderPartDrill").css('display', 'block');

    // showHideLoader("partdrilltableId",true)
    $("#partviewtableId1").jqGrid('GridUnload');

    currentPage = "partDrillView"
    filtterSelected(partCode, "PartCode");
    sharePartCode=partCode;
    partViewDrill(partCode);
}


function prePageDataPartView2() {
    if (fromCount2 > 0) {
        $("#pager11").show();
        $("#partviewtableId1").jqGrid('GridUnload');
        fromCount2 = fromCount2 - 50;
        toCount2 = toCount2 - 50;
        partViewSecTableCreateApiwithPagination(fromCount2, toCount2);
    }
};

function nextPageDataPartView2() {
    $("#pager11").show();
    $("#partviewtableId1").jqGrid('GridUnload');
    fromCount2 = fromCount2 + 50;
    toCount2 = toCount2 + 50;
    partViewSecTableCreateApiwithPagination(fromCount2, toCount2);

};




let partViewStatus = true;
function createPartFilterData() {
    allPartFilterData = [];
    $("#keyMetricsLoader").css('display', 'block');
    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    // let stateData=$("#stateFilter").val();

    let categoryData = $("#partCategoryFilter").val();
    var notSelected = $("#partCategoryFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        categoryData = "";
    }

    let distributorData = '';
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


    let stateData = $("#stateFilter").val();

    let territoryData = $("#territoryFilter").val();
    var notSelected1 = $("#territoryFilter").find('option').not(':selected');
    var arrayOfUnselectedTerry = notSelected1.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselectedTerry.length == 0) {
        territoryData = "";
    }
    let districtData = $("#districtFilter").val();
    var notSelected2 = $("#districtFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected2.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        districtData = "";
    }

    let classifictionFilterData = $("#classifictionFilter").val();
    var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        classifictionFilterData = "";
    }



    allPartFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allPartFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allPartFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allPartFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allPartFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allPartFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    allPartFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });

    return allPartFilterData;
}

let partCodeFullScope1;
function partViewDrill(partcode) {
    drillFromCount1 = 1;
    drillToCount1 = 50;
    partCodeFullScope1 = partcode
    PartHighSalesDataFromApi(partcode);
    partViewDrillTableCreateApiwithPaginationDrill(partcode, drillFromCount1, drillToCount1);

};

//Part Drill Highest Sales
var partHighSaleReqObj;
function PartHighSalesDataFromApi(partcode) {
    if (partHighSaleReqObj) {
        partHighSaleReqObj.abort();
        partHighSaleReqObj = null;
    }

    let parthighfilterdata = createPartdrillFilterData(partcode)

    highSaleRetaiShareValues = null;
    partHighSaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_DrillDown_Retailer_HighestSales_V2", 'chartDataForms': parthighfilterdata }),
        success: (function (resultData) {
            let parthighsaleData = resultData.data.data[0];
            partHighSaleReqObj = null;
            highSaleRetaiShareValues = parthighsaleData;

            $("#partdrillId td").remove();
            $("#partdrillId td").empty();
            if (parthighsaleData.length != 0) {
                $("#partdrillId").append("<td class='metricsValue'>" + numberAvgFormatter(parthighsaleData[0].HighestSales) + "  </td>");
            } else {
                $("#partdrillId").append("<td class='metricsValue'> 0 </td>");
            }
            PartNotBoughtDataFromApi(partcode);
            parthighsaleData = null;

        }),
        error: (function (err) {
            partHighSaleReqObj = null;

            console.log(err);
        })
    });
}

//part Drill Highest Sales
var partNotBoughtReqObj;
function PartNotBoughtDataFromApi(partcode) {
    if (partNotBoughtReqObj) {
        partNotBoughtReqObj.abort();
        partNotBoughtReqObj = null;
    }
    noOfRetaDidNotShareValues = null;
    let partNotBoufilterdata = createPartdrillFilterData(partcode)

    partNotBoughtReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_DrillDown_Retailer_NotOrdered_V2", 'chartDataForms': partNotBoufilterdata }),
        success: (function (resultData) {
            let partNotBoData = resultData.data.data[0];
            partNotBoughtReqObj = null;
            noOfRetaDidNotShareValues = partNotBoData;
            $("#keyMetricsLoaderPartDrill").css('display', 'none');
            $("#partdrillId1 td").remove();
            $("#partdrillId1 td").empty();
            if (partNotBoData.length != 0) {
                $("#partdrillId1").append("<td class='metricsValue'>" + parseInt(partNotBoData[0].Retailer_Count) + " </td>");
            } else {
                $("#partdrillId1").append("<td class='metricsValue'> 0 </td>");
            }
            partNotBoData = null;

        }),
        error: (function (err) {
            partNotBoughtReqObj = null;

            console.log(err);
        })
    });
}


// PartTableDrillDownView
let PartperDrillDataObj;
function partViewDrillTableCreateApiwithPaginationDrill(partcode, drillFromCount1, drillToCount1) {
    $("#nextPagerPartViewDrill").hide();
    $("#prePagerPartViewDrill").hide();
    $("#pager9").show();
    if (PartperDrillDataObj) {
        PartperDrillDataObj.abort();
        PartperDrillDataObj = null;
    }
    let partperDrillformData = createPartdrillFilterData(partcode);
    partperDrillformData.push({ dataType: "String", key: 'fromCount', value: drillFromCount1.toString() });
    partperDrillformData.push({ dataType: "String", key: 'toCount', value: drillToCount1.toString() });

    PartperDrillDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "DrillDown_Performance_pager_V2", 'chartDataForms': partperDrillformData }),
        success: (function (resultData) {
            let partperDrillformData = resultData.data.data[0];
            PartperDrillDataObj = null;
            showHideLoader("partdrilltableId", false);
            if (partperDrillformData.length <= 0) {
                // $("#partdrilltableId").append("<div class='noData'>No Data</div>");
                $("#partdrilltableId").append("<div class='noData' style='margin-top: 10%; font-size: 20px; height: 42%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerPartViewDrill").show();
                $("#prePagerPartViewDrill").show();
                if (drillFromCount > 0) {
                    $("#nextPagerPartViewDrill").attr('disabled', true);
                    $("#prePagerPartViewDrill").attr('disabled', false);
                } else {
                    $("#nextPagerPartViewDrill").attr('disabled', false);
                    $("#prePagerPartViewDrill").attr('disabled', true);
                }
                $("#pager12").hide();
                return;
            }
            partViewDrillTableCreate(partperDrillformData);
            $("#prePagerPartViewDrill").show();
            $("#pager12").hide();
        }),
        error: (function (err) {
            PartperDrillDataObj = null;
            console.log(err);
        })
    });
}


function partViewDrillTableCreate(partdrilltableData) {
    if ($.fn.dataTable.isDataTable('#partdrilltableId')) {
        $('#partdrilltableId').DataTable().destroy();
    }
    var rowSet3 = []

    for (let i = 0; i < partdrilltableData.length; i++) {
        let row3 = [partdrilltableData[i].contactcode,
        partdrilltableData[i].ContactName,
        partdrilltableData[i].Partcode,
        partdrilltableData[i].PartName,
        // partdrilltableData[i].Retailer_Sales_6_Months
      //  parseFloat(partdrilltableData[i].SalesRetailer).toFixed(2)
      getnumFormatterRupe(partdrilltableData[i].SalesRetailer)
        ];
        rowSet3.push(row3);
    };
    $('#partdrilltableId').DataTable({
        data: rowSet3,
        bFilter: false,
        autoWidth: true,
        bLengthChange: false,
        scrollY: "315px",
        scrollCollapse: true,
        paging: false,
        bInfo: false,
        //height: "10px",
        columns: [
            { title: "Retailer ID" },
            { title: "Retailer Name" },
            { title: "Part Code" },
            { title: "Part Name" },
            { title: "Highest sales by Retailer(&#x20B9)" }
        ],


    });

    if (drillFromCount1 <= 1) {
        $("#prePagerPartViewDrill").attr('disabled', true);
    } else {
        $("#prePagerPartViewDrill").attr('disabled', false);
    }
    $("#nextPagerPartViewDrill").show();
    $("#nextPagerPartViewDrill").attr('disabled', false);
    $("#pager12").hide();
}




function prePageDataPartViewDrill() {
    if (drillFromCount1 > 0) {
        $("#pager12").show();
        drillFromCount1 = drillFromCount1 - 50;
        drillToCount1 = drillToCount1 - 50;
        partViewDrillTableCreateApiwithPaginationDrill(partCodeFullScope1, drillFromCount1, drillToCount1);
    }
};

function nextPageDataPartViewDrill() {
    $("#pager12").show();
    drillFromCount1 = drillFromCount1 + 50;
    drillToCount1 = drillToCount1 + 50;
    partViewDrillTableCreateApiwithPaginationDrill(partCodeFullScope1, drillFromCount1, drillToCount1);
};






//Part Drill Down Filter
function createPartdrillFilterData(partcode) {
    allpartdrillFilterData = [];
    
   
    let distributorData = '';
    
     if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
    } else {
        distributorData = $("#distributorFilter").val();
        if(distributorData.length== 1 &&keyPersentInFilterSelection("distributorFilter")){
        }else{
        var notSelected2 = $("#distributorFilter").find('option').not(':selected');
        var arrayOfUnselected = notSelected2.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            distributorData = "";
        }
    }
    }
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
    
    allpartdrillFilterData.push({dataType: "String", key: 'State', value: stateData.toString()});
    allpartdrillFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allpartdrillFilterData.push({dataType:  "String", key: 'PartCategory',value:categoryData.toString()});
    allpartdrillFilterData.push({ dataType: "String", key: 'District', value: districtData.toString() });
    allpartdrillFilterData.push({ dataType: "String", key: 'PartCode', value: partcode.toString() });
    allpartdrillFilterData.push({dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    allpartdrillFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });
     
    return allpartdrillFilterData;
}



function sharedDataPartCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let sharePotential = "Potential," + sharedFormatter(potentialPartShareValues[0].CY_Potential) + "," + sharedFormatter(potentialPartShareValues[0].PY_Potential) + "," + sharedFormatter(potentialPartShareValues[0].YoY_Potential) + "%";
    let sharePenetration = "Penetration," + sharedFormatter(penetraPartShareValues[0].CY_Penetration) + "," + sharedFormatter(penetraPartShareValues[0].PY_Penetration) + "," + sharedFormatter(penetraPartShareValues[0].YoY_Penetration) + "%";
    let shareSales = "Retailer Invoice Frequency," + sharedFormatter(retaiInFrePartShareValues[0].CY_Count) + "," + sharedFormatter(retaiInFrePartShareValues[0].PY_Count) + "," + sharedFormatter(retaiInFrePartShareValues[0].YoY_Count) + "%";
    let shareDealers = "% Contribution to Sales," + sharedFormatter(perContribuPartShareValues[0].CY_Percent) + "," + sharedFormatter(perContribuPartShareValues[0].CY_Percent) + "," + sharedFormatter(perContribuPartShareValues[0].YoY_Sales) + "%";
    let shareSku = "SKUs Sold," + sharedFormatter(skuPartShareValues[0].CY_Count) + "," + sharedFormatter(skuPartShareValues[0].PY_Count) + "," + sharedFormatter(skuPartShareValues[0].YoY_Count) + "%";


    let sharedData = "Category,CY,LY,YOY Growth \n" + sharePotential + "\n" + sharePenetration + "\n" + shareSku + "\n" + shareSales + "\n" + shareDealers + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');
}


function sharedDataRecommandCalling() {
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let sharedNotOrder = "No of Retailer who didn't ordered," + sharedFormatter(noOfRetaDidNotShareValues[0].Retailer_Count);
    let shareHighRetail = "Highest Sales By Retailer," + sharedFormatter(highSaleRetaiShareValues[0].HighestSales);

    let sharedData = "Category,Value \n" + sharedNotOrder + "\n" + shareHighRetail + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');
}

function sharedDataPartCategoryCalling(divId) {
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = " Part Group Performance ";
    command.reportDisplayName = "Part Group Details of " + title;
    command.filterData = filterData


    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    if (divId == "partdrilltableId") {
        shareDataHeaders = "Retailer Id,Retailer Name,Part Code,Part Name,Highest Sales By Retailer\n"
        originalData = $('#partdrilltableId').DataTable().rows().data().toArray();
        sharedData += shareDataHeaders;
        for (let i = 0; i < originalData.length; i++) {
            sharedData += (originalData[i][0]).toString().replace(/,/g,"") + "," + (originalData[i][1]).toString().replace(/,/g,"") + "," + (originalData[i][2]).toString().replace(/,/g,"") + "," + (originalData[i][3]).toString().replace(/,/g,"") + "," + (originalData[i][4]).toString().replace(/,/g,"") + "\n";
        }
    } else if (divId == "RetailerviewtableId") {
        shareDataHeaders = "Retailer Name,Retailer Code,City,Sales Value,Last 6 Months Avg,%Contribution,Day Since last Order,Retailer Segment,Highest Sales By Retailer,SKU Sold,Invoice Frequency\n"
        originalData = jQuery("#RetailerviewtableId").jqGrid("getRowData");
        sharedData += shareDataHeaders;
        for (let i = 0; i < originalData.length; i++) {
            sharedData += (originalData[i].ContactName).toString().replace(/,/g,"") + "," + (originalData[i].ContactCode).toString().replace(/,/g,"") + "," + (originalData[i].City).toString().replace(/,/g,"") + "," + (originalData[i].Sales).toString().replace(/,/g,"") + "," + (originalData[i].Last_6_month_Average).toString().replace(/,/g,"") + "," + (originalData[i].Percent_Contrib).toString().replace(/,/g,"") + "," + (originalData[i].days_since_last_order).toString().replace(/,/g,"") + "," + (originalData[i].Retailer_Segment).toString().replace(/,/g,"") + "," + (originalData[i].Sales_Highest).toString().replace(/,/g,"") + "," + (originalData[i].SKU_Count).toString().replace(/,/g,"") + "," + (originalData[i].Invoice_Frequncy).toString().replace(/,/g,"") + "\n";
        }
    } else if (divId == "retdrilltableId") {
        shareDataHeaders = "Retailer Id,Retailer Name,Part Code,Part Name,Highest Sales By Retailer\n"
        originalData = $('#retdrilltableId').DataTable().rows().data().toArray();
        sharedData += shareDataHeaders;
        for (let i = 0; i < originalData.length; i++) {
            sharedData += (originalData[i][0]).toString().replace(/,/g,"") + "," + (originalData[i][1]).toString().replace(/,/g,"") + "," + (originalData[i][2]).toString().replace(/,/g,"") + "," + (originalData[i][3]).toString().replace(/,/g,"") + "," + (originalData[i][4]).toString().replace(/,/g,"") + "\n";
        }
    } else {
        if (divId == "partviewtableId") {
            shareDataHeaders = "Part Group,Sales,Qty,Last 6 Month Avg,Sku Count,Retailer Count,Qty Highest,%Contribution\n"
            originalData = jQuery("#partviewtableId").jqGrid("getRowData"); 
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Part_Category).toString().replace(/,/g,"") + "," + (originalData[i].Sales).toString().replace(/,/g,"") + "," + (originalData[i].Qty).toString().replace(/,/g,"") + "," + (originalData[i].Last_6_month_Average).toString().replace(/,/g,"") + "," + (originalData[i].SKU_Count).toString().replace(/,/g,"") + "," + (originalData[i].Retailer_Count).toString().replace(/,/g,"") + "," + (originalData[i].Qty_Highest).toString().replace(/,/g,"") + "," + (originalData[i].Percent_Contrib).toString().replace(/,/g,"") + "\n";
            }
        } else if (divId == "partviewtableId1") {
            shareDataHeaders = "Part Code,Sales,Qty,Last 6 Month Avg,Sku Count,Retailer Count,Qty Highest,%Contribution\n"
            originalData = jQuery('#partviewtableId1').jqGrid("getRowData");
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (originalData[i].Partcode).toString().replace(/,/g,"") + "," + (originalData[i].Sales).toString().replace(/,/g,"") + "," + (originalData[i].Qty).toString().replace(/,/g,"") + "," + (originalData[i].Last_6_month_Average).toString().replace(/,/g,"") + "," + (originalData[i].SKU_Count).toString().replace(/,/g,"") + "," + (originalData[i].Retailer_Count).toString().replace(/,/g,"") + "," + (originalData[i].Qty_Highest).toString().replace(/,/g,"") + "," + (originalData[i].Percent_Contrib).toString().replace(/,/g,"") + "\n";
            }
        } else {
            shareDataHeaders = '';
            originalData = '';
        }
    }

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');

}


let groupDataObjPager;
function partGroupPageShareData(){

    if (groupDataObjPager) {
        groupDataObjPager.abort();
        groupDataObjPager = null;
    }
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = " Part Group Performance ";
    command.reportDisplayName = "Part Group Top 500 Details of " + title;
    command.filterData = filterData

    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    limitRange = true;

    let fromZeroCount=0;
    let toLastCount = 500;
    let retailerperformData = createPartFilterData();
    retailerperformData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
    retailerperformData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
    $('#myShareModal').modal('show');

    groupDataObjPager = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Part_Category_Performance_pager_V2", 'chartDataForms': retailerperformData }),
        success: (function (resultData) {
            $('#myShareModal').modal('hide');
           originalData = resultData.data.data[0];
            shareDataHeaders = "Part Group,Sales,Qty,Last 6 Month Avg,Sku Count,Retailer Count,Qty Highest,%Contribution\n"
            sharedData += shareDataHeaders;
            for (let i = 0; i < originalData.length; i++) {
                sharedData += (nullModification(originalData[i].Part_Category)).toString().replace(/,/g,"") + "," + parseFloat(nullModification(originalData[i].Sales)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Qty)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Last_6_month_Average)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].SKU_Count)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Retailer_Count)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Qty_Highest)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Percent_Contrib)).toFixed(2) + "\n";
            }

           shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
           trackCustomEvent('Share Data Pop up Open', {
               "companyId": companyId.toString(),
               "userId": userId.toString(),
               "dashboardId": dashboardId.toString(),
               "reportName": reportTitle.toString()
           });
           groupDataObjPager=null;
           $('#myModal').modal('show');
        }),
        error: (function (err) {
            groupDataObjPager = null;
            console.log(err);
            originalData =  null;
        })
    });


}

let codeDataObjPager;
function partCodePageShareData(){

    if (codeDataObjPager) {
        codeDataObjPager.abort();
        codeDataObjPager = null;
    }
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = " Part Code Performance ";
    command.reportDisplayName = "Part Code Top 500 Details of " + title;
    command.filterData = filterData

    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    limitRange = true;

    let fromZeroCount=0;
    let toLastCount = 500;
    let retailerperformData = createPartFilterData();
    retailerperformData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
    retailerperformData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
    $('#myShareModal').modal('show');

    codeDataObjPager = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Part_View_Part_Performance_pager_V2", 'chartDataForms': retailerperformData }),
        success: (function (resultData) {
            $('#myShareModal').modal('hide');
           originalData = resultData.data.data[0];
           shareDataHeaders = "Part Code,Sales,Qty,Last 6 Month Avg,Sku Count,Retailer Count,Qty Highest,%Contribution\n"
           sharedData += shareDataHeaders;
           for (let i = 0; i < originalData.length; i++) {
               sharedData += (nullModification(originalData[i].Partcode)).toString().replace(/,/g,"") + "," + parseFloat(nullModification(originalData[i].Sales)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Qty)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Last_6_month_Average)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].SKU_Count)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Retailer_Count)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Qty_Highest)).toFixed(2) + "," + parseFloat(nullModification(originalData[i].Percent_Contrib)).toFixed(2) + "\n";
           }
           shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
           trackCustomEvent('Share Data Pop up Open', {
               "companyId": companyId.toString(),
               "userId": userId.toString(),
               "dashboardId": dashboardId.toString(),
               "reportName": reportTitle.toString()
           });
           codeDataObjPager=null;
           $('#myModal').modal('show');
        }),
        error: (function (err) {
            codeDataObjPager = null;
            console.log(err);
            originalData =  null;
        })
    });


}


let drillDownObjPager;
function sharedDataPerformanceDrillDownPage(){

    if (drillDownObjPager) {
        drillDownObjPager.abort();
        drillDownObjPager = null;
    }
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let command = {};
    let filterData = createRetailerdrillFilterData(sharePartCode);
    command.displayName = " Part Category Performance ";
    command.reportDisplayName = "The recommendation for Last 6 months sales of " + title;
    command.filterData = filterData

    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    limitRange = true;

    let fromZeroCount=0;
    let toLastCount = 500;
    filterData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
    filterData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
    $('#myShareModal').modal('show');

    drillDownObjPager = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "DrillDown_Performance_pager_V2", 'chartDataForms': filterData }),
        success: (function (resultData) {
            $('#myShareModal').modal('hide');
            originalData = resultData.data.data[0];
           shareDataHeaders = "Retailer Id,Retailer Name,Part Code,Part Name,Highest Sales By Retailer\n"
           sharedData += shareDataHeaders;
           for (let i = 0; i < originalData.length; i++) {
               sharedData += (originalData[i].contactcode) + "," + (originalData[i].ContactName) + "," + nullModification(originalData[i].Partcode) + "," + nullModification(originalData[i].Part_Category) + "," + parseFloat(nullModification(originalData[i].SalesPart)).toFixed(2) + "\n";
           }
           shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
           trackCustomEvent('Share Data Pop up Open', {
               "companyId": companyId.toString(),
               "userId": userId.toString(),
               "dashboardId": dashboardId.toString(),
               "reportName": reportTitle.toString()
           });
           drillDownObjPager=null;
           $('#myModal').modal('show');
        }),
        error: (function (err) {
            drillDownObjPager = null;
            console.log(err);
            originalData =  null;
        })
    });


}


let partDrillPager;
function sharedDataPartDrillCalling(){

    if (partDrillPager) {
        partDrillPager.abort();
        partDrillPager = null;
    }
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let command = {};
    let filterData = createPartdrillFilterData(sharePartCode);
    command.displayName = " Part Group Performance ";
    command.reportDisplayName = "Part Code drill down " + title;
    command.filterData = filterData

    let sharedData = '';
    let originalData;
    let shareDataHeaders;
    limitRange = true;

    let fromZeroCount=0;
    let toLastCount = 500;
    filterData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
    filterData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
    $('#myShareModal').modal('show');

    partDrillPager = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "DrillDown_Performance_pager_V2", 'chartDataForms': filterData }),
        success: (function (resultData) {
            $('#myShareModal').modal('hide');
            originalData = resultData.data.data[0];
           shareDataHeaders = "Retailer Id,Retailer Name,Part Code,Part Name,Highest Sales By Retailer\n"
           sharedData += shareDataHeaders;
           for (let i = 0; i < originalData.length; i++) {
               sharedData += (originalData[i].contactcode) + "," + (originalData[i].ContactName) + "," + nullModification(originalData[i].Partcode) + "," + nullModification(originalData[i].PartName) + "," + parseFloat(nullModification(originalData[i].SalesPart)).toFixed(2) + "\n";
           }
           shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
           trackCustomEvent('Share Data Pop up Open', {
               "companyId": companyId.toString(),
               "userId": userId.toString(),
               "dashboardId": dashboardId.toString(),
               "reportName": reportTitle.toString()
           });
           partDrillPager=null;
           $('#myModal').modal('show');
        }),
        error: (function (err) {
            partDrillPager = null;
            console.log(err);
            originalData =  null;
            
        })
    });


}


//############################ part group csv download   ########################################################
 
let partGroupSharedData=[];
function partGroupPageShareDataDownload(){  
       const partGroupFilterData = createPartFilterData();
    partGroupSharedData.push(["Part Group","Sales","Qty","Last 6 Month Avg","Sku Count","Retailer Count","Qty Highest","%Contribution"]);
    getFetchAllpartGroupBaseOnFilter(partGroupFilterData);      
}

function getFetchAllpartGroupBaseOnFilter(partGroupFilteData){  
     const partGroupFilterData = getFilterData(partGroupFilteData);
   getFetchpartGroupDataInBatch(partGroupFilterData);      
}

function getFetchpartGroupDataInBatch(partGroupFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "[Part_View_Part_Category_Performance_pager_V2]", 'chartDataForms': partGroupFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const partGroupSharedDataconvArray = [];
        partGroupSharedDataconvArray.push(originalData[i].Part_Category);
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Sales).toFixed(2));
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Qty).toFixed(2));
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].SKU_Count).toFixed(2));
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Retailer_Count).toFixed(2));
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Qty_Highest).toFixed(2));
        partGroupSharedDataconvArray.push(parseFloat(originalData[i].Percent_Contrib).toFixed(2));
        partGroupSharedData.push(partGroupSharedDataconvArray);         
           }    
           
            
           if(originalData.length >= 500 ){
               getFetchAllpartGroupBaseOnFilter(partGroupFilterData);
             }else{              
               exportToCsv('PartGroupPerformance.csv',partGroupSharedData);
               partGroupSharedData = [];
               $('#downloadCsvLoader,#partGroupbanDownload').hide();
               $('#partGroupshowDownload').show();
               $("#partGroupCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           partGroupSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#partGroupCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


//############################ part code csv download   ########################################################
  
let partCodeSharedData=[];
function partCodePageShareDataDownload(){  
       const partCodeFilterData = createPartFilterData();
    partCodeSharedData.push(["Part Code","Sales","Qty","Last 6 Month Avg","Sku Count","Retailer Count","Qty Highest","%Contribution"]);
    getFetchAllpartCodeBaseOnFilter(partCodeFilterData);      
}

function getFetchAllpartCodeBaseOnFilter(partCodeFilteData){  
     const partCodeFilterData = getFilterData(partCodeFilteData);
   getFetchpartCodeDataInBatch(partCodeFilterData);      
}

function getFetchpartCodeDataInBatch(partCodeFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "[Part_View_Part_Performance_pager_V2]", 'chartDataForms': partCodeFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const partCodeSharedDataconvArray = [];
        partCodeSharedDataconvArray.push(originalData[i].Partcode);
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Sales).toFixed(2));
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Qty).toFixed(2));
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].SKU_Count).toFixed(2));
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Retailer_Count).toFixed(2));
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Qty_Highest).toFixed(2));
        partCodeSharedDataconvArray.push(parseFloat(originalData[i].Percent_Contrib).toFixed(2));
        partCodeSharedData.push(partCodeSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
               getFetchAllpartCodeBaseOnFilter(partCodeFilterData);
             }else{              
               exportToCsv('PartCodePerformance.csv',partCodeSharedData);
               partCodeSharedData = [];
               $('#downloadCsvLoader,#partCodebanDownload').hide();
               $('#partCodeshowDownload').show();
               $("#partCodeCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           partCodeSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#partCodeCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}




//############################ part drill csv download   ########################################################
   
let partDrillSharedData=[];
function partDrillPageShareDataDownload(){  
       const partDrillFilterData = createPartdrillFilterData(sharePartCode);
    partDrillSharedData.push(["Retailer Id","Retailer Name","Part Code","Part Name","Highest Sales By Retailer"]);
    getFetchAllpartDrillBaseOnFilter(partDrillFilterData);      
}

function getFetchAllpartDrillBaseOnFilter(partDrillFilteData){  
     const partDrillFilterData = getFilterData(partDrillFilteData);
   getFetchpartDrillDataInBatch(partDrillFilterData);      
}

function getFetchpartDrillDataInBatch(partDrillFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "[DrillDown_Performance_pager_V2]", 'chartDataForms': partDrillFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const partDrillSharedDataconvArray = [];
       partDrillSharedDataconvArray.push(originalData[i].contactcode);
       partDrillSharedDataconvArray.push(originalData[i].ContactName);
       partDrillSharedDataconvArray.push(originalData[i].Partcode);
       partDrillSharedDataconvArray.push(originalData[i].Part_Category);
       partDrillSharedDataconvArray.push(parseFloat(originalData[i].SalesPart)).toFixed(2);
        partDrillSharedData.push(partDrillSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
               getFetchAllpartDrillBaseOnFilter(partDrillFilterData);
             }else{              
               exportToCsv('PartCodeDrillDown.csv',partDrillSharedData);
               partDrillSharedData = [];
               $('#downloadCsvLoader,#partDrillbanDownload').hide();
               $('#partDrillshowDownload').show();
               $("#partDrillCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           partDrillSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#partDrillCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}
