//shared data Metrices
let potentialStateShareValues;
let penetraStateShareValues;
let saleStateShareValues;
let retStateShareValues;
let skuStateShareValues;

//STATE VIEW KPI Matrix
var statepotentialReqObj;
function statepotentialDataFromApi() {
    if (statepotentialReqObj) {
        statepotentialReqObj.abort();
        statepotentialReqObj = null;
    }

    $("#statePot").css('display', 'block');
    let statefilterdata = createStateFilterData();
    let procedureName = "State_View_Key_Metrics_Potential_V2";
    potentialStateShareValues = null;
    statepotentialReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterdata)),'dashboardId' : dashboardId }),
       
      //  data: JSON.stringify({ 'filter': "State_View_Key_Metrics_Potential_V2", 'chartDataForms': statefilterdata }),
        success: (function (resultData) {
            let potentialData = resultData.data.data[0];
            potentialStateShareValues = potentialData;
            statepotentialReqObj = null;
            $("#statePot").css('display', 'none');
            $("#satPoteId td").remove();
            $("#satPoteId td").empty();
            $("#satPoteId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (potentialData.length != 0) {
                $("#satPoteId").append("<td class='metricsValue'>" + numberFormatter(potentialData[0].CY_Potential, prefixSymbol = '') + " </td>");
                $("#satPoteId").append("<td class='metricsValue'>" + numberFormatter(potentialData[0].PY_Potential, prefixSymbol = '') + " </td>");
                $("#satPoteId").append("<td class=" + addClassColor(potentialData[0].YoY_Potential) + ">" + numberAvgFormatter(potentialData[0].YoY_Potential, prefixSymbol = '') + "%</td>");
            } else {
                $("#satPoteId").append("<td class='metricsValue'> 0 </td>");
            }
            statepenetrationDataFromApi();
            potentialData = null;

        }),
        error: (function (err) {
            statepotentialReqObj = null;
            console.log(err);
        })
    });
}

var statesalesReqObj;
function statesalesDataFromApi() {
    if (statesalesReqObj) {
        statesalesReqObj.abort();
        statesalesReqObj = null;
    }
    $("#stateDeal").css('display', 'block');
    let allStateFilterData = createStateFilterData();
    let procedureName="State_View_Key_Metrics_Dealer_Sales_V2";
    saleStateShareValues = null;
    statesalesReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: allStateFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(allStateFilterData)),'dashboardId' : dashboardId }),
       
      //  data: JSON.stringify({ 'filter': "State_View_Key_Metrics_Dealer_Sales_V2", 'chartDataForms': allStateFilterData }),
        success: (function (resultData) {
            let salesData = resultData.data.data[0];
            saleStateShareValues = salesData;
            $("#stateDeal").css('display', 'none');
            $("#satSalesId td").remove();
            $("#satSalesId td").empty();
            $("#satSalesId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (salesData.length != 0) {
                $("#satSalesId").append("<td class='metricsValue'>" + numberFormatter(salesData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#satSalesId").append("<td class='metricsValue'>" + numberFormatter(salesData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#satSalesId").append("<td class=" + addClassColor(salesData[0].YoY_Sales) + ">" + numberAvgFormatter(salesData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#satSalesId").append("<td class='metricsValue'> 0 </td>");
            }
            stateskuDataFromApi();
            salesData = null;
            statesalesReqObj = null;
        }),
        error: (function (err) {
            statesalesReqObj = null;
            console.log(err);
        })
    });
}


