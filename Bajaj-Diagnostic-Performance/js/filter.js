let insightYearData;
//callIndiaFilterOptions();  
function callIndiaFilterOptions() {
    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ filter: "Initial_Filter_Options_V1" }),
        success: (function (data) {
            let filterData = data.data.data;
            insightYearData=filterData;
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            stateMeta = filterData[1][0].StateMeta;
            if (stateMeta != '') {
                stateMeta = stateMeta.toUpperCase();
            }
            idMeta = filterData[2][0].IdMeta;
            //YEAR SELECT
            $("#monthDependantComboId").empty();
            $("#monthFilter").empty();
            $("#yearFilter").empty();
            let yearIndex;
            let yearUniqArr = [];
            let firstYearVal = filterData[0].length > 0 ? filterData[0][filterData[0].length - 1].FiscalYear : "";
            for (let i = 0, yearArr = filterData[0]; i < yearArr.length; i++) {
                let selected = '';
                yearIndex = yearUniqArr.findIndex(obj => obj.FiscalYear == yearArr[i].FiscalYear);
                if (yearIndex == -1) {
                    yearUniqArr.push({ Fiscal_Year_Full: yearArr[i].Fiscal_Year_Full, FiscalYear: yearArr[i].FiscalYear });
                }
                $("#monthDependantComboId").append("<option class='" + yearArr[i].FiscalYear + "' value='" + (yearArr[i].Month_Name).trim() + "'>" + (yearArr[i].Month_Name).trim() + "</option>")
                selected = "";
                var d = new Date();
              //  var n = d.getMonth() - 1;
                if (i == filterData[0].length -2) {
                    selected = "selected";
                }
                if (firstYearVal == yearArr[i].FiscalYear) {
                    $("#monthFilter").append("<option value='" + (yearArr[i].Month_Name).trim() + "' " + selected + ">" + (yearArr[i].Month_Name).trim() + "</option>")
                }
            }
            $('#monthFilter').multiselect({
                allSelectedText: 'All',
                numberDisplayed: 1,
                nonSelectedText: 'All',
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true
            });
            //YEAR SELECT
            for (let i = 0; i < yearUniqArr.length; i++) {
                let selected = '';
               // if (yearUniqArr[i].FiscalYear == "FY20-21") {
                if (i == yearUniqArr.length -1) {
                    selected = "selected";
                }
                $("#yearFilter").append("<option " + selected + " value='" + yearUniqArr[i].FiscalYear + "'>" + yearUniqArr[i].FiscalYear + "</option>")
            }
            pupulatingAllFilter();
        }),
        error: (function (err) {
            console.log(err);
        })
    });
}
let drillYear;
let drillMonth;
let currentPage = '';
let yearMonthDataObj;
function pupulatingAllFilter() {
    if (yearMonthDataObj) {
        yearMonthDataObj.abort();
        yearMonthDataObj = null;
    }
    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    drillMonth = monthDataNum;
    drillYear = yearData;
    let yearMonth = [];
    yearMonth.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    yearMonth.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });

    if (stateMeta != '') {
        yearMonth.push({ dataType: "String", key: 'State', value: stateMeta.toString() });
        storeSelectedFilter(stateMeta.toString(), "stateFilter");
    }
    if (idMeta != '') {
        yearMonth.push({ dataType: "String", key: 'distributorID', value: idMeta.toString() });
        storeSelectedFilter(idMeta.toString(), "distributorFilter");
    }


    yearMonthDataObj = $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Dependency_V1_backup_h5", 'chartDataForms': yearMonth }),
        success: (function (data) {
            let filterData = data.data.data;
            $(".loaderFil").css("display", "none");
            populateFilterCombo(filterData, '');
            yearMonthDataObj = null;
        }),
        error: (function (err) {
            console.log(err);
            yearMonthDataObj = null;
        })
    });
}


