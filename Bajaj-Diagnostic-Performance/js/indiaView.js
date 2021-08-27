

//shared data Metrices
let potentialIndShareValues;
let penetraIndShareValues;
let saleIndShareValues;
let delIndShareValues;
let disIndShareValues;
let skuIndShareValues;

var potentialReqObj;
function potentialDataFromApi() {
    if (potentialReqObj) {
        potentialReqObj.abort();
        potentialReqObj = null;
    }
    $("#indPot").css('display', 'block');
    potentialIndShareValues = null;
    let indiafilterdata = createIndFilterData()
    let procedureName = "All_India_View_Key_Metrics_Potential_V2";
    potentialReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdata)),'dashboardId' : dashboardId }),
                
       // data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_Potential_V2", 'chartDataForms': indiafilterdata }),
        success: (function (resultData) {
            let potentialData = resultData.data.data[0];
            potentialIndShareValues = potentialData;
            potentialReqObj = null;
            $("#indSalesMtdId td").remove();
            $("#indSalesMtdId td").empty();
            $("#indPot").css('display', 'none');
            $("#indSalesMtdId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (potentialData.length != 0) {
                $("#indSalesMtdId").append("<td class='metricsValue'>" + numberFormatter(potentialData[0].CY_Potential, prefixSymbol = '') + " </td>");
                $("#indSalesMtdId").append("<td class='metricsValue'>" + numberFormatter(potentialData[0].PY_Potential, prefixSymbol = '') + " </td>");
                $("#indSalesMtdId").append("<td class=" + addClassColor(potentialData[0].YoY_Potential) + ">" + numberAvgFormatter(potentialData[0].YoY_Potential, prefixSymbol = '') + "%</td>");

            } else {
                $("#indSalesMtdId").append("<td class='metricsValue'> 0 </td>");
            }
            dealerDataFromApi();
            potentialData = null;
        }),
        error: (function (err) {
            potentialReqObj = null;

            console.log(err);
        })
    });
}


var salesReqObj;
function salesDataFromApi() {
    if (salesReqObj) {
        salesReqObj.abort();
        salesReqObj = null;
    }
    $("#indSal").css('display', 'block');
    saleIndShareValues = null;
    let indiafilterdataSales = createIndFilterData();
    let procedureName = "All_India_View_Key_Metrics_Sales_V2";
    salesReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataSales, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataSales)),'dashboardId' : dashboardId }),
       
        //data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_Sales_V2", 'chartDataForms': indiafilterdataSales }),
        success: (function (resultData) {
            let salesData = resultData.data.data[0];
            saleIndShareValues = salesData;
            $("#indSalesId td").remove();
            $("#indSalesId td").empty();
            $("#indSal").css('display', 'none');
            $("#indSalesId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (salesData.length != 0) {
                $("#indSalesId").append("<td class='metricsValue'>" + numberFormatter(salesData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#indSalesId").append("<td class='metricsValue'>" + numberFormatter(salesData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#indSalesId").append("<td class=" + addClassColor(salesData[0].YoY_Sales) + ">" + numberAvgFormatter(salesData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#indSalesId").append("<td class='metricsValue'> 0 </td>");
            }
            salesData = null;
            salesReqObj = null;
            distributorDataFromApi();
        }),
        error: (function (err) {
            salesReqObj = null;
            console.log(err);
        })
    });
}



