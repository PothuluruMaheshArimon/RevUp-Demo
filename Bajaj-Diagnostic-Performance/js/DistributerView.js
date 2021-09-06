//shared data Metrices
let salesDistryShareValues;
let salesDistryRetaShareValues;
let retaiInDistryShareValues;
let retaiDistryShareValues;
let skuDistryShareValues;

//Distributor View KPI Matrix
var retcountReqObj;
function distretDataFromApi() {
    if (retcountReqObj) {
        retcountReqObj.abort();
        retcountReqObj = null;
    }
    $("#distRetai").css('display', 'block');
    retaiDistryShareValues = null;
    let distrifilterdataCount = createDistFilterData();
    let procedureName = "Distributor_View_Key_Metrics_Retailer_Count_V2";
    retcountReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: distrifilterdataCount, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(distrifilterdataCount)),'dashboardId' : dashboardId }),
      
      //  data: JSON.stringify({ 'filter': "Distributor_View_Key_Metrics_Retailer_Count_V2", 'chartDataForms': distrifilterdataCount }),
        success: (function (resultData) {
            let countData = resultData.data.data[0];
            retaiDistryShareValues = countData;
            $("#disRetailerId td").remove();
            $("#disRetailerId td").empty();
            $("#distRetai").css('display', 'none');
            $("#disRetailerId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if(countData.length != 0){
            $("#disRetailerId").append("<td class='metricsValue'>" +numberFormatter(countData[0].CY_Count, prefixSymbol = '')  + " </td>");
            $("#disRetailerId").append("<td class='metricsValue' style = 'width: 27%;'>" +numberFormatter(countData[0].PY_Count, prefixSymbol = '')  + " </td>");
            $("#disRetailerId").append("<td class="+addClassColor(countData[0].YoY_Count)+">"+numberAvgFormatter(countData[0].YoY_Count, prefixSymbol = '')  + "%</td>");
            }else{
                $("#disRetailerId").append("<td class='metricsValue'> 0 </td>");
            }
            distriSaleRetDataFromApi();
            retcountReqObj = null;
            countData = null;
        }),
        error: (function (err) {
            retcountReqObj = null;
            console.log(err);
        })
    });
}