var statepenetrationReqObj;
function statepenetrationDataFromApi() {
    if (statepenetrationReqObj) {
        statepenetrationReqObj.abort();
        statepenetrationReqObj = null;
    }
    $("#statePen").css('display', 'block');
    penetraStateShareValues = null;
    let procedureName="State_View_Key_Metrics_Penetration_V2";
    let statefilterdataPenetr = createStateFilterData();
    statepenetrationReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterdataPenetr, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterdataPenetr)),'dashboardId' : dashboardId }),
       
        //data: JSON.stringify({ 'filter': "State_View_Key_Metrics_Penetration_V2", 'chartDataForms': statefilterdataPenetr }),
        success: (function (resultData) {
            let penetrationData = resultData.data.data[0];
            penetraStateShareValues = penetrationData;
            $("#statePen").css('display', 'none');
            $("#satpenetId td").remove();
            $("#satpenetId td").empty();
            $("#satpenetId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (penetrationData != 0) {
                $("#satpenetId").append("<td class='metricsValue'>" + numberFormatter(penetrationData[0].CY_Penetration, prefixSymbol = '') + "%</td>");
                $("#satpenetId").append("<td class='metricsValue'>" + numberFormatter(penetrationData[0].PY_Penetration, prefixSymbol = '') + "%</td>");
                $("#satpenetId").append("<td class=" + addClassColor(penetrationData[0].YoY_Penetration) + ">" + numberAvgFormatter(penetrationData[0].YoY_Penetration, prefixSymbol = '') + "%</td>");
            } else {
                $("#satpenetId").append("<td class='metricsValue'> 0 </td>");
            }
            stateRetDataFromApi();
            statepenetrationReqObj = null;
            penetrationData = null;

        }),
        error: (function (err) {
            statepenetrationReqObj = null;
            console.log(err);
        })
    });
}



let retailerData;
var dealerReqObj;
function stateRetDataFromApi() {
    if (dealerReqObj) {
        dealerReqObj.abort();
        dealerReqObj = null;
    }
    $("#stateRetai").css('display', 'block');
    retStateShareValues = null;
    let statefilterdataDealer = createStateFilterData();
    let procedureName="State_View_Key_Metrics_Retailer_Count_V2";
    dealerReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterdataDealer, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterdataDealer)),'dashboardId' : dashboardId }),
       
       // data: JSON.stringify({ 'filter': "State_View_Key_Metrics_Retailer_Count_V2", 'chartDataForms': statefilterdataDealer }),
        success: (function (resultData) {
            retailerData = resultData.data.data[0];
            retStateShareValues = retailerData;
            $("#stateRetai").css('display', 'none');
            $("#satDealDisId td").remove();
            $("#satDealDisId td").empty();
            $("#satDealDisId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retailerData.length != 0) {
                $("#satDealDisId").append("<td class='metricsValue'>" + numberFormatter(retailerData[0].CY_Count, prefixSymbol = '') + "</td>");
                $("#satDealDisId").append("<td class='metricsValue'>" + numberFormatter(retailerData[0].PY_Count, prefixSymbol = '') + "</td>");
                $("#satDealDisId").append("<td class=" + addClassColor(retailerData[0].YoY_Count) + ">" + numberAvgFormatter(retailerData[0].YoY_Count, prefixSymbol = '') + "%</td>");
                $("#keyMetricsLoaderState").css('display', 'none');
            } else {
                $("#satDealDisId").append("<td class='metricsValue'> 0 </td>");
            }
            dealerReqObj = null;
            retailerData = null;


        }),
        error: (function (err) {
            dealerReqObj = null;
            console.log(err);
        })
    });
}


var skuReqObj;
function stateskuDataFromApi() {
    if (skuReqObj) {
        skuReqObj.abort();
        skuReqObj = null;
    }
    $("#stateSKU").css('display', 'block');
    skuStateShareValues = null;
    let procedureName="State_View_Key_Metrics_SKU_Count_V2";
    let statefilterdataSku = createStateFilterData();
    skuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterdataSku, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterdataSku)),'dashboardId' : dashboardId }),
       
       // data: JSON.stringify({ 'filter': "State_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': statefilterdataSku }),
        success: (function (resultData) {
            let skuData = resultData.data.data[0];
            skuStateShareValues = skuData;
            $("#satSkuId td").remove();
            $("#satSkuId td").empty();
            $("#stateSKU").css('display', 'none');
            $("#satSkuId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (skuData.length != 0) {

                $("#satSkuId").append("<td class='metricsValue'>" + valueFormater(skuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#satSkuId").append("<td class='metricsValue'>" + valueFormater(skuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#satSkuId").append("<td class=" + addClassColor(skuData[0].YoY_Count) + ">" + valueFormater(skuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#satSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            skuReqObj = null;
            skuData = null;
        }),
        error: (function (err) {
            skuReqObj = null;
            console.log(err);
        })
    });
}