var penetrationReqObj;
function penetrationDataFromApi() {
    if (penetrationReqObj) {
        penetrationReqObj.abort();
        penetrationReqObj = null;
    }
    $("#indPene").css('display', 'block');
    penetraIndShareValues = null;
    let indiafilterdataPenetr = createIndFilterData();
    let procedureName = "All_India_View_Key_Metrics_Penetration_V2";
    penetrationReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataPenetr, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataPenetr)),'dashboardId' : dashboardId }),  
      //  data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_Penetration_V2", 'chartDataForms': indiafilterdataPenetr }),
        success: (function (resultData) {
            let penetrationData = resultData.data.data[0];
            penetraIndShareValues = penetrationData;
            $("#indSalesYtdId td").remove();
            $("#indSalesYtdId td").empty();
            $("#indPene").css('display', 'none');
            $("#indSalesYtdId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (penetrationData.length != 0) {
                $("#indSalesYtdId").append("<td class='metricsValue'>" + numberFormatter(penetrationData[0].CY_Penetration, prefixSymbol = '') + "%</td>");
                $("#indSalesYtdId").append("<td class='metricsValue'>" + numberFormatter(penetrationData[0].PY_Penetration, prefixSymbol = '') + "%</td>");
                $("#indSalesYtdId").append("<td class=" + addClassColor(penetrationData[0].YoY_Penetration) + ">" + numberFormatter(penetrationData[0].YoY_Penetration, prefixSymbol = '') + "%</td>");
            } else {
                $("#indSalesYtdId").append("<td class='metricsValue'> 0 </td>");
            }
            penetrationReqObj = null;
            penetrationData = null;
            skuDataFromApi();

        }),
        error: (function (err) {
            penetrationReqObj = null;
            console.log(err);
        })
    });
}


let dealerlData;
var dealerReqObj;
let distriData;
function dealerDataFromApi() {
    if (dealerReqObj) {
        dealerReqObj.abort();
        dealerReqObj = null;
    }
    $("#indDeal").css('display', 'block');
    delIndShareValues = null;
    let indiafilterdataDealer = createIndFilterData();
    let procedureName = "All_India_View_Key_Metrics_Dealer_Sales_V2";
    dealerReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataDealer, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataDealer)),'dashboardId' : dashboardId }),  
     
     //   data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_Dealer_Sales_V2", 'chartDataForms': indiafilterdataDealer }),
        success: (function (resultData) {
            dealerlData = resultData.data.data[0];
            delIndShareValues = dealerlData;
            dealerDistributerTableData();
            dealerReqObj = null;

        }),
        error: (function (err) {
            dealerReqObj = null;
            console.log(err);
        })
    });
}



var distributorReqObj;
function distributorDataFromApi() {
    if (distributorReqObj) {
        distributorReqObj.abort();
        distributorReqObj = null;
    }
    $("#indDistri").css('display', 'block');
    disIndShareValues = null;
    let indiafilterdataDistr = createIndFilterData();
    let procedureName = "All_India_View_Key_Metrics_distributor_Sales_V2";
    distributorReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataDistr, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataDistr)),'dashboardId' : dashboardId }),  
     
       // data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_distributor_Sales_V2", 'chartDataForms': indiafilterdataDistr }),
        success: (function (resultData) {
            distriData = resultData.data.data[0];
            disIndShareValues = distriData;
            dealerDistributerTableData();
            distributorReqObj = null;
        }),
        error: (function (err) {
            distributorReqObj = null;
            console.log(err);
        })
    });
}



var skuReqObj;
function skuDataFromApi() {
    if (skuReqObj) {
        skuReqObj.abort();
        skuReqObj = null;
    }
    $("#indSKU").css('display', 'block');
    skuIndShareValues = null;
    let indiafilterdataSku = createIndFilterData();
    let procedureName='All_India_View_Key_Metrics_SKU_Count_V2';
    skuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataSku, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataSku)),'dashboardId' : dashboardId }),  
     
       // data: JSON.stringify({ 'filter': "All_India_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': indiafilterdataSku }),
        success: (function (resultData) {
            let skuData = resultData.data.data[0];
            skuIndShareValues = skuData;
            $("#indSkuId td").remove();
            $("#indSkuId td").empty();
            $("#indSKU").css('display', 'none');
            $("#indSkuId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (skuData.length != 0) {
                $("#indSkuId").append("<td class='metricsValue'>" + valueFormater(skuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#indSkuId").append("<td class='metricsValue'>" + valueFormater(skuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#indSkuId").append("<td class=" + addClassColor(skuData[0].YoY_Count) + ">" + valueFormater(skuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#indSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            $("#keyMetricsLoader").css('display', 'none');
            skuReqObj = null;
            skuData = null;

        }),
        error: (function (err) {
            skuReqObj = null;
            console.log(err);
        })
    });
}


