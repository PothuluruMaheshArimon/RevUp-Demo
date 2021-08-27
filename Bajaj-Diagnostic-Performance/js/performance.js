let sharePerMTDsaleData;
let sharePerYTDsaleData;
let sharePerSaleRetaiData;
let sharePerInvoisRetaiData;
let sharePerSkusData;

let passingMonth = true;
let globerTotalYears;
var permtdReqObj;
function perfommtdDataFromApi() {
    if (permtdReqObj) {
        permtdReqObj.abort();
        permtdReqObj = null;
    }
    $("#perToSa").css('display', 'block');
    sharePerMTDsaleData = null;
    let procedureName = "Performance_View_Key_Metrics_MTD_Sales_V2";
    let perfilterdatamtd = createPerfFilterData();
    permtdReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: perfilterdatamtd, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(perfilterdatamtd)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_MTD_Sales_V2", 'chartDataForms': perfilterdatamtd }),
        success: (function (resultData) {
            let permtdData = resultData.data.data[0];
            sharePerMTDsaleData = permtdData;
            $("#totalSalesMtdId td").remove();
            $("#totalSalesMtdId td").empty();
            $("#perToSa").css('display', 'none');
            $("#totalSalesMtdId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (permtdData.length != 0) {
                $("#totalSalesMtdId").append("<td class='metricsValue'>" + numberFormatter(permtdData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#totalSalesMtdId").append("<td class='metricsValue'>" + numberFormatter(permtdData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#totalSalesMtdId").append("<td class=" + addClassColor(permtdData[0].YoY_Sales) + ">" + numberAvgFormatter(permtdData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#totalSalesMtdId").append("<td class='metricsValue'> 0 </td>");
            }
            // retSkuDataFromApi();
            permtdReqObj = null;
            permtdData = null;
        }),
        error: (function (err) {
            permtdReqObj = null;
            console.log(err);
        })
    });
}



var perytdReqObj;
function perfomytdDataFromApi() {
    if (perytdReqObj) {
        perytdReqObj.abort();
        perytdReqObj = null;
    }
    $("#perToSaMtd").css('display', 'block');
    sharePerYTDsaleData = null;
    let procedureName = "Performance_View_Key_Metrics_YTD_Sales_V2";
    let perfilterdataytd = createPerfFilterData();
    perytdReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: perfilterdataytd, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(perfilterdataytd)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_YTD_Sales_V2", 'chartDataForms': perfilterdataytd }),
        success: (function (resultData) {
            let perytdData = resultData.data.data[0];
            sharePerYTDsaleData = perytdData;
            $("#totalSalesYtdId td").remove();
            $("#totalSalesYtdId td").empty();
            $("#perToSaMtd").css('display', 'none');
            $("#totalSalesYtdId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (perytdData.length != 0) {
                $("#totalSalesYtdId").append("<td class='metricsValue'>" + numberFormatter(perytdData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#totalSalesYtdId").append("<td class='metricsValue'>" + numberFormatter(perytdData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#totalSalesYtdId").append("<td class=" + addClassColor(perytdData[0].YoY_Sales) + ">" + numberAvgFormatter(perytdData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#totalSalesYtdId").append("<td class='metricsValue'> 0 </td>");
            }
            // retSkuDataFromApi();
            perytdReqObj = null;
            perytdData = null;
        }),
        error: (function (err) {
            perytdReqObj = null;
            console.log(err);
        })
    });
}

