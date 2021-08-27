
 function ClickObservtionCommentTORedirectToPage(pageId){
        let currenntView = $('.reportTitle').text()
        if (currenntView == 'All India View') {
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#retailerDiv").show();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $('#territoryDiv').hide();
        $('#distributerDiv').hide();
        $('#retailerDiv').hide();

        $("#indiaContent").show();
        $("#stateContent").hide();
        $("#distriContent").hide();
        $("#retailContent").hide();
        $("#retdrillContent").hide();
        $("#pertContent").hide();
        $("#partdrillContent").hide();
        $("#perforContent").hide();

        $("#keyMetricsLoader").css('display', 'block');
        showHideLoader("indPotvsSaleContain", true);
        showHideLoader("indBranPotenContain", true);
        $("#RetailerviewtableId").jqGrid('GridUnload');
        filterPageWiseShowing(pageId);
      
    } else  if (currenntView == 'State View') {     
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#retailerDiv").hide();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();
        $("#indiaContent").hide();
        $("#stateContent").show();
        $("#distriContent").hide();
        $("#retailContent").hide();
        $("#retdrillContent").hide();
        $("#pertContent").hide();
        $("#partdrillContent").hide();
        $("#perforContent").hide();

        $("#keyMetricsLoaderState").css('display', 'block');
        showHideLoader("satPotvsSaleContain", true);
        showHideLoader("satcatPotenContainId", true);
        $(".loader").css('margin-top', '7vw');
        showHideLoader("satRetperform", true);
        showHideLoader("satMapContain", true);
        $(".loader").css('margin-top', '7vw');
        $("#RetailerviewtableId").jqGrid('GridUnload');
        filterPageWiseShowing(pageId);
    } else if (currenntView == 'Distributor View') {
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#retailerDiv").hide();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();

        $("#indiaContent").hide();
        $("#stateContent").hide();
        $("#distriContent").show();
        $("#retailContent").hide();
        $("#retdrillContent").hide();
        $("#pertContent").hide();
        $("#partdrillContent").hide();
        $("#perforContent").hide();
        $("#RetailerviewtableId").jqGrid('GridUnload');
        $("#keyMetricsLoaderDistri").css('display', 'block');
        showHideLoader("districtPerfChartContainerId", true);
        showHideLoader("partcategoryChartContainerId", true);

        showHideLoader("RetailerPerfChartContainerId", true);
        $(".loader").css('margin-top', '5vw');
        showHideLoader("RetailerPerformanceContainerId", true);
        $(".loader").css('margin-top', '2vw');
        showHideLoader("breadthPerfChartContainerId", true);
        $(".loader").css('margin-top', '2vw');
        filterPageWiseShowing(pageId);
    }else if (currenntView == 'Retailer View') {
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $("#retailerDiv").show();
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();

        $("#indiaContent").hide();
        $("#stateContent").hide();
        $("#distriContent").hide();
        $("#retailContent").show();
        $("#retdrillContent").hide();
        $("#pertContent").hide();
        $("#partdrillContent").hide();
        $("#perforContent").hide();
        $("#RetailerviewtableId").jqGrid('GridUnload');
        $("#partviewtableId1").jqGrid('GridUnload');
        $("#partviewtableId").jqGrid('GridUnload');
        $("#keyMetricsLoaderRetai").css('display', 'block');
        $("#pager7").show();
        filterPageWiseShowing(pageId);
    }else if (currenntView == 'Part View') {
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $("#retailerDiv").hide();
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();

        $("#indiaContent").hide();
        $("#stateContent").hide();
        $("#distriContent").hide();
        $("#retailContent").hide();
        $("#retdrillContent").hide();
        $("#pertContent").show();
        $("#partdrillContent").hide();
        $("#perforContent").hide();

        $("#keyMetricsLoaderPart").css('display', 'block');
        $("#RetailerviewtableId").jqGrid('GridUnload');
        $("#partviewtableId1").jqGrid('GridUnload');
        $("#partviewtableId").jqGrid('GridUnload');
        filterPageWiseShowing(pageId);
    }else if (currenntView == 'Performance View') {
        $('#retailernameDiv').hide();
        $('#districtDiv').hide();
        $("#retailerDiv").hide();
        $("#territoryDiv").show();
        $("#distributerDiv").show();
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#partCategoryDiv").show();
        $("#stateDiv").show();

        $("#indiaContent").hide();
        $("#stateContent").hide();
        $("#distriContent").hide();
        $("#retailContent").hide();
        $("#retdrillContent").hide();
        $("#pertContent").hide();
        $("#partdrillContent").hide();
        $("#perforContent").show();

        $("#keyMetricsLoaderPer").css('display', 'block');
        showHideLoader("perfChartcontainer", true)
        $(".loader").css('margin-left', '34vw');
        filterPageWiseShowing(pageId);

    }else if ( currenntView == 'Recommended Retailers for Selected Part') {
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

    $("#partviewtableId1").jqGrid('GridUnload');
    filterPageWiseShowing(pageId);
           
    }
    else if (currenntView == 'Recommended Parts for Retailer') {
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
    filterPageWiseShowing(pageId);
}
    }


    function setFiltersForData(filterData,viewName) {
        if (!filterData) {
            return;
        }
        let filterDatakeys = Object.keys(filterData);
        let filterName;
        let valArr;
        let currentEle;
      preSelectedFilterArray = [];
        for (let i = 0; i < filterDatakeys.length; i++) {
            filterName = filterDatakeys[i];
            valArr = filterData[filterDatakeys[i]].split(",");
            currentEle = $('.filter[id="' + filterName + '"]');
            if (!currentEle) {
                break;
            }
           
            if (currentEle.prop('multiple')) {
                currentEle.multiselect('destroy');
                currentEle.val(valArr);
                currentEle.multiselect({
                    allSelectedText: 'All',
                    numberDisplayed: 1,
                    nonSelectedText: 'All',
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true
                });
    
            } else {
                currentEle.val(valArr);
            }
// if(filterName == "Month" || filterName == "Year"){
//     currentEle.trigger('change');
// }

            preSelectedFilterArray.push({ filterName: filterName, filterValue: valArr });
            if(i == filterDatakeys.length -1){
                
                $('.reportTitle').text(viewName);
                let pageId = getPageIdBaseOnViewName(viewName);
              ClickObservtionCommentTORedirectToPage(pageId);
            
            }
            if(filterName == "PartCode" && valArr != "")
            partCodeFullScope1 = valArr;
            if(filterName == "RetailerID" && valArr != "")
            partCodeFullScope = valArr;
           
        }              
    
    }        
    function getPageIdBaseOnViewName(viewName) {
        let pageId = '';
        switch (viewName) {
            case "All India View":
                pageId = "indiaView";
                break;
            case "State View":
                pageId = "stateView";
                break;
            case "Distributor View":
                pageId = "disrtiView";
                break;
            case "Retailer View":
                pageId = "retailView";
                break;
            case "Part View":
                pageId = "partView";
                break;
            case "Performance View":
                pageId = "perforView";
                break;
            case "Recommended Parts for Retailer":
                pageId = "retailerDrillView";
                break;
            case "Recommended Retailers for Selected Part":
                pageId = "partDrillView";
                break;
    
        }
    
        return pageId;
    }
    
    var global_initialFilterData;
