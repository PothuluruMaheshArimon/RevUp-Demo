
let fromCountYTM;
let toCountYTM;
let fromCountChannel;
let toCountChannel;

let fromCountSixMon;
let toCountSixMon;
let fromCountNineMon;
let toCountNineMon;
let currentRetailerName;

/************************************            *************************************************** */
/************************************    start   *************************************************** */
/************************************            *************************************************** */

/******   YTM MTD month   table view     */

// function channelViewYtmTableCreateApi() {
//     $("#channelLoaderYTM").show();
//     fromCountYTM = 1;
//     toCountYTM = 50;
//     channelViewytmTableWithPagination(fromCountYTM, toCountYTM);
// }
// let channelDataYTMObj;
// function channelViewytmTableWithPagination(fromCountYTM, toCountYTM) {
//     // $("#prePagerChannel").hide();
//     //  $("#nextPagerChannel").hide();
//     if (channelDataYTMObj) {
//         channelDataYTMObj.abort();
//         channelDataYTMObj = null;
//     }

//     let channelFilterData = createChannelFilterData();
//     channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromCountYTM.toString() });
//     channelFilterData.push({ dataType: "String", key: 'toCount', value: toCountYTM.toString() });

//     channelDataYTMObj = $.ajax({
//         url: getApiDomain(),
//         type: 'POST',
//         data: JSON.stringify({ 'filter': "Retailer_View_Retailer_Summary", 'chartDataForms': channelFilterData }),
//         success: (function (resultData) {
//             let channeltableytmData = resultData.data.data[0];
//             channelDataYTMObj = null;
//            // channelViewTableCreateApi();
//              $("#channelviewYTMtableId").jqGrid('GridUnload');
//              $("#channelviewYTMtableId").empty();
//              if (channeltableytmData.length <= 0) {
//                $("#channelviewYTMtableId").append("<div class='noData' style='margin-top: 2%; font-size: 20px; margin-left: 38%;'>No Data</div>");
//                $("#channelLoaderYTM").hide();    
//                return;
//             }

//             channelViewYtmTableCreate(channeltableytmData);
//             $("#channelLoaderYTM").hide();

//         }),
//         error: (function (err) {
//             channelDataYTMObj = null;
//             console.log(err);
//         })
//     });
// }

function channelViewYtmTableCreate(channeltableytmData) {
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#channelviewYTMtableId").jqGrid({
        data: channeltableytmData,
        datatype: "local",
       rowNum: 3,
       autowidth: false,
        shrinkToFit: false,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",


        colNames: ["Year"," ","Potential(&#x20B9)",
            "Sales Target",
            "Sales Actual(&#x20B9)",
            "% Achievement",
            "% Penetration"
        ],


        colModel: [
            { name: 'FiscalYear', index: 'FiscalYear', sortable: true },
            { name: 'Month', index: 'Month', sortable: true },
            { name: 'Potential', index: 'Potential', formatter: getnumFormatterRupe,sorttype:'int',sortable: true},
            { name: 'Sales_Target', index: 'Sales_Target', formatter: getnumFormatterRupe,   sortable: true },
            { name: 'Sales_Actual', index: 'Sales_Actual', formatter: getnumFormatterRupe,sorttype:'int',sortable: true},    
            { name: 'Per_Achievement', index: 'Per_Achievement', sortable: true },
            { name: 'Penetration', index: 'Penetration', sortable: true }

        ],

        // onSelectRow: function (rowId) {
        //     let rowData = $('#channelviewYTMtableId').jqGrid('getRowData', rowId);
        //     retailerPart(rowData.FiscalYear);
        // },
       

    });
    jQuery("#channelviewYTMtableId").jqGrid('navGrid', '#channelLoaderYTM', { edit: false, add: false, del: false, refresh: true });

}


/************************************            *************************************************** */
/************************************    start   *************************************************** */
/************************************            *************************************************** */

/******   three month   table view     */