var persaleReqObj;
function perfosaleDataFromApi() {
    if (persaleReqObj) {
        persaleReqObj.abort();
        persaleReqObj = null;
    }
    $("#perSales").css('display', 'block');
    sharePerSaleRetaiData = null;
    let procedureName = "Performance_View_Key_Metrics_Sales_Per_Retailer_V2";
    let perfilterdatasale = createPerfFilterData();
    persaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: perfilterdatasale, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(perfilterdatasale)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_Sales_Per_Retailer_V2", 'chartDataForms': perfilterdatasale }),
        success: (function (resultData) {
            let persaleData = resultData.data.data[0];
            sharePerSaleRetaiData = persaleData;
            $("#salesTableId td").remove();
            $("#salesTableId td").empty();
            $("#perSales").css('display', 'none');
            $("#salesTableId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (persaleData.length != 0) {
                $("#salesTableId").append("<td class='metricsValue'>" + numberFormatter(persaleData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#salesTableId").append("<td class='metricsValue'>" + numberFormatter(persaleData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#salesTableId").append("<td class=" + addClassColor(persaleData[0].YoY_Sales) + ">" + numberAvgFormatter(persaleData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#salesTableId").append("<td class='metricsValue'> 0 </td>");
            }
            // retSkuDataFromApi();
            persaleReqObj = null;
            persaleData = null;
        }),
        error: (function (err) {
            persaleReqObj = null;
            console.log(err);
        })
    });
}


var perinvoReqObj;
function perfoinvoDataFromApi() {
    if (perinvoReqObj) {
        perinvoReqObj.abort();
        perinvoReqObj = null;
    }
    $("#perInvoice").css('display', 'block');
    sharePerInvoisRetaiData = null;
    let procedureName = "Performance_View_Key_Metrics_Retailer_Invoice_Frequency_V2";
    let perfilterdatainvo = createPerfFilterData();
    perinvoReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: perfilterdatainvo, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(perfilterdatainvo)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_Retailer_Invoice_Frequency_V2", 'chartDataForms': perfilterdatainvo }),
        success: (function (resultData) {
            let perinvoData = resultData.data.data[0];
            sharePerInvoisRetaiData = perinvoData;
            $("#invoiceTableId td").remove();
            $("#invoiceTableId td").empty();
            $("#perInvoice").css('display', 'none');
            $("#invoiceTableId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (perinvoData.length != 0) {
                $("#invoiceTableId").append("<td class='metricsValue'>" + numberFormatter(perinvoData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#invoiceTableId").append("<td class='metricsValue'>" + numberFormatter(perinvoData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#invoiceTableId").append("<td class=" + addClassColor(perinvoData[0].YoY_Count) + ">" + numberAvgFormatter(perinvoData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#invoiceTableId").append("<td class='metricsValue'> 0 </td>");
            }
            $("#keyMetricsLoaderPer").css('display', 'none');
            // retSkuDataFromApi();
            perinvoReqObj = null;
            perinvoData = null;
        }),
        error: (function (err) {
            perinvoReqObj = null;
            console.log(err);
        })
    });
}


var perskuReqObj;
function perfoskuDataFromApi() {
    if (perskuReqObj) {
        perskuReqObj.abort();
        perskuReqObj = null;
    }
    $("#perSKU").css('display', 'block');
    sharePerSkusData = null;
    let procedureName = "Performance_View_Key_Metrics_SKU_Count_V2";
    let perfilterdatasku = createPerfFilterData();
    perskuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: perfilterdatasku, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(perfilterdatasku)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': perfilterdatasku }),
        success: (function (resultData) {
            let perskuData = resultData.data.data[0];
            sharePerSkusData = perskuData;
            $("#skuTableId td").remove();
            $("#skuTableId td").empty();
            $("#perSKU").css('display', 'none');
            $("#skuTableId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (perskuData.length != 0) {
                $("#skuTableId").append("<td class='metricsValue'>" + valueFormater(perskuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#skuTableId").append("<td class='metricsValue'>" + valueFormater(perskuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#skuTableId").append("<td class=" + addClassColor(perskuData[0].YoY_Count) + ">" + valueFormater(perskuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#skuTableId").append("<td class='metricsValue'> 0 </td>");
            }
            // retSkuDataFromApi();
            perskuReqObj = null;
            perskuData = null;
        }),
        error: (function (err) {
            perskuReqObj = null;
            console.log(err);
        })
    });
}

var perDataRanReqObj;
function perfSliderDataFromApi() {
    if (perDataRanReqObj) {
        perDataRanReqObj.abort();
        perDataRanReqObj = null;
    }
    perDataRanReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_Year_List" }),
        success: (function (resultData) {
            let perRangeData = resultData.data.data[0];
            globerTotalYears = perRangeData;
            sliderViewchart(perRangeData);
            perDataRanReqObj = null;
            perRangeData = null;
        }),
        error: (function (err) {
            perDataRanReqObj = null;
            console.log(err);
        })
    });
}