let indiaStateDataObj;
function indPotentialvsSalesChartApi() {
    if (indiaStateDataObj) {
        indiaStateDataObj.abort();
        indiaStateDataObj = null;
    }

    let indiafilterStatedata = createIndFilterData();
    let procedureName= "All_India_View_State_Dtls_V2";
    indiaStateDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterStatedata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterStatedata)),'dashboardId' : dashboardId }),  
     
       // data: JSON.stringify({ 'filter': "All_India_View_State_Dtls_V2", 'chartDataForms': indiafilterStatedata }),
        success: (function (resultData) {
            let stateData = resultData.data.data[0];
            indiaStateDataObj = null;
            if (stateData.length <= 0) {
                showHideLoader("indPotvsSaleContain",false);
                $("#indPotvsSaleContain").append("<div class='noData'>No Data</div>");
                return;
            }
            indPotentialvsSalesChart(stateData);


        }),
        error: (function (err) {
            indiaStateDataObj = null;
            showHideLoader("indPotvsSaleContain", false);
            console.log(err);
        })
    });
}



function indPotentialvsSalesChart(stateData) {
    // console.log(stateData)
    let stateNames = [];
    let gapData = [];
    let salesData = [];
    let potentData = [];
    let penetraData = [];

    for (let i = 0; i < stateData.length; i++) {
        stateNames.push(stateData[i].State);
        gapData.push(parseInt(stateData[i].GAP * 1) );
        salesData.push(parseInt(stateData[i].CY_Sales * 1) );
        potentData.push(parseInt(stateData[i].CY_Potential  * 1));
        penetraData.push(parseInt(stateData[i].Penetration * 1 , "%"));
    }
    showHideLoader("indPotvsSaleContain", false);
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'indPotvsSaleContain',
            inverted: true
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: stateNames,
            title: {
                text: null
            },
            min: 0,
            scrollbar: {
                enabled: false
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                enabled: false
            },
        },

        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                var points = this.points;
                var pointsLength = points.length;
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">State: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    if(points[index].series.name =="Penetration"){
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + y_value + ' %</b><br/>';
                    }else{
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + getnumFormatterRupe(y_value) + '</b><br/>';
                    }
                    
                }
                return tooltipMarkup;
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        legend: {
            reversed: true

        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Gap',
            color: '#02b8fd',
            data: gapData
        }, {
            name: 'Potential',
            color: '#0046cc',
            data: potentData
        }, {
            name: 'Sales',
            color: '#ff5e19',
            data: salesData
        },{
            showInLegend: false, 
            name: 'Penetration',
                color:'#E1C233',
                data: penetraData
        }]
    };
    if (stateNames.length > 5) {
        options.xAxis.max = 5;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}
//************************************************************************************* */
/**
 * Part Category Wise Potential Vs Sales
 */
let indiaPartDataObj;
function indPartPotentialvsSalesChartApi() {
    if (indiaPartDataObj) {
        indiaPartDataObj.abort();
        indiaPartDataObj = null;
    }

    let indiafilterStatedata = createIndFilterData();
    let procedureName = "All_India_View_Classification_Dtls";
    indiaPartDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterStatedata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterStatedata)),'dashboardId' : dashboardId }),  
     
       // data: JSON.stringify({ 'filter': "All_India_View_Classification_Dtls", 'chartDataForms': indiafilterStatedata }),
        success: (function (resultData) {
            let classificationData = resultData.data.data[0];
            indiaPartDataObj = null;
            if (classificationData.length <= 0) {
                showHideLoader("indPartPotenContain",false);
                $("#indPartPotenContain").append("<div class='noData'>No Data</div>");
                return;
            }
            indPartPotentialvsSalesChart(classificationData);


        }),
        error: (function (err) {
            indiaPartDataObj = null;
            showHideLoader("indPartPotenContain", false);
            console.log(err);
        })
    });