//Distributor View Sales 
var dealsaleReqObj;
function distridealDataFromApi() {
    if (dealsaleReqObj) {
        dealsaleReqObj.abort();
        dealsaleReqObj = null;
    }
    $("#distPot").css('display', 'block');
    let distrifilterdatasale = createDistFilterData();
    let procedureName="Distributor_View_Key_Metrics_Potential_V2";
    salesDistryShareValues = null;
    dealsaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: distrifilterdatasale, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(distrifilterdatasale)),'dashboardId' : dashboardId }),
      
       // data: JSON.stringify({ 'filter': "Distributor_View_Key_Metrics_Potential_V2", 'chartDataForms': distrifilterdatasale }),
        success: (function (resultData) {
            let countData = resultData.data.data[0];
            salesDistryShareValues = countData;
            $("#distPot").css('display', 'none');
            $("#disSalesId td").remove();
            $("#disSalesId td").empty();
            $("#disSalesId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if(countData.length != 0){
            $("#disSalesId").append("<td class='metricsValue'>" +numberFormatter(countData[0].CY_Potential, prefixSymbol = '')  + " </td>");
            $("#disSalesId").append("<td class='metricsValue' style = 'width: 27%;'>" +numberFormatter(countData[0].PY_Potential, prefixSymbol = '')  + " </td>");
            $("#disSalesId").append("<td class="+addClassColor(countData[0].YoY_Potential)+">"+numberAvgFormatter(countData[0].YoY_Potential, prefixSymbol = '')  + "%</td>");
            }else{
                $("#disSalesId").append("<td class='metricsValue'> 0 </td>");
            }
            distriRetInvoDataFromApi();
            dealsaleReqObj = null;
            countData = null;
        }),
        error: (function (err) {
            dealsaleReqObj = null;
            console.log(err);
        })
    });
}
//Distributor View Sales Per Retailer
var dealsaleRetReqObj;
function distriSaleRetDataFromApi() {
    if (dealsaleRetReqObj) {
        dealsaleRetReqObj.abort();
        dealsaleRetReqObj = null;
    }
    $("#distSale").css('display', 'block');
    salesDistryRetaShareValues = null;
    let distrifilterdatasaleRetail = createDistFilterData();
    let procedureName= "Distributor_View_Key_Metrics_Sales";
    dealsaleRetReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: distrifilterdatasaleRetail, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(distrifilterdatasaleRetail)),'dashboardId' : dashboardId }),
      
      //  data: JSON.stringify({ 'filter': "Distributor_View_Key_Metrics_Sales", 'chartDataForms': distrifilterdatasaleRetail }),
        success: (function (resultData) {
            let SalRetData = resultData.data.data[0];
            salesDistryRetaShareValues = SalRetData;
            $("#disSalRetId td").remove();
            $("#disSalRetId td").empty();
            $("#distSale").css('display', 'none');
            $("#disSalRetId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if(SalRetData.length != 0){

            $("#disSalRetId").append("<td class='metricsValue'>" +numberFormatter(SalRetData[0].CY_Sales, prefixSymbol = '')  + " </td>");
            $("#disSalRetId").append("<td class='metricsValue' style = 'width: 27%;'>" +numberFormatter(SalRetData[0].PY_Sales, prefixSymbol = '')  + " </td>");
            $("#disSalRetId").append("<td class="+addClassColor(SalRetData[0].YoY_Sales)+">"+numberAvgFormatter(SalRetData[0].YoY_Sales, prefixSymbol = '')  + "%</td>");
            }else{
                $("#disSalRetId").append("<td class='metricsValue'> 0 </td>");
            }
            distriSKUDataFromApi();
            dealsaleRetReqObj = null;
            SalRetData = null;
        }),
        error: (function (err) {
            dealsaleRetReqObj = null;
            console.log(err);
        })
    });
}
//Distributor View Retailer Invoice Frequency
var dealRetInvoReqObj;
function distriRetInvoDataFromApi() {
    if (dealRetInvoReqObj) {
        dealRetInvoReqObj.abort();
        dealRetInvoReqObj = null;
    }
    $("#disInv").css('display', 'block');
    retaiInDistryShareValues = null;
    let distrifilterdataRetailInvo = createDistFilterData();
    let procedureName= "Distributor_View_Key_Metrics_Penetration_V2";
    dealRetInvoReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: distrifilterdataRetailInvo, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(distrifilterdataRetailInvo)),'dashboardId' : dashboardId }),
      
      //  data: JSON.stringify({ 'filter': "Distributor_View_Key_Metrics_Penetration_V2", 'chartDataForms': distrifilterdataRetailInvo }),
        success: (function (resultData) {
            let RetInvoData = resultData.data.data[0];
            retaiInDistryShareValues = RetInvoData;
            $("#disInvoId td").remove();
            $("#disInvoId td").empty();
            $("#disInv").css('display', 'none');
            $("#disInvoId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if(RetInvoData.length !=0){

            $("#disInvoId").append("<td class='metricsValue'>" +valueFormater(RetInvoData[0].CY_Penetration, prefixSymbol = '')  + " </td>");
            $("#disInvoId").append("<td class='metricsValue' style = 'width: 27%;'>" +valueFormater(RetInvoData[0].PY_Penetration, prefixSymbol = '')  + " </td>");
            $("#disInvoId").append("<td class="+addClassColor(RetInvoData[0].YoY_Penetration)+">"+valueFormater(RetInvoData[0].YoY_Penetration, prefixSymbol = '')  + "%</td>");
            }else{
                $("#disInvoId").append("<td class='metricsValue'> 0 </td>");
            }
            dealRetInvoReqObj = null;
            RetInvoData = null;
        }),
        error: (function (err) {
            dealRetInvoReqObj = null;
            console.log(err);
        })
    });
}
//Distributor View SKU Sold
var dealSKUReqObj;
function distriSKUDataFromApi() {
    if (dealSKUReqObj) {
        dealSKUReqObj.abort();
        dealSKUReqObj = null;
    }
    $("#distSKU").css('display', 'block');
    skuDistryShareValues = null;
    let distrifilterdatasku = createDistFilterData();
    let procedureName = "Distributor_View_Key_Metrics_SKU_Count_V2";
    dealSKUReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: distrifilterdatasku, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(distrifilterdatasku)),'dashboardId' : dashboardId }),
     
     //   data: JSON.stringify({ 'filter': "Distributor_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': distrifilterdatasku }),
        success: (function (resultData) {
            let SkusolData = resultData.data.data[0];
            skuDistryShareValues = SkusolData;
            $("#disSkuId td").remove();
            $("#disSkuId td").empty();
            $("#distSKU").css('display', 'none');
            $("#disSkuId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if(SkusolData.length !=0){

            $("#disSkuId").append("<td class='metricsValue'>" +valueFormater(SkusolData[0].CY_Count, prefixSymbol = '')  + " </td>");
            $("#disSkuId").append("<td class='metricsValue' style = 'width: 27%;'>" +valueFormater(SkusolData[0].PY_Count, prefixSymbol = '')  + " </td>");
            $("#disSkuId").append("<td class="+addClassColor(SkusolData[0].YoY_Count)+">"+valueFormater(SkusolData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            }else{
                $("#disSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            dealSKUReqObj = null;
            SkusolData = null;
            $("#keyMetricsLoaderDistri").css('display', 'none');
        }),
        error: (function (err) {
            dealSKUReqObj = null;
            console.log(err);
        })
    });
}

// ********************************************************************************************/////


//District Wise Potential Vs Sales
let distriPotSalDataObj;
function distriPotentialvsSalesChartApi(){
    if (distriPotSalDataObj) {
        distriPotSalDataObj.abort();
        distriPotSalDataObj = null;
    }
    let dirtriPotFilterdata = createDistFilterData();
    let procedureName = "Distributor_View_District_Dtls_V2";
    distriPotSalDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtriPotFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtriPotFilterdata)),'dashboardId' : dashboardId }),
     
        //data: JSON.stringify({ 'filter': "Distributor_View_District_Dtls_V2", 'chartDataForms': dirtriPotFilterdata }),
        success: (function (resultData) {
           let stateData = resultData.data.data[0];
           distriPotSalDataObj = null;
           distriSegChartApi();
                if (stateData.length <= 0) {
                    showHideLoader("districtPerfChartContainerId",false);
                    $("#districtPerfChartContainerId").append("<div class='noData'>No Data</div>");
                    return;
                }
            distriPotentialvsSalesChart(stateData);

            
        }),
        error: (function (err) {
            distriPotSalDataObj = null;
            console.log(err);
        })
    });
}