//ON Change Filter
$(document).on('change', '#yearFilter', function () {
    let filterName = $(this).val();
    $(this).data('options', $('#monthDependantComboId option').clone());
    var finalArr = $(this).data('options').filter('[class="' + filterName + '"]');
    //let preMon = $("#monthFilter").val();
    let preMon ='';
    if(filterName === "FY21-22"){
        preMon = 'April';
    }else{
     preMon = $("#monthFilter").val();
    }
    $("#monthFilter").empty();


    var html = "";
    let selected = '';
    for (i = 0; i < finalArr.length; i++) {
        jQuery(finalArr[i]).removeAttr("class");
        selected = ''

        if (preMon.includes(finalArr[i].text)) {
            selected = 'selected';
        }

        html += "<option value='" + finalArr[i].value + "' " + selected + ">" + finalArr[i].text + "</option>"
    }
    $("#monthFilter").multiselect('destroy');
    $("#monthFilter").html(html);
    $('#monthFilter').multiselect({
        allSelectedText: 'All',
        numberDisplayed: 1,
        nonSelectedText: 'All',
        includeSelectAllOption: true,
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true
    });
});

let changeFilterReqObj;
let preFilterName = '';
$(document).on("change", ".filter", debounce(function () {

    let filter_Name = this.id;
    let finalCheck = true;
    onloadFunction = false;
    if (finalCheck) {
        changeFilter = false;
        let filterValue = $(this).val();
        if(currentPage === 'channelView'){
        filtterSelectedInChannelView(filterValue, filter_Name);
        }else{
        filtterSelected(filterValue, filter_Name);
        }
        filterAppInsiteCall(filterValue, filter_Name);
    } else {
        dashboardRefresh();
    }
}, global_debounceTime));



let preSelectedFilterArray = [];
function storeSelectedFilter(filterValue, filter_Name) {

    let drillDownSelected = "PartCode RetailerID";
    let filterValLen = filter_Name === "distributorFilter" ? $("#distributorFilter").val().length : 0
    if (drillDownSelected.includes(filter_Name) || (idMeta != '' && filter_Name == 'distributorFilter') || (stateMeta != '' && filter_Name == "stateFilter") || filterValLen === 1) {

    } else {
        var notSelectedfilter = $("#" + filter_Name).find('option').not(':selected');
        let arrayOfUnselectedFilter = notSelectedfilter.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselectedFilter.length == 0) {
            filterValue = "";
        }
    }
    const filterKeyPresent = preSelectedFilterArray.findIndex(obj => obj.filterName == filter_Name);
    if (filterKeyPresent == -1) {
        if (filterValue != '' && filterValue.length != 0) {
            preSelectedFilterArray.push({ filterName: filter_Name, filterValue: filterValue });
        }
    } else {
        if ((idMeta != '' && filter_Name == 'distributorFilter') || (stateMeta != '' && filter_Name == "stateFilter"  && filterValue =='' )) {
        } else {
            if (filterValue == '' || filterValue.length == 0) {
                preSelectedFilterArray.splice(filterKeyPresent, 1);
            } else {
                preSelectedFilterArray[filterKeyPresent].filterValue = filterValue;
            }
        }
    }

    if (currentPage == "retailView" || currentPage == "partView") {
        const districtFilterElement = preSelectedFilterArray.findIndex(obj => obj.filterName == "districtFilter");
        if (districtFilterElement != -1) {
            preSelectedFilterArray.splice(districtFilterElement, 1);
        }
    }


}


function filterRetailerReset() {
    currentPage = "retailView"
    filtterSelected("", "RetailerID");
}
function filterPartCodeReset() {
    currentPage = "partView"
    filtterSelected("", "PartCode");
}