function resetAllFilters() {
    setFiltersForData(global_initialFilterData);

}

function getAllFiltersData() {
    let filterDataObj = {};
    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    filterDataObj['yearFilter'] =  yearData.toString();
    filterDataObj['monthFilter'] =  monthDataNum.toString();
for(let i=0; i < preSelectedFilterArray.length; i++){
    filterDataObj[preSelectedFilterArray[i].filterName] = (preSelectedFilterArray[i].filterValue).toString();
} 
filterDataObj["stateMeta"] = stateMeta.toString();
filterDataObj["idMeta"] = idMeta.toString();
return filterDataObj;

}

function filterReportEvent(event){
    let filter = event.target.attributes.data["value"];
    let filterValueArray = JSON.parse(filter);
    let pageViewName = event.target.attributes.about["value"];
    setFiltersForData(filterValueArray,pageViewName);
}

function createCommentDataCalling() {
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let tableName = ($(".tableName").text()).trim();
    let filterData = getAllFiltersData();
    let command = {};
    command.displayName =  "Key Metrics";
    command.reportDisplayName =  "Key Metrics";
    command.filterData = filterData
    commentDataApiObject = { report: report, command: command, title: title }

    trackCustomEvent('Comment Submitted', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": title.toString()
    });
    $('#commentModal').modal('show');
}

function createCommentTableDataCalling() {
    let report = "Diagnostic & Performance";
    let title = $(".reportTitle").text();
    let filterData = getAllFiltersData();
    let command = {};
    command.displayName =   "Table View";
    command.reportDisplayName = "Table View";
    command.filterData = filterData
    commentDataApiObject = { report: report, command: command, title: title }

    trackCustomEvent('Comment Submitted', {
        "companyId": companyId.toString(),
        "userId": userId.toString(),
        "dashboardId": dashboardId.toString(),
        "reportName": title.toString()
    });
    $('#commentModal').modal('show');
}