function channelViewTableCreateApi() {
    $("#channelLoader").show();
    fromCountChannel = 1;
    toCountChannel = 50;
    channelViewTableWithPagination(fromCountChannel, toCountChannel);
}
let channelDataThreeMonObj;
function channelViewTableWithPagination(fromCountChannel, toCountChannel) {
    $("#prePagerChannel").hide();
    $("#nextPagerChannel").hide();
    if (channelDataThreeMonObj) {
        channelDataThreeMonObj.abort();
        channelDataThreeMonObj = null;
    }
    
    let channelFilterData = createChannelFilterData();
    let retailerSegment = "Core,Whales";
    channelFilterData.push({ dataType: "String", key: 'retailersegment', value: retailerSegment.toString() });
    channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromCountChannel.toString() });
    channelFilterData.push({ dataType: "String", key: 'toCount', value: toCountChannel.toString() });
    let procedureName = "Retailer_View_RFM_Page";
    channelDataThreeMonObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: channelFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(channelFilterData)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Retailer_View_RFM_Page", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let channeltableData = resultData.data.data[0];
            channelDataThreeMonObj = null;
           // channelViewSixMonTableCreateApi();  
            $("#channelviewtableId").jqGrid('GridUnload');
            $("#channelviewtableId").empty();
            if (channeltableData.length <= 0) {
                $("#channelviewtableId").append("<div class='noData' style='margin-top: 5%; font-size: 20px; height: 22%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerChannel").show();
                $("#prePagerChannel").show();
                if (fromCountChannel > 0) {
                    $("#nextPagerChannel").attr('disabled', true);
                    $("#prePagerChannel").attr('disabled', false);
                } else {
                    $("#nextPagerChannel").attr('disabled', false);
                    $("#prePagerChannel").attr('disabled', true);
                }
                $("#channelLoader").hide();
                return;
            }

            channelViewTableCreate(channeltableData);
            $("#prePagerChannel").show();
            $("#channelLoader").hide();

        }),
        error: (function (err) {
            channelDataThreeMonObj = null;
            console.log(err);
        })
    });
}
let retailerOpporIn;
function channelViewTableCreate(channeltableData) {
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#channelviewtableId").jqGrid({
        data: channeltableData,
        datatype: "local",
        maxHeight: 100,
        minWidth: 1240,
        width: 1240,
        maxWidth: 1240,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",


        colNames: ["Contact Code","Retailer Name","Retailer ID", "District", "Current Month Sales",
            "Last 6 Months Avg","Sales Opportunity",
            "Highest Monthy Sales",
            "Day Since Last Order","Retailer Segment","Attrition_Flag"
        ],


        colModel: [
            { name: 'Contactcode', index: 'Contactcode',hidden:true, sortable: true },
            { name: 'ContactName', index: 'ContactName', sortable: true },
            { name: 'Contactcode', index: 'Contactcode', sortable: true },
            { name: 'Town', index: 'Town', sortable: true },
            { name: 'Current_Month_Purchase', index: 'Current_Month_Purchase', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'integer',  sortable: true },
            { name: 'Last_Month_Purchase', index: 'Last_Month_Purchase', formatter: getnumFormatterRupe,sortable: true },    
            { name: 'Sales_Highest', index: 'Sales_Highest', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'days_since_last_order', index: 'days_since_last_order', sortable: true },
            { name: 'RetailerSegment', index: 'RetailerSegment', sortable: true },
            { name: 'Attrition_Flag', index: 'Attrition_Flag',hidden:true, sortable: true }
        ],

        onSelectRow: function (rowId) {
            let rowData = $('#channelviewtableId').jqGrid('getRowData', rowId);
            currentRetailerName = rowData.ContactName;
            retailerId = rowData.Contactcode;
            retailerOpporIn = rowData.Last_Month_Purchase;
          //  $('#navigateModal').modal('show');
        //   channelRecomendedDrilldown();
          channelDrilldown();
        },
        loadComplete: function () {
            if (fromCountChannel <= 1) {
                $("#prePagerChannel").attr('disabled', true);
            } else {
                $("#prePagerChannel").attr('disabled', false);
            }
            $("#nextPagerChannel").show();
            $("#nextPagerChannel").attr('disabled', false);
            $("#channelLoader").hide();
        },
        rowattr: function (rd) {

            if (rd.Attrition_Flag == '2') // your condition here
            {
                return { "class": "bg-danger" };
            }
            else if(rd.Attrition_Flag == '1'){
                return { "class": "bg-danger1" };
            }

        }

    });
    jQuery("#channelviewtableId").jqGrid('navGrid', '#channelLoader', { edit: false, add: false, del: false, refresh: true });
   // $('#channelviewtableId').jqGrid('hideCol',["Contactcode"]);
}

function prePageChannelData() {
    if (fromCountChannel > 0) {
        $("#channelLoader").show();
        $("#channelviewtableId").jqGrid('GridUnload');
        $("#channelviewtableId").empty();
        fromCountChannel = fromCountChannel - 50;
        toCountChannel = toCountChannel - 50;
        channelViewTableWithPagination(fromCountChannel, toCountChannel);
    }
};

function nextPageChannelData() {
    $("#channelviewtableId").jqGrid('GridUnload');
    $("#channelviewtableId").empty();
    $("#channelLoader").show();
    fromCountChannel = fromCountChannel + 50;
    toCountChannel = toCountChannel + 50;
    channelViewTableWithPagination(fromCountChannel, toCountChannel);

};