let StatePotDataObj;
function statePotentialvsSalesChartApi() {
    if (StatePotDataObj) {
        StatePotDataObj.abort();
        StatePotDataObj = null;
    }

    let statefilterterritoryData = createStateFilterData();

    let procedureName="State_View_Territory_Dtls_V2";
    StatePotDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterterritoryData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterterritoryData)),'dashboardId' : dashboardId }),
      
     //   data: JSON.stringify({ 'filter': "State_View_Territory_Dtls_V2", 'chartDataForms': statefilterterritoryData }),
        success: (function (resultData) {
            let territoryData = resultData.data.data[0];
            StatePotDataObj = null;
            if (territoryData.length <= 0) {
                showHideLoader("satPotvsSaleContain",false);
                $("#satPotvsSaleContain").append("<div class='noData'>No Data</div>");
                return;
            } else {
                StatePotentialvsSalesChart(territoryData);
            }


        }),
        error: (function (err) {
            StatePotDataObj = null;
            console.log(err);
        })
    });
}

//Categorywise Potential Data
let StateCatDataObj;
function statecategorychartFromApi() {

    if (StateCatDataObj) {
        StateCatDataObj.abort();
        StateCatDataObj = null;
    }
     let statecategoryData = createStateFilterData();
     let procedureName= "State_View_Brand_Dtls_V2";
    StateCatDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statecategoryData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statecategoryData)),'dashboardId' : dashboardId }),
      
       // data: JSON.stringify({ 'filter': "State_View_Brand_Dtls_V2", 'chartDataForms': statecategoryData }),
        success: (function (resultData) {
            let distributorData = resultData.data.data[0];
            StateCatDataObj = null;
            if (distributorData.length <= 0) {
                showHideLoader("satRetperform",false);
                $("#satRetperform").append("<div class='noData'>No Data</div>");
                return;
            } else {
                statecategorychart(distributorData);
            }
        }),
        error: (function (err) {
            StateCatDataObj = null;
            console.log(err);
        })
    });
}


//Categorywise Potential Data
let StateRetDataObj;
function stateretailerchartFromApi() {

    if (StateRetDataObj) {
        StateRetDataObj.abort();
        StateRetDataObj = null;
    }
    let stateretailerData = createStateFilterData();
    let procedureName = "State_View_Classification_Dtls";
    StateRetDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: stateretailerData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(stateretailerData)),'dashboardId' : dashboardId }),
      
       // data: JSON.stringify({ 'filter': "State_View_Classification_Dtls", 'chartDataForms': stateretailerData }),
        success: (function (resultData) {
            let retailerData = resultData.data.data[0];
            StateRetDataObj = null;
            if (retailerData.length <= 0) {
                showHideLoader("satcatPotenContainId",false);
                $("#satcatPotenContainId").append("<div class='noData'>No Data</div>");
                return;
            }
            StateRetailerChart(retailerData);


        }),
        error: (function (err) {
            StateRetDataObj = null;
            console.log(err);
        })
    });
}

let StateTownDataObj;
function stateTotalTownChartApi() {
    if (StateTownDataObj) {
        StateTownDataObj.abort();
        StateTownDataObj = null;
    }

    let statefilterterritoryData = createStateFilterData();

    let procedureName = "State_View_Territory_Town_Dtls";
    StateTownDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: statefilterterritoryData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(statefilterterritoryData)),'dashboardId' : dashboardId }),
      
       // data: JSON.stringify({ 'filter': "State_View_Territory_Town_Dtls", 'chartDataForms': statefilterterritoryData }),
        success: (function (resultData) {
            let territoryData = resultData.data.data[0];
            StateTownDataObj = null;
            if (territoryData.length <= 0) {
                showHideLoader("satTotalTownsContain",false);
                $("#satTotalTownsContain").append("<div class='noData'>No Data</div>");
                return;
            } else {
                stateTotalTownChart(territoryData);
            }


        }),
        error: (function (err) {
            StateTownDataObj = null;
            console.log(err);
        })
    });
}