let oldYear = "";
let curYear = "";
//slider fuctionality in Performance  view

var $amount = $('#amount'),
    $min = $('.min'),
    $max = $('.max'),
    $min_input = $('#min'),
    $max_input = $('#max');
var $slider;

function sliderViewchart(perRangeData) {
    var totalYears = [];
    let sliderMin = parseInt(perRangeData[0].Fiscal_Year_Full);
    let sliderMax = parseInt(perRangeData[perRangeData.length - 1].Fiscal_Year_Full);
    for (let i = 0; i < perRangeData.length; i++) {
        totalYears.push(parseInt(perRangeData[i].Fiscal_Year_Full))
    }
    $amount = $('#amount');
    $min = $('.min');
    $max = $('.max');
    $min_input = $('#min');
    $max_input = $('#max');
    $slider = $('#slider').slider({
        orientation: 'horizontal',
        animate: "fast",
        range: true,
        min: sliderMin,
        max: sliderMax,
        values: [sliderMin, sliderMax],
        slide: function (event, ui) {
            adjust(ui.values[0], ui.values[1]);
        }
    });
    var min = $slider.slider('values', 0);
    var max = $slider.slider('values', 1);
    adjust(min, max);
}

function adjust(min, max) {
    $min.html(min);
    $max.html(max);
    oldYear = min;
    curYear = max
    $min_input.val(min);
    $max_input.val(max);
    $slider.find('.ui-slider-handle:first-of-type').attr('value', min);
    $slider.find('.ui-slider-handle:last-of-type').attr('value', max);
    performViewChartApi();
}

let performancechartDataObj;
function performViewChartApi() {
    showHideLoader("perfChartcontainer", true);
    $(".loader").css('margin-left', '34vw');
    if (performancechartDataObj) {
        performancechartDataObj.abort();
        performancechartDataObj = null;
    }
    passingMonth = false;
    let performchartFilterdata = createPerfFilterData();
    // let fyOldYear= globalYearValue[0].FiscalYear;
    // let fynewYear= $("#yearFilter").val();
    for (let k = 0; k < globerTotalYears.length; k++) {
        if (oldYear == parseInt(globerTotalYears[k].Fiscal_Year_Full)) {
            fyOldYear = globerTotalYears[k].FiscalYear;
        }
        if (curYear == parseInt(globerTotalYears[k].Fiscal_Year_Full)) {
            fynewYear = globerTotalYears[k].FiscalYear;
        }
    }
    performchartFilterdata.push({ dataType: "String", key: 'year1', value: fyOldYear.toString() });
    performchartFilterdata.push({ dataType: "String", key: 'year2', value: fynewYear.toString() });
    let procedureName = "Performance_View_Key_Metrics_Seasonal_V2";
    performancechartDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: performchartFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(performchartFilterdata)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Performance_View_Key_Metrics_Seasonal_V2", 'chartDataForms': performchartFilterdata }),
        success: (function (resultData) {
            let performData = resultData.data.data[0];
            performancechartDataObj = null;
            //distriPerfomChartApi();
            if (performData.length <= 0) {
                showHideLoader("perfChartcontainer",false);
                $("#perfChartcontainer").append("<div class='noData'>No Data</div>");
                return;
            }
            performViewChart(performData);
            showHideLoader("perfChartcontainer", false);
        }),
        error: (function (err) {
            performancechartDataObj = null;
            console.log(err);
        })
    });
}
function performViewChart(performData) {
    let monthData = [];
    let salesData = [];
    let month3Avg = [];
    let month12Avg = [];
    let yearData = [];
    let YearMonthData = [];

    for (let i = 0; i < performData.length; i++) {
        // let YearMonthData=Year.concat(Month);
        yearData.push(performData[i].Year);
        monthData.push(performData[i].Month);
        salesData.push(parseInt(performData[i].Sales * 1));
        month3Avg.push(parseInt(performData[i].M3_Avg * 1));
        month12Avg.push(parseInt(performData[i].M12_Month_Avg * 1));
        YearMonthData.push(performData[i].Month + "-" + performData[i].Year);
    }
    Highcharts.chart('perfChartcontainer', {
        chart: {
            zoomType: 'xy',
            renderTo: 'perfChartcontainer'
        },
        title: {
            text: ''
        },
        xAxis: [{
            categories: YearMonthData,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                enabled: false
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Sales',
                labels: {
                    format: '{value} Cr',
                },
                style: {
                    color: Highcharts.getOptions().colors[0]
                },
            },

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                var points = this.points;
                var pointsLength = points.length;
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Month,Year: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + getnumFormatterRupe(y_value) + '</b><br/>';
                }
                return tooltipMarkup;
            },
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            x: 100,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(200,255,255,0.25)'
        },
        series: [{
            name: 'Sales',
            type: 'column',
            //yAxis: 1,
            data: salesData,

        }, {
            name: '3 Month moving avg',
            type: 'spline',
            //yAxis: 2,
            data: month3Avg,

        }, {
            name: '12 Month moving avg',
            type: 'spline',
            data: month12Avg,
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        floating: false,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },
                }
            }]
        }
    });

}