/************************************            *************************************************** */
/************************************    start   *************************************************** */
/************************************            *************************************************** */


/******   six month   table view     */
function channelViewSixMonTableCreateApi() {
    $("#channelLoaderSixMon").show();
    fromCountSixMon = 1;
    toCountSixMon = 50;
    channelViewSixMonTableWithPagination(fromCountSixMon, toCountSixMon);
}
let channelDataSixMonObj;
function channelViewSixMonTableWithPagination(fromCountSixMon, toCountSixMon) {
    $("#prePagerChannelSixMon").hide();
    $("#nextPagerChannelSixMon").hide();
    if (channelDataSixMonObj) {
        channelDataSixMonObj.abort();
        channelDataSixMonObj = null;
    }

    let channelFilterData = createChannelFilterData();
    let retailerSegment = "Loyal";
    channelFilterData.push({ dataType: "String", key: 'retailersegment', value: retailerSegment.toString() });
    channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromCountSixMon.toString() });
    channelFilterData.push({ dataType: "String", key: 'toCount', value: toCountSixMon.toString() });
    let procedureName = "Retailer_View_RFM_Page";
    channelDataSixMonObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: channelFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(channelFilterData)),'dashboardId' : dashboardId }),
      //  data: JSON.stringify({ 'filter': "Retailer_View_RFM_Page", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let channeltableSixMonData = resultData.data.data[0];
            channelDataSixMonObj = null;
           // channelViewNineMonTableCreateApi();
            $("#channelViewTableForSixMontId").jqGrid('GridUnload');
            $("#channelViewTableForSixMontId").empty();
            if (channeltableSixMonData.length <= 0) {
                $("#channelViewTableForSixMontId").append("<div class='noData' style='margin-top: 5%; font-size: 20px; height: 22%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerChannelSixMon").show();
                $("#prePagerChannelSixMon").show();
                if (fromCountSixMon > 0) {
                    $("#nextPagerChannelSixMon").attr('disabled', true);
                    $("#prePagerChannelSixMon").attr('disabled', false);
                } else {
                    $("#nextPagerChannelSixMon").attr('disabled', false);
                    $("#prePagerChannelSixMon").attr('disabled', true);
                }
                $("#channelLoaderSixMon").hide();
                return;
            }

            channelViewSixMonTableCreate(channeltableSixMonData);
            $("#prePagerChannelSixMon").show();
            $("#channelLoaderSixMon").hide();

        }),
        error: (function (err) {
            channelDataSixMonObj = null;
            console.log(err);
        })
    });
}

function channelViewSixMonTableCreate(channeltableSixMonData) {
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#channelViewTableForSixMontId").jqGrid({
        data: channeltableSixMonData,
        datatype: "local",
        maxHeight: 100,
        minWidth: 1240,
        width: 1240,
        maxWidth: 1240,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
        colNames: ["Contact Code","Retailer Name","Retailer ID", "District", "Current Month Sales",
            "Last 6 Months Avg","Sales Opportunity",
            "Highest Monthy Sales",
            "Day Since Last Order","Retailer Segment","Attrition_Flag"
        ],
        colModel: [
            { name: 'Contactcode', index: 'Contactcode',hidden:true, sortable: true },
            { name: 'ContactName', index: 'ContactName', sortable: true },
            { name: 'Contactcode', index: 'Contactcode', sortable: true },
            { name: 'Town', index: 'Town', sortable: true },
            { name: 'Current_Month_Purchase', index: 'Current_Month_Purchase', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Last_Month_Purchase', index: 'Last_Month_Purchase',formatter: getnumFormatterRupe, sortable: true },    
            { name: 'Sales_Highest', index: 'Sales_Highest', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'days_since_last_order', index: 'days_since_last_order', sortable: true },
            { name: 'RetailerSegment', index: 'RetailerSegment', sortable: true },
            { name: 'Attrition_Flag', index: 'Attrition_Flag',hidden:true, sortable: true }

        ],

        onSelectRow: function (rowId) {
            let rowData = $('#channelViewTableForSixMontId').jqGrid('getRowData', rowId);
        //    // channelDrilldown(rowData.Contactcode);
        //    currentRetailerName = rowData.ContactName;
        //    channelRecomendedDrilldown(rowData.Contactcode);
                currentRetailerName = rowData.ContactName;
                retailerId = rowData.Contactcode;
                retailerOpporIn = rowData.Last_Month_Purchase;
              //  $('#navigateModal').modal('show');
              channelDrilldown();
        },
        loadComplete: function () {
            if (fromCountSixMon <= 1) {
                $("#prePagerChannelSixMon").attr('disabled', true);
            } else {
                $("#prePagerChannelSixMon").attr('disabled', false);
            }
            $("#nextPagerChannelSixMon").show();
            $("#nextPagerChannelSixMon").attr('disabled', false);
            $("#channelLoaderSixMon").hide();
        },
        rowattr: function (rd) {

            if (rd.Attrition_Flag == '2') // your condition here
            {
                return { "class": "bg-danger" };
            }
            else if(rd.Attrition_Flag == '1'){
                return { "class": "bg-danger1" };
            }

        }

    });
    jQuery("#channelViewTableForSixMontId").jqGrid('navGrid', '#channelLoaderSixMon', { edit: false, add: false, del: false, refresh: true });
 //   $('#channelViewTableForSixMontId').jqGrid('hideCol',["Contactcode"]);
}