function stateTotalTownChart(territoryData) {

    //  console.log(territoryData)
    let territoryname = [];
    let salesData = [];
    let potentialData = [];
    let oppurtunityData = [];
    
    showHideLoader("satTotalTownsContain", false);
    for (let i = 0; i < territoryData.length; i++) {
        territoryname.push(territoryData[i].Distributor_Territory);
        salesData.push(parseInt(territoryData[i].CY_Count * 1));
        potentialData.push(parseInt(territoryData[i].CY_Potential * 1));
        oppurtunityData.push(parseInt(territoryData[i].Oppurtunity * 1));
    }
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'satTotalTownsContain',
            inverted: true

        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: territoryname,
            title: {
                text: null
            },
            min: 0,
            scrollbar: {
                enabled: false
            }
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
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Territory: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    if(points[index].series.name =="Market Share"){
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + y_value + ' %</b><br/>';
                    }else{
                        tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + (y_value) + '</b><br/>';
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
            reversed: true,
            padding: 0

        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Total Towns',
            color: '#02b8fd',
            data: potentialData
        }, {
            name: 'Towns Present',
            color: '#ff5e19',
            data: salesData
        },{ 
            name: 'Oppurtunity',
            color:'#eac133',
            data: oppurtunityData
        }]
    };
    if (territoryname.length > 5) {
        options.xAxis.max = 5;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}

function StatePotentialvsSalesChart(territoryData) {

    //  console.log(territoryData)
    let territoryname = [];
    let salesData = [];
    let potentialData = [];
    let penetrationData = [];
    let gapData = [];
    showHideLoader("satPotvsSaleContain", false);
    for (let i = 0; i < territoryData.length; i++) {
        territoryname.push(territoryData[i].Distributor_Territory);
        gapData.push(parseInt(territoryData[i].GAP * 1));
        salesData.push(parseInt(territoryData[i].CY_Sales * 1));
        potentialData.push(parseInt(territoryData[i].CY_Potential * 1));
        penetrationData.push(parseInt(territoryData[i].Penetration * 1));
    }
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'satPotvsSaleContain',
            inverted: true

        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: territoryname,
            title: {
                text: null
            },
            min: 0,
            scrollbar: {
                enabled: false
            }
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
                    if(points[index].series.name =="Market Share"){
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
            reversed: true,
            padding: 0

        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Sales',
            color: '#02b8fd',
            data: salesData
        },{
            name: 'Addressability',
            color: '#ff5e19',
            data: potentialData
        },{
            showInLegend: false, 
            name: 'Market Share',
            color:'#E1C233',
            data: penetrationData
        }]
    };
    if (territoryname.length > 5) {
        options.xAxis.max = 5;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}


function statecategorychart(distributorData) {
    let bikeNames = [];
    let stateData = []
    let stateIndex;
    let avengerData = [];
    let platinaData = [];
    let discoverData = [];
    let pulsarData = [];
    let dummyState = [];
    for (let i = 0; i < distributorData.length; i++) {
        stateIndex = dummyState.findIndex(obj => obj.State == distributorData[i].State);
        if (stateIndex == -1) {
            dummyState.push({ State: distributorData[i].State });
            stateData.push(distributorData[i].State)
        }
        if (distributorData[i].Bike_Brand == "Apache") {
            avengerData.push(parseInt(distributorData[i].Potential* 1))
        }
        if (distributorData[i].Bike_Brand == "Jupiter") {
            platinaData.push(parseInt(distributorData[i].Potential* 1))
        }
        if (distributorData[i].Bike_Brand == "Enfield") {
            discoverData.push(parseInt(distributorData[i].Potential* 1))
        }
    }
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'satRetperform',
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
            reversed: true,
            padding: 0
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Apache',
            color: '#02b8fd',
            data: avengerData
        }, {
            name: 'Enfield',
            color: '#ff5e19',
            data: discoverData
        }, {
            name: 'Jupiter',
            color: '#0046cc',
            data: platinaData
        }]
    };
    if (stateData.length > 2) {
        options.xAxis.max = 2;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
 }