//bar chart//
function distriPotentialvsSalesChart(stateData){
    //console.log(stateData)
    let DistrictName=[];
    let PotentialData=[];
    let SaleData=[];
    let PenetrData=[];
    for(let i=0;i<stateData.length;i++){
        DistrictName.push(stateData[i].DistrictName);
        PotentialData.push(parseInt(stateData[i].CY_Potential*1));
        SaleData.push(parseInt(stateData[i].CY_Sales*1));
        PenetrData.push(parseInt(stateData[i].CY_Penetration *1));
    }
let options = {
    chart: {
                        type: 'bar',
                        renderTo: 'districtPerfChartContainerId',
                        inverted: true 
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: DistrictName,
                         min:0,
                        title: {
                            text: null
                        },
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
                              }
                                                
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        formatter: function () {
                            var points = this.points;
                            var pointsLength = points.length;
                            var tooltipMarkup = pointsLength ? '<span style="font-size: 13px"> District: ' + points[0].key + '</span><br/>' : '';
                            var index;
                            var y_value;
                            for (index = 0; index < pointsLength; index++) {
                                if (points[index].point.target != undefined) {
                                    y_value = points[index].point.target +" ("+(this.percentage).toFixed(2)+"%"+")"+'<br>';
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
                        padding: 1,
                        itemStyle: {
                            color: '#000000',
                            fontWeight: '600',
                            fontSize:'11px'
                        },
                        
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Addressability',
                       color:'#118DFF',
                        data: PotentialData
                    }, {
                        name: 'Sales',
                        color:'#E66C37',
                        data: SaleData
                    },{
                        showInLegend: false, 
                        name: 'Market Share',
                            color:'#E1C233',
                            data: PenetrData
    
    }] 
 };

 if (DistrictName.length > 5) {
    options.xAxis.max = 5;
    options.xAxis.scrollbar.enabled = true;
}
let chart = new Highcharts.Chart(options);
}
// ********************************************************************************************/////

// district wise town
let distriTownDataObj;
function distriWiseTownChartApi(){
    if (distriTownDataObj) {
        distriTownDataObj.abort();
        distriTownDataObj = null;
    }
    let dirtriPartFilterdata = createDistFilterData();
    let procedureName = "Distributor_View_District_Town_Dtls";
    distriTownDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtriPartFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtriPartFilterdata)),'dashboardId' : dashboardId }),
     
     //   data: JSON.stringify({ 'filter': "Distributor_View_District_Town_Dtls", 'chartDataForms': dirtriPartFilterdata }),
        success: (function (resultData) {
           let categoryData = resultData.data.data[0];
           distriTownDataObj = null;
           distriPerfomChartApi();
                if (categoryData.length <= 0) {
                    showHideLoader("districtWiseTownReachChartContainerId",false);
                    $("#districtWiseTownReachChartContainerId").append("<div class='noData'>No Data</div>");
                    return;
                }
                distriWiseTownChart(categoryData);
        }),
        error: (function (err) {
            distriTownDataObj = null;
            console.log(err);
        })
    });
}

 //bar chart//
 function distriWiseTownChart(categoryData)
 {
   //  console.log(categoryData)
     let partcategoryData=[];
     let salesData=[];
     let potentialData=[];
     let opportunityData =[];

     for(let i=0;i<categoryData.length;i++){
     partcategoryData.push(categoryData[i].Distributor_Territory);
     salesData.push(parseInt(categoryData[i].CY_Count*1));
     potentialData.push(parseInt(categoryData[i].CY_Potential*1));
     opportunityData.push(parseInt(categoryData[i].Oppurtunity));
     
     }

let options = {
     chart: {
                     type: 'bar',
                     renderTo:'districtWiseTownReachChartContainerId',
                     inverted: true 
                     
                 },
                 title: {
                     text: ''
                 },
                 subtitle: {
                     text: ''
                 },
                 xAxis: {
                     categories: partcategoryData,
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
                           }},
        
                 
                 tooltip: {
         shared: true,
         useHTML: true,
         formatter: function () {
             var points = this.points;
             var pointsLength = points.length;
             var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">District: ' + points[0].key + '</span><br/>' : '';
             var index;
             var y_value;
             for (index = 0; index < pointsLength; index++) {
                 if (points[index].point.target != undefined) {
                     y_value = points[index].point.target;
                 } else {
                     y_value = points[index].y;
                 }
                 tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + (y_value) + '</b><br/>';
             }
             return tooltipMarkup;
         },
     },
     // tooltip: {
     //     pointFormat: '<span style="color:{series.color}">{series.point}</span> : <b>{point.y}</b> {point.percentage:.0f}%<br/>',
     //     shared: true
     //     },
                 plotOptions: {
                     bar: {
                         dataLabels: {
                             enabled: false
                         }
                     }
                 },
                 legend: {
                      reversed: true,
                      padding: 1,
                      itemStyle: {
                        color: '#000000',
                        fontWeight: '600',
                        fontSize:'11px'
                    },
                 },
                 credits: {
                     enabled: false
                 },
                 series: [{
                     name: 'Total Towns',
                    color:'#118DFF ',
                     data: potentialData
                 }, {
                     name: 'Towns Present',
                     color:'#E66C37',
                     data: salesData
                    }, {
                        name: ' Opportunity ',
                         color:'#E1C233',
                        data: opportunityData
                     }]
                 };

 if (partcategoryData.length > 5) {
     options.xAxis.max = 5;
     options.xAxis.scrollbar.enabled = true;
 }
 let chart = new Highcharts.Chart(options);
 
 }