function createPerfFilterData() {
    allPerformanceFilterData = [];
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
    let territoryData = $("#territoryFilter").val();
    var notSelected1 = $("#territoryFilter").find('option').not(':selected');
    var arrayOfUnselectedTerry = notSelected1.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselectedTerry.length == 0) {
        territoryData = "";
    }
    let distributorData = '';
   // if (idMeta != '') {
    if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
    } else {
        distributorData = $("#distributorFilter").val();
        var notSelected2 = $("#distributorFilter").find('option').not(':selected');
        var arrayOfUnselected = notSelected2.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            distributorData = "";
        }
    }
    let classifictionFilterData = $("#classifictionFilter").val();
    var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        classifictionFilterData = "";
    }

    allPerformanceFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    if (passingMonth) {
        allPerformanceFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    }
    allPerformanceFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allPerformanceFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allPerformanceFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allPerformanceFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });

    passingMonth = true;
    return allPerformanceFilterData;
}

// share data functionality
function sharedDataPerformCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let shareSales = "Total Sales - MTD," + sharedFormatter(sharePerMTDsaleData[0].CY_Sales) + "," + sharedFormatter(sharePerMTDsaleData[0].PY_Sales) + "," + sharedFormatter(sharePerMTDsaleData[0].YoY_Sales) + "%";
    let shareSalesPerReat = "Total Sales - YTD," + sharedFormatter(sharePerYTDsaleData[0].CY_Sales) + "," + sharedFormatter(sharePerYTDsaleData[0].PY_Sales) + "," + sharedFormatter(sharePerYTDsaleData[0].YoY_Sales) + "%";
    let shareReataiIn = "Avg Sales/Retailer," + sharedFormatter(sharePerSaleRetaiData[0].CY_Sales) + "," + sharedFormatter(sharePerSaleRetaiData[0].PY_Sales) + "," + sharedFormatter(sharePerSaleRetaiData[0].YoY_Sales) + "%";
    let shareReatailer = "Avg Invoice/Retailer," + sharedFormatter(sharePerInvoisRetaiData[0].CY_Count) + "," + sharedFormatter(sharePerInvoisRetaiData[0].PY_Count) + "," + sharedFormatter(sharePerInvoisRetaiData[0].YoY_Count) + "%";
    let shareSku = "#SKU's," + sharedFormatter(sharePerSkusData[0].CY_Count) + "," + sharedFormatter(sharePerSkusData[0].PY_Count) + "," + sharedFormatter(sharePerSkusData[0].YoY_Count) + "%";


    let sharedData = "Category,CY,LY,YOY Growth \n" + shareSales + "\n" + shareSalesPerReat + "\n" + shareReataiIn + "\n" + shareReatailer + "\n" + shareSku + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');
}