function StateRetailerChart(retailerData) {
    //    console.log(retailerData) 
    let salesData = [];
    let classificationData = [];
    let potenData = [];
    let gapData = [];
    let penetrData =[];
    showHideLoader("satcatPotenContainId", false);
    // $(".loader").css('margin-top', '11vw');
    for (let i = 0; i < retailerData.length; i++) {
        salesData.push(parseInt(retailerData[i].Sales * 1));
        classificationData.push(retailerData[i].Classification);
        potenData.push(parseInt(retailerData[i].Potential * 1));
        gapData.push(parseInt(retailerData[i].GAP * 1));
        penetrData.push(parseInt(retailerData[i].Penetration * 1));
    }
    showHideLoader("satcatPotenContainId", false);
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'satcatPotenContainId',
            inverted: true
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: classificationData,
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
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px"> Part Category: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    if(points[index].series.name =="Market Share"){
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
            reversed: true,
            padding: 0

        },
        credits: {
            enabled: false
        },
        series: [{
            
            name: 'Gap',
            color: '#02b8fd',
            data: gapData
        }, {
            name: 'Addressability',
            color: '#0046cc',
            data: potenData
        }, {
            name: 'Sales',
            color: '#ff5e19',
            data: salesData
        },{
            showInLegend: false, 
            name: 'Market Share',
            color:'#E1C233',
            data: penetrData
        }]
    };
    if (classificationData.length > 1) {
        options.xAxis.max = 1;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}
    //*************************************   breaking new    ************************************************************************** */


    function breakingNews1() {
        let statefilterBreakingdata = createStateFilterData();
        $.ajax({
            url: getApiDomain(),
            type: "POST",
            data: JSON.stringify({ filter: "State_View_News_Ticker",'chartDataForms': statefilterBreakingdata }),
            success: (function (data) {
                let printData1 = data.data.data;
                let dateBreakingNewArr1 = printData1[0];
                populateBreakingNews(dateBreakingNewArr1);
            }),
            error: (function (err) {
                console.log(err);
            })
        });
    }
    function populateBreakingNews(data) {
        let printDataStr1 = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].YoY_Penetration <= 0) {
                printDataStr1 += data[i].Part_Category + " &nbsp;&nbsp;&nbsp; <span style='color: red'>&#9660;</span> &nbsp;" + numberFormatter (data[i].YoY_Penetration)+ "% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

            } else {
                printDataStr1 += data[i].Part_Category + " &nbsp;&nbsp;&nbsp; <span style='color: green'>&#9650;</span> &nbsp;" +numberFormatter (data[i].YoY_Penetration)+ " % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
        }
        // console.log("print--  "+printDataStr);
        document.getElementById("breakingNews1").innerHTML = printDataStr1;
    }



//*************************  filter function      ***************************** */
function createStateFilterData() {
    allStateFilterData = [];
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
    //if (idMeta != '') {
        if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
    } else {
        distributorData = $("#distributorFilter").val();
        if(distributorData.length > 1){
        var notSelected2 = $("#distributorFilter").find('option').not(':selected');
        var arrayOfUnselected = notSelected2.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            distributorData = "";
        }
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

    allStateFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allStateFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allStateFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allStateFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allStateFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allStateFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    allStateFilterData.push({ dataType: "String", key: 'classification', value: classifictionFilterData.toString() });

    return allStateFilterData;
}



function sharedDataStateCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command = {};
    command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of " + title;
    command.filterData = filterData

    let sharePotential = "Potential," + sharedFormatter(potentialStateShareValues[0].CY_Potential) + "," + sharedFormatter(potentialStateShareValues[0].PY_Potential) + "," + sharedFormatter(potentialStateShareValues[0].YoY_Potential) + "%";
    let sharePenetration = "Market Share," + sharedFormatter(penetraStateShareValues[0].CY_Penetration) + "," + sharedFormatter(penetraStateShareValues[0].PY_Penetration) + "," + sharedFormatter(penetraStateShareValues[0].YoY_Penetration) + "%";
    let shareDealers = "Dealers Sales," + sharedFormatter(saleStateShareValues[0].CY_Sales) + "," + sharedFormatter(saleStateShareValues[0].PY_Sales) + "," + sharedFormatter(saleStateShareValues[0].YoY_Sales) + "%";
    let shareDisribute = "Retailers," + sharedFormatter(retStateShareValues[0].CY_Count) + "," + sharedFormatter(retStateShareValues[0].PY_Count) + "," + sharedFormatter(retStateShareValues[0].YoY_Count) + "%";
    let shareSku = "#SKU," + sharedFormatter(skuStateShareValues[0].CY_Count) + "," + sharedFormatter(skuStateShareValues[0].PY_Count) + "," + sharedFormatter(skuStateShareValues[0].YoY_Count) + "%";

    let sharedData = "Category,CY,LY,YOY Growth \n" + sharePotential + "\n" + sharePenetration + "\n" + shareDealers + "\n" + shareDisribute + "\n" + shareSku + "";

    shareDataApiObject = { report: report, command: command, title: title, sharedData: sharedData }
    trackCustomEvent('Share Data Pop up Open', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": reportTitle.toString()
    });
    $('#myModal').modal('show');
}   