//     let classificationFilterVal;
// for(let i =0; i< indiafilterStatedata.length; i++){
//      if(indiafilterStatedata[i].key === "classification"){
//        classificationFilterVal = indiafilterStatedata[i].value;
//        break;
//      } 
// }
// let classificationData;
// if(classificationFilterVal != undefined && classificationFilterVal != ""){
//     classificationData = All_India_View_Category_Dtls(classificationFilterVal);    
// }else{
//     classificationData = All_India_View_Classification_Dtls(); 
// }

}

function indPartPotentialvsSalesChart(data) {
    // console.log(stateData)
    let ClassificationData = [];
    let GAPData = [];
    let SalesData = [];
    let PotentialData = [];
    let PenetrationData = [];

    for (let i = 0; i < data.length; i++) {
        ClassificationData.push(data[i].Classification !== undefined ? data[i].Classification :  data[i].Part_Category);
        GAPData.push(parseInt(data[i].GAP * 1) );
        SalesData.push(parseInt(data[i].Sales * 1) );
        PotentialData.push(parseInt(data[i].Potential  * 1));
        PenetrationData.push(parseInt(data[i].Penetration * 1 , "%"));
    }
    showHideLoader("indPartPotenContain", false);
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'indPartPotenContain',
            inverted: true
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ClassificationData,
            title: {
                text: null
            },
            min: 0,
            scrollbar: {
                enabled: false
            },
        },
        // yAxis: {
        //     min: 0,
        //     title: {
        //         text: '',
        //         align: 'high'
        //     },
        //     labels: {
        //         enabled: true
        //     },
        // },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: false
            },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                var points = this.points;
                var pointsLength = points.length;
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px"> Classification: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    if(points[index].series.name =="Penetration"){
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + y_value + ' %</b><br/>';
                    }else{
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + getnumFormatterRupe(y_value) + '</b><br/>';
                    }
                    
                }
                return tooltipMarkup;
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        legend: {
            reversed: true

        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Gap',
            color: '#02b8fd',
            data: GAPData
        }, {
            name: 'Potential',
            color: '#0046cc',
            data: PotentialData
        }, {
            name: 'Sales',
            color: '#ff5e19',
            data: SalesData
        },{
            showInLegend: false, 
            name: 'Penetration',
                color:'#E1C233',
                data: PenetrationData
        }]
    };
    if (ClassificationData.length > 5) {
        options.xAxis.max = 5;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}
//************************************************************************************ */
//Bike Brandwise ChartData
let brandWiseReqData;
var brandWiseReqObj;
function indbrandWisePoteDataFromApi() {
    if (brandWiseReqObj) {
        brandWiseReqObj.abort();
        brandWiseReqObj = null;
    }
    let procedureName = "All_India_View_Brand_Dtls_V2";
    let yearData = $("#yearFilter").val();
    let stateData = $("#stateFilter").val();
    indiafilterdataBranWise = [];
    indiafilterdataBranWise.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    indiafilterdataBranWise.push({ dataType: "String", key: 'State', value: stateData.toString() });
    brandWiseReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: indiafilterdataBranWise, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(indiafilterdataBranWise)),'dashboardId' : dashboardId }),  
     
       // data: JSON.stringify({ 'filter': "All_India_View_Brand_Dtls_V2", 'chartDataForms': indiafilterdataBranWise }),
        success: (function (resultData) {
            let data = resultData.data.data[0];
            brandWiseReqData = data;
            indBrandWisePotenChart(brandWiseReqData);
            brandWiseReqObj = null;
            if (data.length <= 0) {
                showHideLoader("ndBranPotenContain",false);
                $("#ndBranPotenContain").append("<div class='noData'>No Data</div>");
                return;
            }
        }),

        error: (function (err) {
            brandWiseReqObj = null;
            console.log(err);
        })
    });
}