// ********************************************************************************************/////


/** * Part Category Wise Potential Vs Sales      */
let distriPartDataObj;
function distriPartPoteSalesChartApi() {
    if (distriPartDataObj) {
        distriPartDataObj.abort();
        distriPartDataObj = null;
    }

    let dirtriPartFilterdata = createDistFilterData();
    let procedureName = "Distributor_View_Classification_Dtls";
    distriPartDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtriPartFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtriPartFilterdata)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Distributor_View_Classification_Dtls", 'chartDataForms': dirtriPartFilterdata }),
        success: (function (resultData) {
            let classificationData = resultData.data.data[0];
            distriPartDataObj = null;
            if (classificationData.length <= 0) {
                showHideLoader("partcategoryChartContainerId",false);
                $("#partcategoryChartContainerId").append("<div class='noData'>No Data</div>");
                return;
            }
            distriPartPoteSalesChart(classificationData);


        }),
        error: (function (err) {
            distriPartDataObj = null;
            showHideLoader("partcategoryChartContainerId", false);
            console.log(err);
        })
    });
}

function distriPartPoteSalesChart(data) {
    // console.log(stateData)
    let ClassificationData = [];
    let GAPData = [];
    let SalesData = [];
    let PotentialData = [];
    let PenetrationData = [];

    for (let i = 0; i < data.length; i++) {
       // ClassificationData.push(data[i].Classification !== undefined ? data[i].Classification :  data[i].Part_Category);
       ClassificationData.push(data[i].Classification); 
       GAPData.push(parseInt(data[i].GAP * 1) );
        SalesData.push(parseInt(data[i].Sales * 1) );
        PotentialData.push(parseInt(data[i].Potential  * 1));
        PenetrationData.push(parseInt(data[i].Penetration * 1 , "%"));
    }
    showHideLoader("partcategoryChartContainerId", false);
    let options = {
        chart: {
            type: 'bar',
            renderTo: 'partcategoryChartContainerId',
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
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px"> Classification: ' + points[0].key + '</span><br/>' : '';
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
        // legend: {
        //     reversed: true

        // },
        legend: {
            itemStyle: {
                color: '#000000',
                fontWeight: '600',
                fontSize:'11px'
            },
            reversed: true,
            padding: 1,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Gap',
            color: '#118DFF',
            data: GAPData
        }, {
            name: 'Addressability',
            color: '#12239E',
            data: PotentialData
        }, {
            name: 'Sales',
            color: '#E66C37',
            data: SalesData
        // },{
        //     showInLegend: false, 
        //     showInSeries: false,
        //     name: 'Penetration',
        //         color:'#E1C233',
        //         data: PenetrationData
        }]
    };
    if (ClassificationData.length > 6) {
        options.xAxis.max = 6;
        options.xAxis.scrollbar.enabled = true;
    }
    let chart = new Highcharts.Chart(options);
}
// //************************************************************************************ */