let preSelectedFilterArrayBackup;
let filterArrayChange = true;
function filterPageWiseShowing(pageName) {
    onloadFunction = false;
    currentPage = pageName;    
    if(!filterArrayChange){
      let indexElement = preSelectedFilterArray.findIndex(obj => obj.filterName == "stateFilter");
        let stateValue = indexElement !== -1 ? preSelectedFilterArray[indexElement].filterValue : "";
      preSelectedFilterArray = [...preSelectedFilterArrayBackup];
      if(stateValue !== "" && stateValue.length != 0){
        let indexElement1 = preSelectedFilterArray.findIndex(obj => obj.filterName == "stateFilter");
        if(indexElement1 === -1){
        preSelectedFilterArray.push({ filterName: "stateFilter", filterValue: stateValue });
        }else{
      preSelectedFilterArray[indexElement].filterValue = stateValue;
        }
      }
        filterArrayChange = true;
        preSelectedFilterArrayBackup = [];
    }
    filtterSelected('', '');

}



function filtterSelected(filterValue, filter_Name) {
    storeSelectedFilter(filterValue, filter_Name);

    let yearData = $("#yearFilter").val();
    let monthDataNum = $("#monthFilter").val();
    let drillDownSelected = "PartCode RetailerID"
    let pageName = currentPage;
    if (drillDownSelected.includes(filter_Name) || filter_Name == '') {

    } else {
        if (filterValue == '' || filterValue.length == 0) {
            return;
        }
    }
    let selectedFilter = [];
    selectedFilter.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    selectedFilter.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    let notPresentDistrictFilter = "indiaView, stateView, retailView, partView, perforView";
    for (let i = 0; i < preSelectedFilterArray.length; i++) {
        switch (preSelectedFilterArray[i].filterName) {
            case "stateFilter":
                selectedFilter.push({ dataType: "String", key: 'State', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "territoryFilter":
                if (pageName != "indiaView")
                    selectedFilter.push({ dataType: "String", key: 'Territory', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "distributorFilter":
                if (idMeta != '')
                    selectedFilter.push({ dataType: "String", key: 'distributorID', value: idMeta.toString() });
                else if (pageName != "indiaView")
                    selectedFilter.push({ dataType: "String", key: 'distributorID', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "districtFilter":
                if (!notPresentDistrictFilter.includes(pageName))
                    selectedFilter.push({ dataType: "String", key: 'District', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "classifictionFilter":
                selectedFilter.push({ dataType: "String", key: 'classification', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "partCategoryFilter":
                selectedFilter.push({ dataType: "String", key: 'PartCategory', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "segmentFilter":
                if (pageName == "retailView")
                    selectedFilter.push({ dataType: "String", key: 'RetailerSegment', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "retailernameFilter":
                selectedFilter.push({ dataType: "String", key: 'ContactCode', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "PartCode":
                if (pageName == "partDrillView")
                selectedFilter.push({ dataType: "String", key: 'PartCode', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "RetailerID":
                if (pageName == "retailerDrillView")
                selectedFilter.push({ dataType: "String", key: 'RetailerID', value: preSelectedFilterArray[i].filterValue.toString() });
                break;

        }



    }

    $("#RetailerviewtableId").jqGrid('GridUnload');
    $("#partviewtableId").jqGrid('GridUnload');
    $("#partviewtableId1").jqGrid('GridUnload');

    $("#channelviewYTMtableId,#channelviewtableId,#channelViewTableForSixMontId,#channelViewTableForNineMontId").jqGrid('GridUnload');


    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Dependency_V1_backup_h5", 'chartDataForms': selectedFilter }),
        success: (function (data) {
            let filterData = data.data.data;
            populateFilterCombo(filterData, filter_Name);

        }),
        error: (function (err) {
            console.log(err);
        })
    });

}

$(document).on('click', '#fa-fa-eraser', function () {
    stateFilterChanged = false
    territoryFilterChanged = false
    distriFilterChanged = false
    uncheckFilter1 = true
    terryFilAppend = true;
    terryFilterUpdate = true;
    preSelectedFilterArray = [];
    pupulatingAllFilter();
    $(".loaderFil").css("display", "block");
    changeFilter = true;
});



function populateFilterCombo(filterData, filterName) {

    //Part Category Select
    if (filterName != "partCategoryFilter" && filterData[3] != undefined) {
        let categoryIndex;
        let CategoryUniqArr = [];
        $("#partCategoryFilter").empty();
        const getCategoryIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "partCategoryFilter");
        let getCategoryFilterValue = getCategoryIndex != -1 ? preSelectedFilterArray[getCategoryIndex].filterValue : '';
        for (let i = 0, categoryArr = filterData[3]; i < categoryArr.length; i++) {
            categoryIndex = CategoryUniqArr.findIndex(obj => obj.PartCategory == categoryArr[i].PartCategory);
            if (categoryIndex == -1) {
                let selected = '';
                if (getCategoryIndex == -1 && getCategoryFilterValue == '') {
                    selected = 'selected';
                } else if (getCategoryFilterValue.includes(categoryArr[i].PartCategory)) {
                    selected = 'selected';
                }
                CategoryUniqArr.push({ PartCategory: categoryArr[i].PartCategory });
                $("#partCategoryFilter").append("<option value='" + categoryArr[i].PartCategory + "' " + selected + " >" + categoryArr[i].PartCategory + "</option>");
            }
        }
        $("#partCategoryFilter").multiselect('destroy');
        $('#partCategoryFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }

    //classifictionFilter Select
    if (filterName != "classifictionFilter" && filterData[6] != undefined) {
        let classificationIndex;
        let ClassificationUniqArr = [];
        $("#classifictionFilter").empty();
        const getclassifictionIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "classifictionFilter");
        let getClassifictionFilterValue = getclassifictionIndex != -1 ? preSelectedFilterArray[getclassifictionIndex].filterValue : '';
        $("#classifictionFilter").append("<option value='' class='specialCss' selected > Select All </option>");
                  
        for (let i = 0, ClassifiUniqArr = filterData[6]; i < ClassifiUniqArr.length; i++) {
            classificationIndex = ClassificationUniqArr.findIndex(obj => obj.classification == ClassifiUniqArr[i].classification);
            if (classificationIndex == -1) {
                let selected = '';
                if (getclassifictionIndex == -1 && getClassifictionFilterValue == '') {
                    selected = 'selected';
                } else if (getClassifictionFilterValue.includes(ClassifiUniqArr[i].classification)) {
                    selected = 'selected';
                }
                ClassificationUniqArr.push({ classification: ClassifiUniqArr[i].classification });
                $("#classifictionFilter").append("<option value='" + ClassifiUniqArr[i].classification + "' " + selected + " >" + ClassifiUniqArr[i].classification + "</option>");
            }

        }

        $("#classifictionFilter").multiselect('destroy');
        $('#classifictionFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: false,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });

    }

    //Distributor select
    if (filterName != "distributorFilter" && filterData[1] != undefined) {
        let distributorIndex;
        let distributorUniqArr = [];
        for (let i = 0, temp = filterData[1]; i < temp.length; i++) {
            distributorIndex = distributorUniqArr.findIndex(obj => obj.Distributor == temp[i].Distributor);
            if (distributorIndex == -1 && temp[i].DistributorID != 0) {
                distributorUniqArr.push({ Distributor: temp[i].Distributor, Distri_Code: temp[i].DistributorID });
            }
        }
        $("#distributorFilter").empty();
        const getDistributorIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "distributorFilter");
        let getDistributorFilterValue = getDistributorIndex != -1 ? preSelectedFilterArray[getDistributorIndex].filterValue : '';
       
      
        for (let i = 0; i < distributorUniqArr.length; i++) {
            let selected = '';
            if (getDistributorIndex == -1 && getDistributorFilterValue == '') {
                selected = 'selected';
            } else if (getDistributorFilterValue.includes(distributorUniqArr[i].Distri_Code)) {
                selected = 'selected';
            }
            if(distributorUniqArr.length == 1 && getDistributorIndex === -1)
            $("#distributorFilter").append("<option value='' class='specialCss' selected > Select All </option>");
           else if(distributorUniqArr.length == 1 )
           $("#distributorFilter").append("<option value='' class='specialCss'  > Select All </option>");
          if(drillDownBack){
            if(distributorUniqArr[i].Distri_Code == preSelecetedOfDistry[1]){
                selected = 'selected';
            }else{
                selected='';
            }
        }

            $("#distributorFilter").append("<option value='" + distributorUniqArr[i].Distri_Code + "' " + selected + " >" + distributorUniqArr[i].Distributor + "</option>");
          
        }
        
        $("#distributorFilter").multiselect('destroy');
        
        $('#distributorFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            includeSelectAllOption: distributorUniqArr.length > 1 ? true : false,
            enableCaseInsensitiveFiltering: true   
           
           
        });
        
    }

    //state
    if (filterName != "stateFilter" && filterData[0] != undefined) {
        $("#stateFilter").empty();
        const getStateIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "stateFilter");
        let getStateFilterValue = getStateIndex != -1 ? preSelectedFilterArray[getStateIndex].filterValue : '';
        for (let i = 0, temp = filterData[0]; i < temp.length; i++) {
            let selected = '';
            if (getStateIndex == -1 && getStateFilterValue == '') {
                selected = 'selected';
            } else if (getStateFilterValue.includes(temp[i].State)) {
                selected = 'selected';
            }

            if(drillDownBack){
                if(temp[i].State == preSelecetedOfState[0]){
                    selected = 'selected';
                }else{
                    selected='';
                }
            }

            $("#stateFilter").append("<option value='" + temp[i].State + "' " + selected + " >" + temp[i].State + "</option>");
        }
        $("#stateFilter").multiselect('destroy');
        $('#stateFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }

    //Territory
    if (filterName != "territoryFilter" && filterData[2] != undefined) {
        $("#territoryFilter").empty();
        const getTerritoryIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "territoryFilter");
        let getTerriFilterValue = getTerritoryIndex != -1 ? preSelectedFilterArray[getTerritoryIndex].filterValue : '';
        for (let i = 0, territoryArr = filterData[2]; i < territoryArr.length; i++) {
            let selected = '';
            if (getTerritoryIndex == -1 && getTerriFilterValue == '') {
                selected = 'selected';
            } else if (getTerriFilterValue.includes(territoryArr[i].Distributor_Territory)) {
                selected = 'selected';
            }
            if(drillDownBack){
                if(territoryArr[i].Distributor_Territory == preSelecetedOfTerry[0]){
                    selected = 'selected';
                }else{
                    selected='';
                }
            }
            $("#territoryFilter").append("<option value='" + territoryArr[i].Distributor_Territory + "' " + selected + " >" + territoryArr[i].Distributor_Territory + "</option>");
        }
        $("#territoryFilter").multiselect('destroy');
        $('#territoryFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }

    //Retailer_Segment
    if (filterName != "segmentFilter" && filterData[4] != undefined) {
        let segmentIndex;
        let SegmentUniqArr = [];
        $("#segmentFilter").empty();

        const getRetailerSegIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "segmentFilter");
        let getRetailerSegFilterValue = getRetailerSegIndex != -1 ? preSelectedFilterArray[getRetailerSegIndex].filterValue : '';
        for (let i = 0, segmentArr = filterData[4]; i < segmentArr.length; i++) {
            segmentIndex = SegmentUniqArr.findIndex(obj => obj.Retailer_Segment == segmentArr[i].Retailer_Segment);
            if (segmentIndex == -1) {
                let selected = '';
                if (getRetailerSegIndex == -1 && getRetailerSegFilterValue == '') {
                    selected = 'selected';
                } else if (getRetailerSegFilterValue.includes(segmentArr[i].Retailer_Segment)) {
                    selected = 'selected';
                }
                SegmentUniqArr.push({ Retailer_Segment: segmentArr[i].Retailer_Segment });
                $("#segmentFilter").append("<option value='" + segmentArr[i].Retailer_Segment + "' " + selected + " >" + segmentArr[i].Retailer_Segment + "</option>");
            }
        }

        $("#segmentFilter").multiselect('destroy');
        $('#segmentFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }
    //District_Name
    if (filterName != "districtFilter" && filterData[5] != undefined) {
        $("#districtFilter").empty();
        const getDistrictIndex = preSelectedFilterArray.findIndex(obj => obj.filterName == "districtFilter");
        let getDistrictFilterValue = getDistrictIndex != -1 ? preSelectedFilterArray[getDistrictIndex].filterValue : '';
        for (let i = 0, districtArr = filterData[5]; i < districtArr.length; i++) {
            let selected = '';
            if (getDistrictIndex == -1 && getDistrictFilterValue == '') {
                selected = 'selected';
            } else if (getDistrictFilterValue.includes(districtArr[i].DistrictName)) {
                selected = 'selected';
            }
            $("#districtFilter").append("<option value='" + districtArr[i].DistrictName + "' " + selected + " >" + districtArr[i].DistrictName + "</option>");
        }
        $("#districtFilter").multiselect('destroy');
        $('#districtFilter').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
        drillDownBack=false;
    }
    


    if (callIndOrAnyView) {
        if (onloadFunction) {
            indiaViewChartLoad();
        } else {
            dashboardRefresh();
        }
    } else {
        callIndOrAnyView = true;
    }

}

//challen view 
function filterChannelViewPage(pageName) {
    onloadFunction = false;
    currentPage = pageName;
    // to copy of array
    if(filterArrayChange){
    preSelectedFilterArrayBackup = [...preSelectedFilterArray]; 
    filterArrayChange = false;
    }
    filtterSelectedInChannelView('', '');

}
function filtterSelectedInChannelView(filterValue, filter_Name) {
    storeSelectedFilter(filterValue, filter_Name);

    let pageName = currentPage;
       let selectedFilter = [];
   
    for (let i = 0; i < preSelectedFilterArray.length; i++) {
        switch (preSelectedFilterArray[i].filterName) {
            case "stateFilter":
                selectedFilter.push({ dataType: "String", key: 'State', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "territoryFilter":
                if (pageName != "indiaView")
                    selectedFilter.push({ dataType: "String", key: 'Territory', value: preSelectedFilterArray[i].filterValue.toString() });
                break;
            case "distributorFilter":
                if (idMeta != '')
                    selectedFilter.push({ dataType: "String", key: 'distributorID', value: idMeta.toString() });
                else if (pageName != "indiaView")
                    selectedFilter.push({ dataType: "String", key: 'distributorID', value: preSelectedFilterArray[i].filterValue.toString() });
                break;         
        }
    }

    $("#RetailerviewtableId").jqGrid('GridUnload');
    $("#partviewtableId").jqGrid('GridUnload');
    $("#partviewtableId1").jqGrid('GridUnload');
    $("#channelviewYTMtableId,#channelviewtableId,#channelViewTableForSixMontId,#channelViewTableForNineMontId").jqGrid('GridUnload');

    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Channel_View_V2", 'chartDataForms': selectedFilter }),
        success: (function (data) {
            let filterData = data.data.data;
            populateFilterCombo(filterData, filter_Name);

        }),
        error: (function (err) {
            console.log(err);
        })
    });
}

//to check given key is present in 'preSelectedFilterArray' filterselection 
//array and return true or false
function keyPersentInFilterSelection(filterName){
    for(let i = 0; i<preSelectedFilterArray.length; i++ ){
        if(preSelectedFilterArray[i].filterName === filterName){
            return true;
        }
    }    
    return false;
}