function prePageChannelSixMonData() {
    if (fromCountSixMon > 0) {
        $("#channelLoaderSixMon").show();
        $("#channelViewTableForSixMontId").jqGrid('GridUnload');
        $("#channelViewTableForSixMontId").empty();
        fromCountSixMon = fromCountSixMon - 50;
        toCountSixMon = toCountSixMon - 50;
        channelViewSixMonTableWithPagination(fromCountSixMon, toCountSixMon);
    }
};

function nextPageChannelSixMonData() {
    $("#channelViewTableForSixMontId").jqGrid('GridUnload');
    $("#channelViewTableForSixMontId").empty();
    $("#channelLoaderSixMon").show();
    fromCountSixMon = fromCountSixMon + 50;
    toCountSixMon = toCountSixMon + 50;
    channelViewSixMonTableWithPagination(fromCountSixMon, toCountSixMon);

};

/************************************            *************************************************** */
/************************************   Nine start   *************************************************** */
/************************************            *************************************************** */


/******   nine month   table view     */
function channelViewNineMonTableCreateApi() {
    $("#channelLoaderNineMon").show();
    fromCountNineMon = 1;
    toCountNineMon = 50;
    channelViewNineMonTableWithPagination(fromCountNineMon, toCountNineMon);
}
let channelDataNineMonObj;
function channelViewNineMonTableWithPagination(fromCountNineMon, toCountNineMon) {
    $("#prePagerChannelNineMon").hide();
    $("#nextPagerChannelNineMon").hide();
    // $("#prePagerChannel").hide();
    // $("#nextPagerChannel").hide();
    if (channelDataNineMonObj) {
        channelDataNineMonObj.abort();
        channelDataNineMonObj = null;
    }

    let channelFilterData = createChannelFilterData();
    let retailerSegment = "New,Promising,Slipping";
    channelFilterData.push({ dataType: "String", key: 'retailersegment', value: retailerSegment.toString() });
    channelFilterData.push({ dataType: "String", key: 'fromCount', value: fromCountNineMon.toString() });
    channelFilterData.push({ dataType: "String", key: 'toCount', value: toCountNineMon.toString() });
    let procedureName = "Retailer_View_RFM_Page";
    channelDataNineMonObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: channelFilterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(channelFilterData)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "Retailer_View_RFM_Page", 'chartDataForms': channelFilterData }),
        success: (function (resultData) {
            let channelNineMontableData = resultData.data.data[0];
            channelDataNineMonObj = null;
            $("#channelViewTableForNineMontId").jqGrid('GridUnload');
            $("#channelViewTableForNineMontId").empty();
            if (channelNineMontableData.length <= 0) {
                $("#channelViewTableForNineMontId").append("<div class='noData' style='margin-top: 5%; font-size: 20px; height: 22%; margin-left: 38%;'>No Data</div>");
                $("#nextPagerChannelNineMon").show();
                $("#prePagerChannelNineMon").show();
                if (fromCountNineMon > 0) {
                    $("#nextPagerChannelNineMon").attr('disabled', true);
                    $("#prePagerChannelNineMon").attr('disabled', false);
                } else {
                    $("#nextPagerChannelNineMon").attr('disabled', false);
                    $("#prePagerChannelNineMon").attr('disabled', true);
                }
                $("#channelLoaderNineMon").hide();
                return;
            }

            channelViewNineMonTableCreate(channelNineMontableData);
            $("#prePagerChannelNineMon").show();
            $("#channelLoaderNineMon").hide();

        }),
        error: (function (err) {
            channelDataNineMonObj = null;
            console.log(err);
        })
    });
}