function indBrandWisePotenChart(brandWiseReqData) {
    // console.log(brandWiseReqData);
    let bikeNames = [];
    let dummybikeNames = [];
    let stateData = []
    let stateIndex;
    let avengerData = [];
    let platinaData = [];
    let discoverData = [];
    let pulsarData = [];
    let dummyState = [];
    let brandIndex;
    for (let j = 0; j < brandWiseReqData.length; j++) {
        stateIndex = dummyState.findIndex(obj => obj.State == brandWiseReqData[j].State);
        if (stateIndex == -1) {
            dummyState.push({ State: brandWiseReqData[j].State });
            stateData.push(brandWiseReqData[j].State)
        }
        brandIndex = dummybikeNames.findIndex(obj => obj.Bike_Brand == brandWiseReqData[j].Bike_Brand);
        if (brandIndex == -1) {
            dummybikeNames.push({ Bike_Brand: brandWiseReqData[j].Bike_Brand });
            bikeNames.push(brandWiseReqData[j].Bike_Brand);
        }

    }
    for(let i = 0; i < brandWiseReqData.length; i++){
        if (brandWiseReqData[i].Bike_Brand == bikeNames[0]) {
            avengerData.push(parseInt(brandWiseReqData[i].Potential* 1))
        }
        if (brandWiseReqData[i].Bike_Brand == bikeNames[1]) {
            platinaData.push(parseInt(brandWiseReqData[i].Potential* 1))
        }
        if (brandWiseReqData[i].Bike_Brand == bikeNames[2]) {
            discoverData.push(parseInt(brandWiseReqData[i].Potential* 1))
        }
       
    }

    showHideLoader("indBranPotenContain", false);
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'indBranPotenContain',
            inverted: true,
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: stateData,
            min: 0,
            scrollbar: {
                enabled: false
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: false
            },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                var points = this.points;
                var pointsLength = points.length;
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">State : ' + points[0].key + '</span><br/>' : '';
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
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: bikeNames[0],
            color: '#02b8fd',
            data: avengerData
        }, {
            name: bikeNames[1],
            color: '#ff5e19',
            data: discoverData
        }, {
            name: bikeNames[2],
            color: '#18bd0b',
            data: platinaData
        }]
    };
    if (stateData.length > 5) {
        options.xAxis.max = 5;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}
//********************* breaking new ************************################################# */

function breakingNew() {
    //  let indiafilterBreakingdata = createIndFilterData();
    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ filter: "All_India_View_News_Ticker" }),
        success: (function (data) {
            let printData = data.data.data;
            let dateBreakingNewArr = printData[0];
            populateBreakingNew(dateBreakingNewArr);
        }),
        error: (function (err) {
            console.log(err);
        })
    });
}
function populateBreakingNew(data) {
    let printDataStr = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].YoY_Penetration < 0) {
            printDataStr += data[i].State + " &nbsp;&nbsp;&nbsp; <span style='color: red'>&#9660;</span> &nbsp;" + numberFormatter(data[i].YoY_Penetration) + "% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

        } else {
            printDataStr += data[i].State + " &nbsp;&nbsp;&nbsp; <span style='color: green'>&#9650;</span> &nbsp;" + numberFormatter(data[i].YoY_Penetration) + " % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
    }
    // console.log("print--  "+printDataStr);
    document.getElementById("breakingNew").innerHTML = printDataStr;
}