//Distributor View Retailer Performance
let distriPerforDataObj;
function distriPerfomChartApi(){
    if (distriPerforDataObj) {
        distriPerforDataObj.abort();
        distriPerforDataObj = null;
    }
    let dirtriperformFilterdata = createDistFilterData();
    let procedureName = "Distributor_View_Retailer_Growth_Dtls_V2";

    distriPerforDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtriperformFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtriperformFilterdata)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Distributor_View_Retailer_Growth_Dtls_V2", 'chartDataForms': dirtriperformFilterdata }),
        success: (function (resultData) {
           let performData = resultData.data.data[0];
           distriPerforDataObj = null;
           showHideLoader("RetailerPerformanceContainerId",false);
                if (performData.length <= 0) {
                        $("#RetailerPerformanceContainerId").append("<div class='noData'>No Data</div>");
                    return;
                }
            distriPerfomChart(performData);

            
        }),
        error: (function (err) {
            distriPerforDataObj = null;
            console.log(err);
        })
    });
}
    // //stacked bar chart
    function distriPerfomChart(performData){
        //  console.log(performData)
          let RetailerGrowth=[];
          //let CountCC=[];
          let growingData =[];
          let newData =[];
          let nochangeData =[];
          let shrinkingData = [];
          let blankData=[];
          for(i=0;i<performData.length;i++){
              RetailerGrowth.push(performData[i].Retailer_Growth);
              //CountCC.push(performData[i].CY_Sales*1);
              if(performData[i].Retailer_Growth == "Growing"){
                  growingData.push(parseInt(performData[i].CY_Count* 1))
              }
              if(performData[i].Retailer_Growth == "New"){
                  newData.push(parseInt(performData[i].CY_Count* 1))
              }
              if(performData[i].Retailer_Growth == "No Change"){
                  nochangeData.push(parseInt(performData[i].CY_Count* 1))
              }
              if(performData[i].Retailer_Growth == "Shrinking"){
                  shrinkingData.push(parseInt(performData[i].CY_Count* 1))
              }
          }
      Highcharts.chart('RetailerPerformanceContainerId', {
          chart: {
              type: 'bar'
          },
          title: {
               text: ''
                  },
                  legend: {
                      backgroundColor: '#FFFFFF',
                      layout: 'horizontal',
                      floating: false,
                      align: 'left',
                      horizontalAlign: 'top',
                      symbolPadding: 8,
                      symbolWidth: 0,
                     
                      labelFormatter: function () {
                          return this.name ;
                      },
                      padding: 1,
                      itemStyle: {
                        color: '#000000',
                        fontWeight: '600',
                        fontSize:'11px'
                    },
                  },   
          xAxis: {
              categories: RetailerGrowth,
              title: {
               text: null,
             },  
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
              pointFormat: '<span style="color:{series.color}">{series.name} </span> Retailer: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
         
          
          plotOptions: {
              series: {
                  stacking: 'normal'
              }
          },
          
          series: [{
              name: 'Growing',
              color:'#118DFF',
              data: growingData
          },{
              name: 'New',
              color:'#12239E',
              data: newData
          },{
              name: 'No Change',
              color:'#E66C37',
              data: nochangeData
          },{
              name: 'Shrinking',
              color:'#6B007B',
              data: shrinkingData
          
          }]
      });
  }
///*********************************************************************************** */  


//Distributor View Retailer Performance
let distriBreadforDataObj;
function distriBreadthChartApi(){
    if (distriBreadforDataObj) {
        distriBreadforDataObj.abort();
        distriBreadforDataObj = null;
    }
    let dirtribreaformFilterdata = createDistFilterData();
    let procedureName = "Distributor_View_Retailer_Breadth_Dtls_V2";

    distriBreadforDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtribreaformFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtribreaformFilterdata)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Distributor_View_Retailer_Breadth_Dtls_V2", 'chartDataForms': dirtribreaformFilterdata }),
        success: (function (resultData) {
           let breadData = resultData.data.data[0];
           distriBreadforDataObj = null;
           showHideLoader("breadthPerfChartContainerId",false);
           $(".loader").css('margin-top', '11vw'); 
                if (breadData.length <= 0) {
                    $("#breadthPerfChartContainerId").append("<div class='noData'>No Data</div>");
                    return;
                }
                distriBreadthChart(breadData);

            
        }),
        error: (function (err) {
            distriBreadforDataObj = null;
            console.log(err);
        })
    });
}


 // Distributor Retailer Breadth
 function distriBreadthChart(breadData){
    // console.log(breadData)
     let skuCategory=[];
     let CountofCC=[];

     for(i=0;i<breadData.length;i++){
         skuCategory.push(breadData[i].Distinctskucategory);
         CountofCC.push(parseInt(breadData[i].CY_Count*1));
     }
     Highcharts.chart('breadthPerfChartContainerId', {
         chart: {
             type: 'bar',
             inverted: true,
             style: {
                 fontSize: 11,
                 fontWeight:'600'
               },
               events: {
                 load: function() {
                   let categoryHeight = 50;
                   this.update({
                     chart: {
                       height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                     }
                   })
                 }
               }
         },
         scrollbar: {
             enabled: false
         },
         title: {
             text: ''
         },
         subtitle: {
             text: ''
         },
         xAxis: {
             categories: skuCategory,
              min:0,
                max:2,
             title: {
                 text: null
             },
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
         var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Retailer Breadth ' + points[0].key + '</span><br/>' : '';
         var index;
         var y_value;
         for (index = 0; index < pointsLength; index++) {
             if (points[index].point.target != undefined) {
                 y_value = points[index].point.target;
             } else {
                 y_value = points[index].y;
             }
             tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b>' + y_value + '</b><br/>';
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
             padding: 1,
             itemStyle: {
                color: '#000000',
                fontWeight: '600',
                fontSize:'11px'
            }
         },
         credits: {
             enabled: false
         },
         series: [{
             showInLegend:false,
             name: 'Retailer',
            color:'#118DFF',
             data: CountofCC
         }] 
     });
 }

////******************************************************************************** */


//Distributor View Retailer Segment
let distrisegforDataObj;
function distriSegChartApi(){
    if (distrisegforDataObj) {
        distrisegforDataObj.abort();
        distrisegforDataObj = null;
    }
    let dirtrisegformFilterdata = createDistFilterData();
    
    let procedureName = "Distributor_View_Retailer_Segment";
    distrisegforDataObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: dirtrisegformFilterdata, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(dirtrisegformFilterdata)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Distributor_View_Retailer_Segment", 'chartDataForms': dirtrisegformFilterdata }),
        success: (function (resultData) {
           let segmentData = resultData.data.data[0];
           distrisegforDataObj = null;
           distriBreadthChartApi();
           showHideLoader("RetailerPerfChartContainerId",false);
                if (segmentData.length <= 0) {
                    $("#RetailerPerfChartContainerId").append("<div class='noData'>No Data</div>");
                    return;
                }
            distriSegChart(segmentData);

            
        }),
        error: (function (err) {
            distrisegforDataObj = null;
            showHideLoader(containerId, false);
            console.log(err);
        })
    });
}
    // Create the chart
    function distriSegChart(segmentData){

        let rfmseg=[];
        let rfmsale=[];
        let rfmretailer=[];
        let rfmretailercontri=[];
        for(i=0;i<segmentData.length;i++){
            rfmseg.push(segmentData[i].Retailer_Segment);
            rfmsale.push(parseInt(segmentData[i].Sales* 1));
            rfmretailer.push(parseInt(segmentData[i].Retailer_Count* 1));
            rfmretailercontri.push(parseInt(segmentData[i].Retailer_Contrib *1));
        }
    
        Highcharts.chart('RetailerPerfChartContainerId', {

            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            legend: {
                itemStyle: {
                    color: '#000000',
                    fontWeight: '600',
                    fontSize:'11px'
                },
                padding: 1,
            },
             title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 20
            },
            tooltip: {
                shared: true,
                useHTML: true,
                formatter: function () {
                    
                    console.log(this)
                    //console.log(this.series.name)
                    console.log(this.key)
                    console.log(this.percentage)
                    return this.key+" : <br>"+
                    "Sales : "+getnumFormatterRupe(this.y)+" ("+(this.percentage).toFixed(2)+"%"+")"+'<br>'+
                    "Retailer : "+parseInt(this.point.z)+" ("+(this.point.k).toFixed(2)+"%"+")";
                },
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    size: '20%',
                    center: ['40%', '40%'],
                    size: '80%',
                    dataLabels: {
                        enabled: true,
                        distance: 5,
                        style: {
                            fontWeight: '600',
                            fontSize:'11px'
                        },
                        format: '<b style="font-weight:300,font-size:12px">{point.name}</b>: {point.percentage:.0f}% '
                    }
                }
            },
                series: [{
                    name: 'Sales',
                    colorByPoint: true,
                    innerSize:'50%' ,
                    data: [{
                        name: rfmseg[0],
                        y: rfmsale[0] ,
                        z:rfmretailer[0],
                        k:rfmretailercontri[0],
                        sliced: false,
                        selected: true
                    }, {
                        name: rfmseg[1],
                        y: rfmsale[1],
                        z:rfmretailer[1],
                        k:rfmretailercontri[1],
                    }, {
                        name: rfmseg[2],
                        y: rfmsale[2],
                        z:rfmretailer[2],
                        k:rfmretailercontri[2],
                    }, {
                        name: rfmseg[3],
                        y: rfmsale[3],
                        z:rfmretailer[3],
                        k:rfmretailercontri[3],
                    }, {
                        name: rfmseg[4],
                        y: rfmsale[4],
                        z:rfmretailer[4],
                        k:rfmretailercontri[4],
                
                    }]
                }]
                
            });
        
            }
  