function channelViewNineMonTableCreate(channelNineMontableData) {
    $("#hide").click(function () {
        $("#container").show()
        $('#container1').hide()
    });

    jQuery("#channelViewTableForNineMontId").jqGrid({
        data: channelNineMontableData,
        datatype: "local",
        maxHeight: 100,
        minWidth: 1240,
        width: 1240,
        maxWidth: 1240,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",


        colNames: ["Contact Code","Retailer Name","Retailer ID", "District", "Current Month Sales",
        "Last 6 Months Avg","Sales Opportunity",
        "Highest Monthy Sales",
        "Day Since Last Order","Retailer Segment","Attrition_Flag"
    ],


        colModel: [
            { name: 'Contactcode', index: 'Contactcode',hidden:true, sortable: true },
            { name: 'ContactName', index: 'ContactName', sortable: true },
            { name: 'Contactcode', index: 'Contactcode', sortable: true },
            { name: 'Town', index: 'Town', sortable: true },
            { name: 'Current_Month_Purchase', index: 'Current_Month_Purchase', formatter: getnumFormatterRupe,  sorttype:'integer', sortable: true },
            { name: 'Last_6_month_Average', index: 'Last_6_month_Average', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Last_Month_Purchase', index: 'Last_Month_Purchase',formatter: getnumFormatterRupe, sortable: true },    
            { name: 'Sales_Highest', index: 'Sales_Highest', formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'days_since_last_order', index: 'days_since_last_order', sortable: true },
            { name: 'RetailerSegment', index: 'RetailerSegment', sortable: true },
            { name: 'Attrition_Flag', index: 'Attrition_Flag',hidden:true, sortable: true }
        ],

        onSelectRow: function (rowId) {
            let rowData = $('#channelViewTableForNineMontId').jqGrid('getRowData', rowId);
        //  //   channelDrilldown(rowData.Contactcode);
        //  currentRetailerName = rowData.ContactName;
        //  channelRecomendedDrilldown(rowData.Contactcode);
                currentRetailerName = rowData.ContactName;
                retailerId = rowData.Contactcode;
                retailerOpporIn = rowData.Last_Month_Purchase;
                channelDrilldown();
              //  $('#navigateModal').modal('show');
        },
        loadComplete: function () {
            if (fromCountNineMon <= 1) {
                $("#prePagerChannelNineMon").attr('disabled', true);
            } else {
                $("#prePagerChannelNineMon").attr('disabled', false);
            }
            $("#nextPagerChannelNineMon").show();
            $("#nextPagerChannelNineMon").attr('disabled', false);
            $("#channelLoaderNineMon").hide();
        },
        rowattr: function (rd) {

            if (rd.Attrition_Flag == '2') // your condition here
            {
                return { "class": "bg-danger" };
            }
            else if(rd.Attrition_Flag == '1'){
                return { "class": "bg-danger1" };
            }

        }

    });
    jQuery("#channelViewTableForNineMontId").jqGrid('navGrid', '#channelLoaderNineMon', { edit: false, add: false, del: false, refresh: true });
    // $('#channelViewTableForNineMontId').jqGrid('hideCol',["Contactcode"]);
}

function prePageChannelNineMonData() {
    if (fromCountNineMon > 0) {
        $("#channelLoaderNineMon").show();
        $("#channelViewTableForNineMontId").jqGrid('GridUnload');
        $("#channelViewTableForNineMontId").empty();
        fromCountNineMon = fromCountNineMon - 50;
        toCountNineMon = toCountNineMon - 50;
        channelViewNineMonTableWithPagination(fromCountNineMon, toCountNineMon);
    }
};

function nextPageChannelNineMonData() {
    $("#channelViewTableForNineMontId").jqGrid('GridUnload');
    $("#channelViewTableForNineMontId").empty();
    $("#channelLoaderNineMon").show();
    fromCountNineMon = fromCountNineMon + 50;
    toCountNineMon = toCountNineMon + 50;
    channelViewNineMonTableWithPagination(fromCountNineMon, toCountNineMon);

};



/**for filter set function to  */
function createChannelFilterData() {
    allRetailerFilterData = [];
    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    let stateData = $("#stateFilter").val();
    drillYear = yearData;
    drillMonth = monthDataNum;
    let territoryData = $("#territoryFilter").val();
    var notSelected1 = $("#territoryFilter").find('option').not(':selected');
    var arrayOfUnselectedTerry = notSelected1.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselectedTerry.length == 0) {
        territoryData = "";
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
    allRetailerFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'Territory', value: territoryData.toString() });
    allRetailerFilterData.push({ dataType: "String", key: 'DistributorID', value: distributorData.toString() });
    
    return allRetailerFilterData;
}


//############################ Regular Retailers  csv download   ########################################################
  
let regretailerCodeSharedData=[];
function regularPageShareDataDownload(){  
       const regretCodeFilterData = createChannelFilterData();
    regretailerCodeSharedData.push(["Retailername", "Town", "Current Month Purchase (&#x20B9)", "Avg. Last 6 months sale(&#x20B9)",
    "Last Month Purchase (&#x20B9)",
    "Highest Sales in a month (&#x20B9)",
    "Last Transaction Value (&#x20B9)",
    "Days since last transaction"]);
    getFetchAllregularCodeBaseOnFilter(regretCodeFilterData);      
}