// ** **********  filter function     ********************
function createIndFilterData() {
    allIndiaFilterData = [];
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
    // let distributorData = '';
    // if (idMeta != '') {
    //     distributorData = idMeta;
    // } else {
    //     distributorData = $("#distributorFilter").val();
    //     var notSelected2 = $("#distributorFilter").find('option').not(':selected');
    //     var arrayOfUnselected = notSelected2.map(function () {
    //         return this.value;
    //     }).get();
    //     if (arrayOfUnselected == 0) {
    //         distributorData = "";
    //     }
    // }

    let classifictionFilterData = $("#classifictionFilter").val();
    var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        classifictionFilterData = "";
    }
    allIndiaFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    //allIndiaFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });
    return allIndiaFilterData;
}


function dealerDistributerTableData() {
    if (dealerlData && distriData && dealerlData != null && distriData != null) {

        $("#dealDistriIndId td").remove();
        $("#dealDistriIndId td").empty();
        $("#distriIndId td").remove();
        $("#distriIndId td").empty();
        $("#indDistri,#indDeal").css('display', 'none');
        $("#dealDistriIndId,#distriIndId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
        $("#dealDistriIndId").append("<td class='metricsValue'>" + numberFormatter(dealerlData[0].CY_Sales, prefixSymbol = '') + " </td>");
        $("#dealDistriIndId").append("<td class='metricsValue'>" + numberFormatter(dealerlData[0].PY_Sales, prefixSymbol = '') + " </td>");
        $("#dealDistriIndId").append("<td class=" + addClassColor(dealerlData[0].YoY_Sales) + ">" + numberAvgFormatter(dealerlData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
        $("#distriIndId").append("<td class='metricsValue'>" + numberFormatter(distriData[0].CY_Sales, prefixSymbol = '') + " </td>");
        $("#distriIndId").append("<td class='metricsValue'>" + numberFormatter(distriData[0].PY_Sales, prefixSymbol = '') + " </td>");
        $("#distriIndId").append("<td class=" + addClassColor(distriData[0].YoY_Sales) + ">" + numberAvgFormatter(distriData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
        distriData = null;
        dealerlData = null;
    }

}



function sharedDataCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let sharePotential = "Potential," + sharedFormatter(potentialIndShareValues[0].CY_Potential) + "," + sharedFormatter(potentialIndShareValues[0].PY_Potential) + "," + sharedFormatter(potentialIndShareValues[0].YoY_Potential) + "%";
    let sharePenetration = "Penetration," + sharedFormatter(penetraIndShareValues[0].CY_Penetration) + "," + sharedFormatter(penetraIndShareValues[0].PY_Penetration) + "," + sharedFormatter(penetraIndShareValues[0].YoY_Penetration) + "%";
    let shareSales = "Sales," + sharedFormatter(saleIndShareValues[0].CY_Sales) + "," + sharedFormatter(saleIndShareValues[0].PY_Sales) + "," + sharedFormatter(saleIndShareValues[0].YoY_Sales) + "%";
    let shareDealers = "Dealers," + sharedFormatter(delIndShareValues[0].CY_Sales) + "," + sharedFormatter(delIndShareValues[0].PY_Sales) + "," + sharedFormatter(delIndShareValues[0].YoY_Sales) + "%";
    let shareDisribute = "Distributers," + sharedFormatter(disIndShareValues[0].CY_Sales) + "," + sharedFormatter(disIndShareValues[0].PY_Sales) + "," + sharedFormatter(disIndShareValues[0].YoY_Sales) + "%";
    let shareSku = "#SKU," + sharedFormatter(skuIndShareValues[0].CY_Count) + "," + sharedFormatter(skuIndShareValues[0].PY_Count) + "," + sharedFormatter(skuIndShareValues[0].YoY_Count) + "%";


    let sharedData = "Category,CY,LY,YOY Growth \n" + sharePotential + "\n" + sharePenetration + "\n" + shareSales + "\n" + shareDealers + "\n" + shareDisribute + "\n" + shareSku + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": title.toString()
    });
    $('#myModal').modal('show');
}   