/////*************************************************************************************** */
  


function createDistFilterData(){
    allDistriFilterData=[];
    let yearData = $("#yearFilter").val();
    let monthDataNum=$("#monthFilter").val();
    let stateData=$("#stateFilter").val();
    let categoryData=$("#partCategoryFilter").val();
    var notSelected = $("#partCategoryFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length==0){
        categoryData="";
    }
   // let territoryData=$("#territoryFilter").val();

    let distributorData ='';
    if(idMeta !='' && stateMeta == ''){
        distributorData = idMeta;
   }else{
     distributorData=$("#distributorFilter").val();
     if(distributorData.length > 1){
    var notSelected = $("#distributorFilter").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length==0){
        distributorData="";
    }
  }
}

let territoryData=$("#territoryFilter").val();
var notSelected1 = $("#territoryFilter").find('option').not(':selected');
var arrayOfUnselectedTerry = notSelected1.map(function () {
    return this.value;
}).get();
if (arrayOfUnselectedTerry.length==0){
    territoryData="";
}
let classifictionFilterData =$("#classifictionFilter").val();
var notSelected3 = $("#classifictionFilter").find('option').not(':selected');
var arrayOfUnselected = notSelected3.map(function () {
    return this.value;
}).get();
if (arrayOfUnselected.length==0){
    classifictionFilterData="";
}
    allDistriFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allDistriFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allDistriFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allDistriFilterData.push({ dataType: "String", key: 'PartCategory', value: categoryData.toString() });
    allDistriFilterData.push({dataType:  "String", key: 'Territory',value:territoryData.toString()});
    allDistriFilterData.push({dataType:  "String", key: 'DistributorID',value:distributorData.toString()});
    allDistriFilterData.push({dataType:  "String", key: 'classification', value: classifictionFilterData.toString() });
 
    return allDistriFilterData;
}
//***********************************  breaking new      ********************************************** */
function breakingNews2() {
    let distrfilterBreakingdata = createDistFilterData();
    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ filter: "Distributor_View_News_Ticker",'chartDataForms': distrfilterBreakingdata }),
        success: (function (data) {
            let printData2 = data.data.data;
            let dateBreakingNewArr2 = printData2[0];
            populateBreakingNews2(dateBreakingNewArr2);
        }),
        error: (function (err) {
            console.log(err);
        })
    });
}
function populateBreakingNews2(data) {
    let printDataStr2 = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].YoY_Penetration <= 0) {
            printDataStr2 += data[i].DistrictName + " &nbsp;&nbsp;&nbsp; <span style='color: red'>&#9660;</span> &nbsp;" + numberFormatter (data[i].YoY_Penetration)+ "% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

        } else {
            printDataStr2 += data[i].DistrictName + " &nbsp;&nbsp;&nbsp; <span style='color: green'>&#9650;</span> &nbsp;" +numberFormatter (data[i].YoY_Penetration)+ " % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
    }
    // console.log("print--  "+printDataStr);
    document.getElementById("breakingNews2").innerHTML = printDataStr2;
}