function getFetchAllregularCodeBaseOnFilter(regularCodeFilteData){  
     const regretCodeFilterData = getFilterData(regularCodeFilteData);
   getFetchregularCodeDataInBatch(regretCodeFilterData);      
}

function getFetchregularCodeDataInBatch(regretCodeFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Regular_Buyers_Page", 'chartDataForms': regretCodeFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const regretailerCodeSharedDataconvArray = [];
        regretailerCodeSharedDataconvArray.push(originalData[i].ContactName);
        regretailerCodeSharedDataconvArray.push((originalData[i].Town));
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].Current_Month_Purchase).toFixed(2));
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Month_Purchase).toFixed(2));
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].Sales_Highest).toFixed(2));
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Transaction_Value).toFixed(2));
        regretailerCodeSharedDataconvArray.push(parseFloat(originalData[i].days_since_last_order).toFixed(2));
        regretailerCodeSharedData.push(regretailerCodeSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
               getFetchAllregularCodeBaseOnFilter(regretCodeFilterData);
             }else{              
               exportToCsv('RegularRetailer.csv',regretailerCodeSharedData);
               regretailerCodeSharedData = [];
               $('#downloadCsvLoader,#regularCodebanDownload').hide();
               $('#regulCodeshowDownload').show();
               $("#regulCodeCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           regretailerCodeSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#regulCodeCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}

//############################ Frequent Buyers  csv download   ########################################################
  
let frequentbuyCodeSharedData=[];
function frequentPageShareDataDownload(){  
       const frebuyCodeFilterData = createChannelFilterData();
       frequentbuyCodeSharedData.push(["Retailername", "Town", "Current Month Purchase (&#x20B9)", "Avg. Last 6 months sale(&#x20B9)",
       "Last Month Purchase (&#x20B9)",
       "Highest Sales in a month (&#x20B9)",
       "Last Transaction Value (&#x20B9)",
       "Days since last transaction"]);
    getFetchAllfrequentCodeBaseOnFilter(frebuyCodeFilterData);      
}

function getFetchAllfrequentCodeBaseOnFilter(frequentCodeFilteData){  
     const frebuyCodeFilterData = getFilterData(frequentCodeFilteData);
   getFetchfrequentCodeDataInBatch(frebuyCodeFilterData);      
}

function getFetchfrequentCodeDataInBatch(frebuyCodeFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Frequent_Buyers_Page", 'chartDataForms': frebuyCodeFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const frequentbuyCodeSharedDataconvArray = [];
       frequentbuyCodeSharedDataconvArray.push(originalData[i].ContactName);
       frequentbuyCodeSharedDataconvArray.push((originalData[i].Town));
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].Current_Month_Purchase).toFixed(2));
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Month_Purchase).toFixed(2));
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].Sales_Highest).toFixed(2));
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Transaction_Value).toFixed(2));
       frequentbuyCodeSharedDataconvArray.push(parseFloat(originalData[i].days_since_last_order).toFixed(2));
       frequentbuyCodeSharedData.push(frequentbuyCodeSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
            getFetchAllfrequentCodeBaseOnFilter(frebuyCodeFilterData);
             }else{              
               exportToCsv('FrequentBuyers.csv',frequentbuyCodeSharedData);
               frequentbuyCodeSharedData = [];
               $('#downloadCsvLoader,#frequentCodebanDownload').hide();
               $('#frequentCodeshowDownload').show();
               $("#freqCodeCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           frequentbuyCodeSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#freqCodeCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}

//############################ Dormant Retailers  csv download   ########################################################
  
let dormantretCodeSharedData=[];
function dormantPageShareDataDownload(){  
       const dorretCodeFilterData = createChannelFilterData();
       dormantretCodeSharedData.push(["Retailername", "Town", "Current Month Purchase (&#x20B9)", "Avg. Last 6 months sale(&#x20B9)",
       "Last Month Purchase (&#x20B9)",
       "Highest Sales in a month (&#x20B9)",
       "Last Transaction Value (&#x20B9)",
       "Days since last transaction"]);
    getFetchAlldormantCodeBaseOnFilter(dorretCodeFilterData);      
}

function getFetchAlldormantCodeBaseOnFilter(dormantCodeFilteData){  
     const dorretCodeFilterData = getFilterData(dormantCodeFilteData);
   getFetchdormantCodeDataInBatch(dorretCodeFilterData);      
}

function getFetchdormantCodeDataInBatch(dorretCodeFilterData){    
    $.ajax({
       url: getApiDomain(),
       type: 'POST',
       async : true,
       data: JSON.stringify({ 'filter': "Retailer_View_Dormant_Buyers_Page", 'chartDataForms': dorretCodeFilterData }),
       success: (function (resultData) {      
           let originalData = resultData.data.data[0];    
          
      for (let i = 0; i < originalData.length; i++) {
       const dormantretCodeSharedDataconvArray = [];
       dormantretCodeSharedDataconvArray.push(originalData[i].ContactName);
       dormantretCodeSharedDataconvArray.push((originalData[i].Town));
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].Current_Month_Purchase).toFixed(2));
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_6_month_Average)).toFixed(2);
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Month_Purchase).toFixed(2));
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].Sales_Highest).toFixed(2));
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].Last_Transaction_Value).toFixed(2));
       dormantretCodeSharedDataconvArray.push(parseFloat(originalData[i].days_since_last_order).toFixed(2));
       dormantretCodeSharedData.push(dormantretCodeSharedDataconvArray);         
           }              
            
           if(originalData.length >= 500 ){
            getFetchAlldormantCodeBaseOnFilter(dorretCodeFilterData);
             }else{              
               exportToCsv('DormantRetailers.csv',dormantretCodeSharedData);
               dormantretCodeSharedData = [];
               $('#downloadCsvLoader,#dormantCodebanDownload').hide();
               $('#dormantCodeshowDownload').show();
               $("#dormCodeCsvDownload").removeAttr("disabled");
               methodQueueRerun();
             }   
         
       }),
       error: (function (err) {
            console.log(err);
           originalData =  null;
           dormantretCodeSharedData = [];
           $('#downloadCsvLoader').hide();
           $("#dormCodeCsvDownload").removeAttr("disabled");
           methodQueueRerun();
       })
   });

}


//------------- Key Metricess Start---------------------//
//Retailer View Retailer Count
var retCvcountReqObj;
function retCvcountDataFromApi() {
    if (retCvcountReqObj) {
        retCvcountReqObj.abort();
        retCVcountReqObj = null;
    }
    $("#chanNoOfRetai").css('display', 'block');
    let retCvfilterdatacount = createChannelFilterData();
    retCvcountReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Retailer_Count_V2", 'chartDataForms': retCvfilterdatacount }),
        success: (function (resultData) {
            let retCvcountData = resultData.data.data[0];
            $("#retCvNumId td").remove();
            $("#retCvNumId td").empty();
            $("#chanNoOfRetai").css('display', 'none');
            $("#retCvNumId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retCvcountData.length != 0) {
                $("#retCvNumId").append("<td class='metricsValue'>" + numberFormatter(retCvcountData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retCvNumId").append("<td class='metricsValue'>" + numberFormatter(retCvcountData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retCvNumId").append("<td class=" + addClassColor(retCvcountData[0].YoY_Count) + ">" + numberAvgFormatter(retCvcountData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retCvNumId").append("<td class='metricsValue'> 0 </td>");
            }
            retCvSkuDataFromApi();
            retCvcountReqObj = null;
            retCvcountData = null;
        }),
        error: (function (err) {
            retCvcountReqObj = null;
            console.log(err);
        })
    });
}

//Retailer View Avg sale
var retCvavgsaleReqObj;
function retCvAvgsaleDataFromApi() {
    if (retCvavgsaleReqObj) {
        retCvavgsaleReqObj.abort();
        retCvavgsaleReqObj = null;
    }
    $("#chanAvgSixMonth").css('display', 'block');
    let retCvfilterdatasale = createChannelFilterData();
    retCvavgsaleReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Average_Sales_V2", 'chartDataForms': retCvfilterdatasale }),
        success: (function (resultData) {
            let retCvsaleData = resultData.data.data[0];
            $("#retCvAvg6Id td").remove();
            $("#retCvAvg6Id td").empty();
            $("#chanAvgSixMonth").css('display', 'none');
            $("#retCvAvg6Id").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retCvsaleData.length != 0) {
                $("#retCvAvg6Id").append("<td class='metricsValue'>" + numberFormatter(retCvsaleData[0].CY_Sales, prefixSymbol = '') + " </td>");
                $("#retCvAvg6Id").append("<td class='metricsValue'>" + numberFormatter(retCvsaleData[0].PY_Sales, prefixSymbol = '') + " </td>");
                $("#retCvAvg6Id").append("<td class=" + addClassColor(retCvsaleData[0].YoY_Sales) + ">" + numberAvgFormatter(retCvsaleData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#retCvAvg6Id").append("<td class='metricsValue'> 0 </td>");
            }
            // retInvoFreqDataFromApi();
            retCvavgsaleReqObj = null;
            retCvsaleData = null;
        }),
        error: (function (err) {
            retCvavgsaleReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View SKU Sold
var retCvavgskuReqObj;
function retCvSkuDataFromApi() {
    if (retCvavgskuReqObj) {
        retCvavgskuReqObj.abort();
        retCvavgskuReqObj = null;
    }
    $("#chanSKU").css('display', 'block');
    let retCvfilterdatasku = createChannelFilterData();
    retCvavgskuReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_SKU_Count_V2", 'chartDataForms': retCvfilterdatasku }),
        success: (function (resultData) {
            let retCvskuData = resultData.data.data[0];
            $("#retCvSkuId td").remove();
            $("#retCvSkuId td").empty();
            $("#chanSKU").css('display', 'none');
            $("#retCvSkuId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retCvskuData.length != 0) {
                $("#retCvSkuId").append("<td class='metricsValue'>" + valueFormater(retCvskuData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retCvSkuId").append("<td class='metricsValue'>" + valueFormater(retCvskuData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retCvSkuId").append("<td class=" + addClassColor(retCvskuData[0].YoY_Count) + ">" + valueFormater(retCvskuData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retCvSkuId").append("<td class='metricsValue'> 0 </td>");
            }
            retCvPerFreqDataFromApi();
            retCvavgskuReqObj = null;
            retCvskuData = null;
        }),
        error: (function (err) {
            retCvavgskuReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View Retailer Invoice freq
var retCvavgInvoReqObj;
function retCvInvoFreqDataFromApi() {
    if (retCvavgInvoReqObj) {
        retCvavgInvoReqObj.abort();
        retCvavgInvoReqObj = null;
    }
    $("#chanInv").css('display', 'block');
    let retCvfilterdatafeq = createChannelFilterData();
    retCvavgInvoReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Key_Metrics_Retailer_Invoice_Frequency_V2", 'chartDataForms': retCvfilterdatafeq }),
        success: (function (resultData) {
            let retCvfeqData = resultData.data.data[0];
            $("#retCvInvoId td").remove();
            $("#retCvInvoId td").empty();
            $("#chanInv").css('display', 'none');
            $("#retCvInvoId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retCvfeqData.length != 0) {
                $("#retCvInvoId").append("<td class='metricsValue'>" + valueFormater(retCvfeqData[0].CY_Count, prefixSymbol = '') + " </td>");
                $("#retCvInvoId").append("<td class='metricsValue'>" + valueFormater(retCvfeqData[0].PY_Count, prefixSymbol = '') + " </td>");
                $("#retCvInvoId").append("<td class=" + addClassColor(retCvfeqData[0].YoY_Count) + ">" + valueFormater(retCvfeqData[0].YoY_Count, prefixSymbol = '') + "%</td>");
            } else {
                $("#retCvInvoId").append("<td class='metricsValue'> 0 </td>");
            }
            retCvavgInvoReqObj = null;
            retCvfeqData = null;
        }),
        error: (function (err) {
            retCvavgInvoReqObj = null;
            console.log(err);
        })
    });
}
//Retailer View Percentage Contribution
var retCvavgPerReqObj;
function retCvPerFreqDataFromApi() {
    if (retCvavgPerReqObj) {
        retCvavgPerReqObj.abort();
        retCvavgPerReqObj = null;
    }
    $("#chanContri").css('display', 'block');
    let retCvfilterdataper = createChannelFilterData();
    retCvavgPerReqObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ 'filter': "Retailer_View_Key_Percentage_Contrib_V2", 'chartDataForms': retCvfilterdataper }),
        success: (function (resultData) {
            let retCvperData = resultData.data.data[0];
            $("#retCvcontriId td").remove();
            $("#retCvcontriId td").empty();
            $("#chanContri").css('display', 'none');
            $("#retCvcontriId").append("<tr><td>CY</td><td>PY</td><td>YOY Growth</td></tr>");
            if (retCvperData.length != 0) {
                $("#retCvcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(retCvperData[0].CY_Percent, prefixSymbol = '') + " %</td>");
                $("#retCvcontriId").append("<td class='metricsValue'>" + numberAvgFormatter(retCvperData[0].PY_Percent, prefixSymbol = '') + " %</td>");
                $("#retCvcontriId").append("<td class=" + addClassColor(retCvperData[0].YoY_Sales) + ">" + numberAvgFormatter(retCvperData[0].YoY_Sales, prefixSymbol = '') + "%</td>");
            } else {
                $("#retCvcontriId").append("<td class='metricsValue'> 0 </td>");
            }
            retCvavgPerReqObj = null;
            retCvperData = null;
        }),
        error: (function (err) {
            retCvavgPerReqObj = null;
            console.log(err);
        })
    });
}