//************************************************************************************** */

function sharedDataDistribCalling() {
    //mahesh
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = createDistFilterData();
    let command={};
	command.displayName = "Table View";
    command.reportDisplayName = "Key_Metrics of "+title;
    command.filterData=filterData

    let shareSales = "Sales Value,"+sharedFormatter(salesDistryShareValues[0].CY_Sales)+","+sharedFormatter(salesDistryShareValues[0].PY_Sales)+","+sharedFormatter(salesDistryShareValues[0].YoY_Sales)+"%";
    let shareSalesPerReat = "Sales Per Retailer,"+sharedFormatter(salesDistryRetaShareValues[0].CY_Sales)+","+sharedFormatter(salesDistryRetaShareValues[0].PY_Sales)+","+sharedFormatter(salesDistryRetaShareValues[0].YoY_Sales)+"%";
    let shareReataiIn = "Retailer Invoice Frequency,"+sharedFormatter(retaiInDistryShareValues[0].CY_Count)+","+sharedFormatter(retaiInDistryShareValues[0].PY_Count)+","+sharedFormatter(retaiInDistryShareValues[0].YoY_Count)+"%";
    let shareReatailer = "#Retailers,"+sharedFormatter(retaiDistryShareValues[0].CY_Count)+","+sharedFormatter(retaiDistryShareValues[0].PY_Count)+","+sharedFormatter(retaiDistryShareValues[0].YoY_Count)+"%";
    let shareSku = "#SKU Sold,"+sharedFormatter(skuDistryShareValues[0].CY_Count)+","+sharedFormatter(skuDistryShareValues[0].PY_Count)+","+sharedFormatter(skuDistryShareValues[0].YoY_Count)+"%";


    let sharedData = "Category,CY,LY,YOY Growth \n"+shareSales+"\n"+shareSalesPerReat+"\n"+shareReataiIn+"\n"+shareReatailer+"\n"+shareSku+"";
    
    shareDataApiObject = {report:report,command:command,title:title,sharedData:sharedData}
    trackCustomEvent('Share Data Pop up Open', {
                    "companyId": companyId.toString(),
                    "userId": userId.toString(),
                    "dashboardId": dashboardId.toString(),
                    "reportName": reportTitle.toString()
        });
    $('#myModal').modal('show');
}   

///********************************************************************************* */