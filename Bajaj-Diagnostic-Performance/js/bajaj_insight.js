
let onloadIS = false;
let top50Distri =[];
  function showHideLoaderIn(containerId, display) {
      if (display) {
          $("#" + containerId).empty();
          $("#" + containerId).append("<div class='loader' style='margin-top: 0px;'></div>");
      } else {
          $("#" + containerId).find('div[class="loader"]').remove();
      }
  }


  $(document).on('click', '#filterInCha', function () {
    preSelectedFilterArrayIn = [];
    callBajajInsightFiltersOptions();
    $(".loaderFilIn").css("display", "block");
});

  //--------Sales -----------------//
let distrinDataObj;
  function callBajajInsightFiltersOptions() {
    if (distrinDataObj) {
        distrinDataObj.abort();
        distrinDataObj = null;
    }
    let yearData = "FY19-20";
    let monthDataNum = "March";
    let yearMonth = [];
    let procedureName;
    preSelectedFilterArrayIn = [];
    let title = $("#reportTitleId").text();
    if(title == "Low Market Share"){
      procedureName  = "Market_Share_Details_DistributorList";
    }else if(title == "Market Share Decline"){
        procedureName  = "Market_Share_Decline_DistributorList";
    }else if(title == "Retailer Concentration"){
        procedureName  = "Retailer_Concentration_DistributorList";
    }else {
        procedureName  = "Repeatability_Of_Sales_FistributorList";
    }
    yearMonth.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    yearMonth.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    yearMonth.push({ dataType: "String", key: 'State', value: "MADHYA PRADESH" });
    yearMonth.push({ dataType: "String", key: 'uid', value: Math.floor(Math.random()*(999-100+1)+100).toString() });
    distrinDataObj = $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': procedureName, 'chartDataForms': yearMonth }),
        success: (function (data) {
            let filterData = data.data.data[0];
            distrinDataObj = null;
            top50Distri =[];
            let distributersList =''
            for(let i=0; i<filterData.length;i++){
                top50Distri.push(filterData[i].DistributorID);
                distributersList=distributersList+filterData[i].DistributorID+',';
            }
            pupulatingAllFilterIn();
        }),
        error: (function (err) {
            console.log(err);
            distrinDataObj = null;
        })
    });
         
}

let yearMonthInDataObj;
function pupulatingAllFilterIn() {
    if (yearMonthInDataObj) {
        yearMonthInDataObj.abort();
        yearMonthInDataObj = null;
    }
    let yearData = "FY19-20";
    let monthDataNum = "March";
    let yearMonth = [];
    yearMonth.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    yearMonth.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    yearMonth.push({ dataType: "String", key: 'State', value: "MADHYA PRADESH" });
   // yearMonth.push({ dataType: "String", key: 'distributorId', value: filterData.toString() });
    if (stateMeta != '') {
        yearMonth.push({ dataType: "String", key: 'State', value: stateMeta.toString() });
        storeSelectedFilter(stateMeta.toString(), "stateFilterIn");
    }
    if (idMeta != '') {
        yearMonth.push({ dataType: "String", key: 'distributorID', value: idMeta.toString() });
        storeSelectedFilter(idMeta.toString(), "distributorFilterIn");
    }


    yearMonthInDataObj = $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Dependency_V1_backup_h5", 'chartDataForms': yearMonth }),
        success: (function (data) {
            let filterData = data.data.data;
            $(".loaderFilIn").css("display", "none");
            $("#stateFilterIn").empty();
            $("#stateFilterIn").append("<option value='GUJARAT' >GUJARAT</option>");
            $("#stateFilterIn").append("<option value='MADHYA PRADESH' selected >MADHYA PRADESH</option>");
            $("#stateFilterIn").append("<option value='PUNJAB' >PUNJAB</option>");
            $("#stateFilterIn").append("<option value='TAMIL NADU' >TAMIL NADU</option>");
            $("#stateFilterIn").append("<option value='WEST BENGAL'>WEST BENGAL</option>");
            //   
            populateFilterInCombo(filterData);
            yearMonthInDataObj = null;
        }),
        error: (function (err) {
            console.log(err);
            yearMonthInDataObj = null;
        })
    });
}



function populateFilterInCombo(filterData, filterName) {

    //Part Category Select
    if (filterName != "partCategoryFilterIn" && filterData[3] != undefined) {
        let categoryIndex;
        let CategoryUniqArr = [];
        $("#partCategoryFilterIn").empty();
        const getCategoryIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "partCategoryFilterIn");
        let getCategoryFilterValue = getCategoryIndex != -1 ? preSelectedFilterArrayIn[getCategoryIndex].filterValue : '';
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
                $("#partCategoryFilterIn").append("<option value='" + categoryArr[i].PartCategory + "' " + selected + " >" + categoryArr[i].PartCategory + "</option>");
            }
        }
        $("#partCategoryFilterIn").multiselect('destroy');
        $('#partCategoryFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }

    //classifictionFilter Select
    if (filterName != "classifictionFilterIn" && filterData[6] != undefined) {
        let classificationIndex;
        let ClassificationUniqArr = [];
        $("#classifictionFilterIn").empty();
        const getclassifictionIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "classifictionFilterIn");
        let getClassifictionFilterValue = getclassifictionIndex != -1 ? preSelectedFilterArrayIn[getclassifictionIndex].filterValue : '';
        $("#classifictionFilterIn").append("<option value='' class='specialCss' > Select All </option>");
                  
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
                $("#classifictionFilterIn").append("<option value='" + ClassifiUniqArr[i].classification + "' " + selected + " >" + ClassifiUniqArr[i].classification + "</option>");
            }

        }

        $("#classifictionFilterIn").multiselect('destroy');
        $('#classifictionFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: false,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });

    }

    //Distributor select
    if (filterName != "distributorFilterIn" && filterData[1] != undefined) {
        let distributorIndex;
        let distributorUniqArr = [];
        for (let i = 0, temp = filterData[1]; i < temp.length; i++) {
            distributorIndex = distributorUniqArr.findIndex(obj => obj.Distributor == temp[i].Distributor);
            if (distributorIndex == -1 && temp[i].DistributorID != 0) {
                distributorUniqArr.push({ Distributor: temp[i].Distributor, Distri_Code: temp[i].DistributorID });
            }
        }
        $("#distributorFilterIn").empty();
        const getDistributorIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "distributorFilterIn");
        let getDistributorFilterValue = getDistributorIndex != -1 ? preSelectedFilterArrayIn[getDistributorIndex].filterValue : '';
       
      
        for (let i = 0; i < distributorUniqArr.length; i++) {
            let selected = '';
            if (getDistributorIndex == -1 && getDistributorFilterValue == '') {
                selected = 'selected';
            } else if (getDistributorFilterValue.includes(distributorUniqArr[i].Distri_Code)) {
                selected = 'selected';
            }
            if(distributorUniqArr.length == 1 && getDistributorIndex === -1)
            $("#distributorFilterIn").append("<option value='' class='specialCss'  > Select All </option>");
           else if(distributorUniqArr.length == 1 )
           $("#distributorFilterIn").append("<option value='' class='specialCss'  > Select All </option>");
          if(drillDownBack){
            if(distributorUniqArr[i].Distri_Code == preSelecetedOfDistry[1]){
                selected = 'selected';
            }else{
                selected='';
            }
        }
            if(top50Distri.includes(distributorUniqArr[i].Distri_Code))//mahesh
            $("#distributorFilterIn").append("<option value='" + distributorUniqArr[i].Distri_Code + "' " + selected + " >" + distributorUniqArr[i].Distributor + "</option>");
          
        }
        
        $("#distributorFilterIn").multiselect('destroy');
        
        $('#distributorFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            includeSelectAllOption: distributorUniqArr.length > 1 ? true : false,
            enableCaseInsensitiveFiltering: true   
           
           
        });
        
    }

    //Territory
    if (filterName != "territoryFilterIn" && filterData[2] != undefined) {
        $("#territoryFilterIn").empty();
        const getTerritoryIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "territoryFilterIn");
        let getTerriFilterValue = getTerritoryIndex != -1 ? preSelectedFilterArrayIn[getTerritoryIndex].filterValue : '';
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
            $("#territoryFilterIn").append("<option value='" + territoryArr[i].Distributor_Territory + "' " + selected + " >" + territoryArr[i].Distributor_Territory + "</option>");
        }
        $("#territoryFilterIn").multiselect('destroy');
        $('#territoryFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }

    //Retailer_Segment
    if (filterName != "segmentFilterIn" && filterData[4] != undefined) {
        let segmentIndex;
        let SegmentUniqArr = [];
        $("#segmentFilterIn").empty();

        const getRetailerSegIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "segmentFilterIn");
        let getRetailerSegFilterValue = getRetailerSegIndex != -1 ? preSelectedFilterArrayIn[getRetailerSegIndex].filterValue : '';
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
                $("#segmentFilterIn").append("<option value='" + segmentArr[i].Retailer_Segment + "' " + selected + " >" + segmentArr[i].Retailer_Segment + "</option>");
            }
        }

        $("#segmentFilterIn").multiselect('destroy');
        $('#segmentFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }
    //District_Name
    if (filterName != "districtFilterIn" && filterData[5] != undefined) {
        $("#districtFilterIn").empty();
        const getDistrictIndex = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "districtFilterIn");
        let getDistrictFilterValue = getDistrictIndex != -1 ? preSelectedFilterArrayIn[getDistrictIndex].filterValue : '';
        for (let i = 0, districtArr = filterData[5]; i < districtArr.length; i++) {
            let selected = '';
            if (getDistrictIndex == -1 && getDistrictFilterValue == '') {
                selected = 'selected';
            } else if (getDistrictFilterValue.includes(districtArr[i].DistrictName)) {
                selected = 'selected';
            }
            $("#districtFilterIn").append("<option value='" + districtArr[i].DistrictName + "' " + selected + " >" + districtArr[i].DistrictName + "</option>");
        }
        $("#districtFilterIn").multiselect('destroy');
        $('#districtFilterIn').multiselect({
            allSelectedText: 'All',
            numberDisplayed: 1,
            nonSelectedText: 'All',
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true
        });
    }
    if(onloadIS){
        let titleCurr = $("#reportTitleId").text();
        if(titleCurr == "Retailer Concentration"){
            showHideLoaderIn("retailerConcLoader", true);
            showHideLoaderIn("correRetailerLoader", true);
            showHideLoaderIn("retailerConce", true);
            showHideLoaderIn("retailerperc", true);
            $("#retailerConc,#correRetailer").jqGrid('GridUnload');
            $("#retailerConc,#correRetailer").empty();
            retailerConcentWiseRetailersApi();
        }else if(titleCurr == "Repeatability of Sales"){
            showHideLoaderIn("repeatableSales", true);
            showHideLoaderIn("repeatabilitySalesLoader", true);
            $("#repeatabilitySales").jqGrid('GridUnload');
            $("#repeatabilitySales").empty();
            repeatableSalesTableChartApi();
        }else if(titleCurr == "Market Share Decline"){
            showHideLoaderIn("markerShareItabledLoader", true);
            showHideLoaderIn("markerShareId", true);
            startValue=0;
            endValue=100;
            firstLoad=true;
            marketShareDeclineChartApi(startValue,endValue);
        }else if(titleCurr == "Low Market Share"){
            showHideLoaderIn("lowShareItabledLoader", true);
            showHideLoaderIn("lowShareId", true);
            fromValue=0;
            toValue=100;
            oneTimeCall=true;
            lowMarketShareTableChartApi(fromValue,toValue);
        }
    }

}
function createInsightFilterData() {
    allIndiaFilterData = [];
    let yearData = "FY19-20";
    let monthDataNum = "March";
    let stateData = $("#stateFilterIn").val();
    let distriData = $("#distributorFilterIn").val();
    var notSelected = $("#distributorFilterIn").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        distriData = "";
    }

    let districtData = $("#districtFilterIn").val();
    var notSelected3 = $("#districtFilterIn").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        districtData = "";
    }
    allIndiaFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
     allIndiaFilterData.push({ dataType: "String", key: 'distributorId', value: distriData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'District', value: districtData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'uid', value: Math.floor(Math.random()*(999-100+1)+100).toString() });
    return allIndiaFilterData;
}
function createInsightFilterDataIN(filter_Name) {
    allIndiaFilterData = [];
    let yearData = "FY19-20";
    let monthDataNum = "March";
    let stateData = $("#stateFilterIn").val();
    let distriData = $("#distributorFilterIn").val();
    var notSelected = $("#distributorFilterIn").find('option').not(':selected');
    var arrayOfUnselected = notSelected.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        distriData = "";
    }

    let districtData = $("#districtFilterIn").val();
    var notSelected3 = $("#districtFilterIn").find('option').not(':selected');
    var arrayOfUnselected = notSelected3.map(function () {
        return this.value;
    }).get();
    if (arrayOfUnselected.length == 0) {
        districtData = "";
    }
    allIndiaFilterData.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'State', value: stateData.toString() });
     //allIndiaFilterData.push({ dataType: "String", key: 'distributorId', value: distriData.toString() });
     if(filter_Name != "stateFilterIn")
    allIndiaFilterData.push({ dataType: "String", key: 'District', value: districtData.toString() });
    allIndiaFilterData.push({ dataType: "String", key: 'uid', value: Math.floor(Math.random()*(999-100+1)+100).toString() });
    return allIndiaFilterData;
}

$(document).on("change", ".filterIn", debounce(function () {
    let filter_Name = this.id;
    let filterValue = $(this).val();

    let titleCurr = $("#reportTitleId").text();
    if(titleCurr == "Retailer Concentration"){
        showHideLoaderIn("retailerConcLoader", true);
        showHideLoaderIn("correRetailerLoader", true);
        showHideLoaderIn("retailerConce", true);
        showHideLoaderIn("retailerperc", true);
        $("#retailerConc,#correRetailer").jqGrid('GridUnload');
        $("#retailerConc,#correRetailer").empty();
    }else if(titleCurr == "Repeatability of Sales"){
        showHideLoaderIn("repeatableSales", true);
        showHideLoaderIn("repeatabilitySalesLoader", true);
        $("#repeatabilitySales").jqGrid('GridUnload');
        $("#repeatabilitySales").empty();
    }else if(titleCurr == "Market Share Decline"){
        showHideLoaderIn("markerShareItabledLoader", true);
        showHideLoaderIn("markerShareId", true);
        $("#markerShareItabled").jqGrid('GridUnload');
        $("#markerShareItabled").empty();
    }else if(titleCurr == "Low Market Share"){
        showHideLoaderIn("lowShareItabledLoader", true);
        showHideLoaderIn("lowShareId", true);
        $("#lowShareItabled").jqGrid('GridUnload');
        $("#lowShareItabled").empty();
    }
    filtterSelectedIn(filterValue, filter_Name);
},global_debounceTime));

let preSelectedFilterArrayIn = [];
function storeSelectedFilterIn(filterValue, filter_Name) {

    let drillDownSelected = "PartCode RetailerID";
    let filterValLen = filter_Name === "distributorFilterIn" ? $("#distributorFilterIn").val().length : 0
    if (drillDownSelected.includes(filter_Name) || (idMeta != '' && filter_Name == 'distributorFilterIn') || (stateMeta != '' && filter_Name == "stateFilter") || filterValLen === 1) {

    } else {
        var notSelectedfilter = $("#" + filter_Name).find('option').not(':selected');
        let arrayOfUnselectedFilter = notSelectedfilter.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselectedFilter.length == 0) {
            filterValue = "";
        }
    }
    const filterKeyPresent = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == filter_Name);
    if (filterKeyPresent == -1) {
        if (filterValue != '' && filterValue.length != 0) {
            preSelectedFilterArrayIn.push({ filterName: filter_Name, filterValue: filterValue });
        }
    } else {
        if ((idMeta != '' && filter_Name == 'distributorFilterIn') || (stateMeta != '' && filter_Name == "stateFilterIn"  && filterValue =='' )) {
        } else {
            if (filterValue == '' || filterValue.length == 0) {
                preSelectedFilterArrayIn.splice(filterKeyPresent, 1);
            } else {
                preSelectedFilterArrayIn[filterKeyPresent].filterValue = filterValue;
            }
        }
    }

    if (currentPage == "retailView" || currentPage == "partView") {
        const districtFilterElement = preSelectedFilterArrayIn.findIndex(obj => obj.filterName == "districtFilter");
        if (districtFilterElement != -1) {
            preSelectedFilterArrayIn.splice(districtFilterElement, 1);
        }
    }


}
function filtterSelectedIn(filterValue, filter_Name){
    storeSelectedFilterIn(filterValue, filter_Name);

    let yearData = "FY19-20";
    let monthDataNum = "March";
    let selectedFilter = [];
    let distriButer;
    if(filter_Name != "distributorFilterIn"){
        if (distriButer) {
            distriButer.abort();
            distriButer = null;
        }
        let yearData = "FY19-20";
        let monthDataNum = "March";
        let yearMonth = [];
        let procedureName;
        let districtName;
        let partClass;
        yearMonth = createInsightFilterDataIN(filter_Name);
      //  preSelectedFilterArrayIn = [];
      let patCata = $("#partCategoryFilterIn").val();
      var notSelected = $("#partCategoryFilterIn").find('option').not(':selected');
      var arrayOfUnselected = notSelected.map(function () {
          return this.value;
      }).get();
      if (arrayOfUnselected.length == 0) {
          patCata = "";
      }
        let title = $("#reportTitleId").text();
        if(title == "Low Market Share"){
          procedureName  = "Market_Share_Details_DistributorList";
          districtName = $("#districtFilterIn").val();
        //  partClass = $("#partCategoryFilterIn").val();
       //   yearMonth.push({ dataType: "String", key: 'PartCategory', value: patCata.toString() });
       //   yearMonth.push({ dataType: "String", key: 'District', value: districtName.toString() });
        }else if(title == "Market Share Decline"){
            procedureName  = "Market_Share_Decline_DistributorList";
            districtName = $("#districtFilterIn").val();
            partClass = $("#partCategoryFilterIn").val();
        //    yearMonth.push({ dataType: "String", key: 'District', value: districtName.toString() });
        //    yearMonth.push({ dataType: "String", key: 'PartCategory', value: patCata.toString() });
        }else if(title == "Retailer Concentration"){
            procedureName  = "Retailer_Concentration_DistributorList";
            districtName = $("#districtFilterIn").val();
         //   yearMonth.push({ dataType: "String", key: 'District', value: districtName.toString() });
        }else {
            procedureName  = "Repeatability_Of_Sales_FistributorList";
            districtName = $("#districtFilterIn").val();
           // yearMonth.push({ dataType: "String", key: 'District', value: districtName.toString() });
        }
         distriButer = $.ajax({
            url: getApiDomain(),
            type: "POST",
            data: JSON.stringify({ 'filter': procedureName, 'chartDataForms': yearMonth }),
            success: (function (data) {
                let filterData = data.data.data[0];
                distriButer = null;
                top50Distri = [];
                let distributersList =''
                for(let i=0; i<filterData.length;i++){
                    top50Distri.push(filterData[i].DistributorID);
                    distributersList=distributersList+filterData[i].DistributorID+',';
                }
                selectedFilter.push({ dataType: "String", key: 'distributorId', value: distributersList.toString() })
               distFilterFunction(yearData,monthDataNum,selectedFilter,filter_Name);
               
            }),
            error: (function (err) {
                console.log(err);
                distriButer = null;
            })
        });
    }else{
        distFilterFunction(yearData,monthDataNum,selectedFilter, filter_Name);
    }
}

function distFilterFunction(yearData,monthDataNum,selectedFilter, filter_Name){
    selectedFilter.push({ dataType: "String", key: 'Year', value: yearData.toString() });
    selectedFilter.push({ dataType: "String", key: 'Month', value: monthDataNum.toString() });
    for (let i = 0; i < preSelectedFilterArrayIn.length; i++) {
        switch (preSelectedFilterArrayIn[i].filterName) {
            case "stateFilterIn":
                selectedFilter.push({ dataType: "String", key: 'State', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "territoryFilterIn":
                // if (pageName != "indiaView")
                    selectedFilter.push({ dataType: "String", key: 'Territory', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "distributorFilterIn":
                if (filter_Name != 'stateFilterIn')
                    selectedFilter.push({ dataType: "String", key: 'distributorID', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                // else if (pageName != "indiaView")
                //     selectedFilter.push({ dataType: "String", key: 'distributorID', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                 break;
            case "districtFilterIn":
               // if (!notPresentDistrictFilter.includes(pageName))
               if (filter_Name != 'stateFilterIn')
                    selectedFilter.push({ dataType: "String", key: 'District', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "classifictionFilterIn":
                if (filter_Name != 'stateFilterIn')
                selectedFilter.push({ dataType: "String", key: 'classification', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "partCategoryFilterIn":
                if (filter_Name != 'stateFilterIn')
                selectedFilter.push({ dataType: "String", key: 'PartCategory', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "segmentFilterIn":
                //if (pageName == "retailView")
                if (filter_Name != 'stateFilterIn')
                    selectedFilter.push({ dataType: "String", key: 'RetailerSegment', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "retailernameFilterIn":
                if (filter_Name != 'stateFilterIn')
                selectedFilter.push({ dataType: "String", key: 'ContactCode', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "PartCodeIn":
               // if (pageName == "partDrillView")
               if (filter_Name != 'stateFilterIn')
                selectedFilter.push({ dataType: "String", key: 'PartCode', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;
            case "RetailerIDIn":
                //if (pageName == "retailerDrillView")
                if (filter_Name != 'stateFilterIn')
                selectedFilter.push({ dataType: "String", key: 'RetailerID', value: preSelectedFilterArrayIn[i].filterValue.toString() });
                break;

        }

    }

    $.ajax({
        url: getApiDomain(),
        type: "POST",
        data: JSON.stringify({ 'filter': "Filter_Options_For_Dependency_V1_backup_h5", 'chartDataForms': selectedFilter }),
        success: (function (data) {
            let filterData = data.data.data;
            populateFilterInCombo(filterData, filter_Name);

        }),
        error: (function (err) {
            console.log(err);
        })
    });

}

let repeataConceObj;
function repeatableSalesTableChartApi(){
    $("#repeatabilitySales").jqGrid('GridUnload');
    $("#repeatabilitySales").empty();
    if (repeataConceObj) {
        repeataConceObj.abort();
        repeataConceObj = null;
    }
    let procedureName = "Repeatability_Of_Sales";
    let filterData = createInsightFilterData();
    repeataConceObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: filterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(filterData)),'dashboardId' : dashboardId }),
     
       // data: JSON.stringify({ 'filter': "[Repeatability_Of_Sales]", 'chartDataForms': filterData }),
        success: (function (resultData) {
            let data = resultData.data.data[0];
            let data1 = resultData.data.data[1];
            repeataConceObj = null;
            showHideLoaderIn("repeatableSales", false);
            showHideLoaderIn("repeatabilitySalesLoader", false);
            repeatableConcentrationChart(data);
            repeateDetailsCreateTable(data1);
        }),
        error: (function (err) {
            repeataConceObj = null;
            console.log(err);
        })
    });
}

function repeatableConcentrationChart(data){
    let quarFy=[];
    let salesFy=[];
    let retailConc = [];
    for(let i=0; i < data.length; i++){
        quarFy.push(data[i].Quarter);
        salesFy.push(data[i].Sales*1);
        retailConc.push(data[i].Sales_Perc*1);
    }

Highcharts.chart('repeatableSales', {
    // chart: {
    //     zoomType: 'xy'
    // },
    credits: {
     enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: quarFy,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value} %',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Repeatability of Sales',
            style: {
                fontFamily: 'sans-serif',
                fontSize: '13px',
                fontWeight: 600,
            }
        }
    }],
    tooltip: {
        formatter: function () {
            var points = this.points;
            var pointsLength = points.length;
            var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Quarter : ' + points[0].key + '</span><br/>' : '';
            var index;
            var y_value;
            for (index = 0; index < pointsLength; index++) {
                if (points[index].point.target != undefined) {
                    y_value = points[index].point.target;
                } else {
                    y_value = points[index].y;
                }
                let perc='';
                if(points[index].series.name =="Repeatability of Sales(%)"){
                    perc='%';
                }
                tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + Highcharts.numberFormat(y_value,2) +''+perc+ '</b><br/>';
            }
            return tooltipMarkup;
        },
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        showInLegend: false, 
        name: 'Repeatability of Sales(%)',
        type: 'column',
        data: retailConc,
        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+"%";
            }
        },
        tooltip: {
            valueSuffix: '%'
        }
    }]
});
}


function repeateDetailsCreateTable(data){

jQuery("#repeatabilitySales").jqGrid({
    data: data,
    datatype: "local",
    maxHeight: 210,
    rowNum: 3,
    autowidth: true,
    shrinkToFit: true,
    forceFit: true,
    viewrecords: true,
    sortorder: "desc",


    colNames: ["Distributors","District","Repeatability of Sales(%)"],


    colModel: [
        { name: 'Distributor', index: 'Distributor', sortable: true },
        { name: 'District', index: 'District', sortable: true },
        { name: 'Repeatable_Per', index: 'Repeatable_Per',formatter: getnumFormatterRupeIn,  sorttype:'int', sortable: true },
    ]
});
jQuery("#repeatabilitySales").jqGrid('navGrid', '#repeatabilitySalesLoader', { edit: false, add: false, del: false, refresh: true });

}

//-----Sales End -----------//


// $(document).on('change', '#yearFilter', function () {
//     let filterName = $(this).val();
//     let seleMonth = $("#monthFilter").val();
//     $(this).data('options', $('#monthDependantComboIdIn option').clone());
//     var finalArr = $(this).data('options').filter('[class="' + filterName + '"]');

//     var html = "";
//     let selected = '';
//     for (i = 0; i < finalArr.length; i++) {
//         jQuery(finalArr[i]).removeAttr("class");
//         selected = ''
//         for(j=0; j < seleMonth.length; j++){
//             if (finalArr[i].value  == seleMonth[j]) {
//                 selected = 'selected';
//             }
//         }
//         html += "<option value='" + finalArr[i].value + "' " + selected + ">" + finalArr[i].text + "</option>"
//     }
//     $("#monthFilter").empty();
//     $("#monthFilter").html(html);
// });



let disrtiReatailObj;
function retailerConcentWiseRetailersApi(){
    $("#retailerConc,#correRetailer").jqGrid('GridUnload');
    $("#retailerConc,#correRetailer").empty();
    if (disrtiReatailObj) {
        disrtiReatailObj.abort();
        disrtiReatailObj = null;
    }
    let filterData = createInsightFilterData();
    let procedureName = "Bajaj_Insight_Retailer_Concentration";
    disrtiReatailObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: filterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(filterData)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Bajaj_Insight_Retailer_Concentration", 'chartDataForms': filterData }),
        success: (function (resultData) {
            let data = resultData.data.data[0];
            let data1 = resultData.data.data[1];
            let data2 = resultData.data.data[2];
            let data3 = resultData.data.data[3];
            showHideLoaderIn("retailerConcLoader", false);
            showHideLoaderIn("correRetailerLoader", false);
            showHideLoaderIn("retailerConce", false);
            showHideLoaderIn("retailerperc", false);
            disrtiReatailObj = null;
            createDistributerWiseRetailersTable(data);
            createcorespondingRetailersTable(data2);
            retailerConcentrationChart(data3);
            retailerPercentageChart(data1);
        }),
        error: (function (err) {
            disrtiReatailObj = null;
            console.log(err);
        })
    });

}

function createDistributerWiseRetailersTable(data){

jQuery("#retailerConc").jqGrid({
    data: data,
    datatype: "local",
    maxHeight: 150,
    minWidth: 200,
    width: 200,
    maxWidth: 200,
    rowNum: 3,
    autowidth: true,
    shrinkToFit: true,
    forceFit: true,
    viewrecords: true,
    sortorder: "desc",


    colNames: ["Id","Distributors","Sales Contribution","Retailer Concentration (%)"],


    colModel: [
        { name: 'DistributorId', index: 'DistributorId', sortable: true,hidden:true, },
        { name: 'Distributor', index: 'Distributor', sortable: true },
        { name: 'Sales_Contrib', index: 'Sales_Contrib', sortable: true },
        { name: 'Retailer_Concent', index: 'Retailer_Concent', sortable: true },
    ],
    onSelectRow: function (rowId) {
        let rowData = $('#retailerConc').jqGrid('getRowData', rowId);
        distributerId = rowData.DistributorId;
        showHideLoaderIn("correRetailerLoader", true);
        showHideLoaderIn("retailerConce", true);
        showHideLoaderIn("retailerperc", true);
        selectedDistributerData(distributerId);
    },
});
jQuery("#retailerConc").jqGrid('navGrid', '#retailerConcLoader', { edit: false, add: false, del: false, refresh: true });



}

let distributerId='';

let disrtiSelectObj;
function selectedDistributerData(distributerId){
    $("#correRetailer").jqGrid('GridUnload');
    $("#correRetailer").empty();
    if (disrtiSelectObj) {
        disrtiSelectObj.abort();
        disrtiSelectObj = null;
    }
    let filterData = createInsightFilterData();
    filterData = filterData.filter((item) => item.key !== "distributorId");
    filterData.push({ dataType: "String", key: 'distributorId', value: distributerId.toString() });
    let procedureName = "Bajaj_Insight_Retailer_Concentration";
    disrtiSelectObj = $.ajax({
        url: getApiDomain(),
        type: 'POST',
        data: JSON.stringify({ chartDataForms: filterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(filterData)),'dashboardId' : dashboardId }),
     
      //  data: JSON.stringify({ 'filter': "Bajaj_Insight_Retailer_Concentration", 'chartDataForms': filterData }),
        success: (function (resultData) {
            let data = resultData.data.data[0];
            let data1 = resultData.data.data[1];
            let data2 = resultData.data.data[2];
            let data3 = resultData.data.data[3];
            //showHideLoaderIn("retailerConcLoader", false);
            showHideLoaderIn("correRetailerLoader", false);
            showHideLoaderIn("retailerConce", false);
            showHideLoaderIn("retailerperc", false);
            disrtiSelectObj = null;
            //createDistributerWiseRetailersTable(data);
            createcorespondingRetailersTable(data2);
            retailerConcentrationChart(data3);
            retailerPercentageChart(data1);
        }),
        error: (function (err) {
            disrtiSelectObj = null;
            console.log(err);
        })
    });

}


function createcorespondingRetailersTable(data){
    jQuery("#correRetailer").jqGrid({
        data: data,
        datatype: "local",
        maxHeight: 150,
        minWidth: 200,
        width: 200,
        maxWidth: 200,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
    
    
        colNames: ["Retailer","Retailer Code","Sales Value","Contribution"],
    
    
        colModel: [
            { name: 'Retailer', index: 'Retailer', sortable: true },
            { name: 'Retailer_Code', index: 'Retailer_Code', sortable: true },
            { name: 'Sales', index: 'Sales',formatter: getnumFormatterRupe,  sorttype:'int',  sortable: true },
            { name: 'Contrib', index: 'Contrib', sortable: true }
        ]
    });
    jQuery("#correRetailer").jqGrid('navGrid', '#correRetailerLoader', { edit: false, add: false, del: false, refresh: true });
    
}


function retailerConcentrationChart(data){
    let quarFy=[];
    let salesFy=[];
    let retailConc = [];
    for(let i=0; i < data.length; i++){
        quarFy.push(data[i].Quarter);
        salesFy.push(data[i].Retailer_Concent*1);
        retailConc.push(data[i].Retailer_Concent*1);
    }

Highcharts.chart('retailerConce', {
    chart: {
        zoomType: 'xy'
    },
    credits: {
     enabled: false
    },
    title: {
        text: 'Retailer Concentration Trend',
        style: {
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 600,
         }
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: quarFy,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value} %',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Retailer Concentration',
            style: {
                fontFamily: 'sans-serif',
                fontSize: '13px',
                fontWeight: 600,
             }
        }
    }, { // Secondary yAxis
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            enabled : false
        },
        opposite: true
    }],
    tooltip: {
        formatter: function () {
            var points = this.points;
            var pointsLength = points.length;
            var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Quarter : ' + points[0].key + '</span><br/>' : '';
            var index;
            var y_value;
            for (index = 0; index < pointsLength; index++) {
                if (points[index].point.target != undefined) {
                    y_value = points[index].point.target;
                } else {
                    y_value = points[index].y;
                }
                let perc='';
                if(points[index].series.name =="Retailer Concentration"){
                    perc='%';
                    tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + Highcharts.numberFormat(y_value,2)+ ''+perc+'</b><br/>';
                }
            }
            return tooltipMarkup;
        },
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        showInLegend: false, 
        name: 'Retailer',
        type: 'spline',
        data: retailConc,
        zIndex: 2,
        color: Highcharts.getOptions().colors[1],
        // dataLabels: {
        //     enabled: true,
        //     formatter: function () {
        //         return Highcharts.numberFormat(this.y,2)+"%";
        //     }
        // },
        tooltip: {
            valueSuffix: ''
        }

    }, {
        showInLegend: false, 
        name: 'Retailer Concentration',
        type: 'column',
        data: retailConc,
        zIndex: 1,
        color: Highcharts.getOptions().colors[0],
        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+"%";
            }
        },
        tooltip: {
            valueSuffix: '%'
        }
    }]
});
}


function createPieChartDataRP(data) {
  let pieChartData = [];
      pieChartData.push({
           color:"#7a61ba",
          name: "Low (Bottom 20% Contribution)",
          y: data[0].Low * 1,
      });
      pieChartData.push({
         color:'#4198d7',
        name: "High (Top 50% Contribution)",
        y: data[0].High * 1,
    });
    pieChartData.push({
         color:"#d8b655",
        name: "Mid (20-50% Contribution)",
        y: data[0].Mid * 1,
    });
  return pieChartData;
}

function retailerPercentageChart(data){

    let chartData = createPieChartDataRP(data);
  
    Highcharts.chart('retailerperc', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Retailer Distribution',
            style: {
                fontFamily: 'sans-serif',
                fontSize: '14px',
                fontWeight: 600,
             }
        },
        credits: {
         enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    distance: -30,
                    enabled: true,
                    formatter:function() 
					{
                        return (this.key).substring(0, 4);
                    }
                    // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Retailers Percentage',
            colorByPoint: true,
            data: chartData
        }]
    });
}


//----Contribution End ------------//

//------ Market Growth -----------//


//--------------Market Shares -----------------------------//
function prePageMarketShareData() {
    if (startValue > 0) {
        showHideLoaderIn("markerShareItabledLoader", true);
        startValue = startValue - 100;
        endValue = endValue - 100;
        marketShareDeclineChartApi(startValue, endValue);
    }
};

function nextPageMarketShareData() {
    showHideLoaderIn("markerShareItabledLoader", true);
    startValue = startValue + 100;
    endValue = endValue + 100;
    marketShareDeclineChartApi(startValue, endValue);

};

let firstLoad=true;
let startValue=0;
let endValue=100;
let marketShareObj;
function marketShareDeclineChartApi(startValue,endValue){
    $("#markerShareItabled").jqGrid('GridUnload');
    $("#markerShareItabled").empty();
    $("#prePageMarketShareData").hide();
    $("#nextPageMarketShareData").hide();
        if (marketShareObj) {
            marketShareObj.abort();
            marketShareObj = null;
        }
        let patCata = $("#partCategoryFilterIn").val();
        var notSelected = $("#partCategoryFilterIn").find('option').not(':selected');
        var arrayOfUnselected = notSelected.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            patCata = "";
        }
        let filterData = createInsightFilterData();
        filterData.push({ dataType: "String", key: 'fromCount', value: startValue.toString() });
        filterData.push({ dataType: "String", key: 'toCount', value: endValue.toString() });
        //filterData.push({ dataType: "String", key: 'PartCategory', value: patCata.toString() });
        let procedureName="Market_Share_Decline";
        marketShareObj = $.ajax({
            url: getApiDomain(),
            type: 'POST',
            data: JSON.stringify({ chartDataForms: filterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(filterData)),'dashboardId' : dashboardId }),
     
     //       data: JSON.stringify({ 'filter': "Market_Share_Decline", 'chartDataForms': filterData }),
            success: (function (resultData) {
                let data = resultData.data.data[0];
                let data1=resultData.data.data[1];
                showHideLoaderIn("markerShareItabledLoader", false);
                if(firstLoad){
                    showHideLoaderIn("markerShareId", false);
                    marketShareDeclineChart(data);
                    firstLoad=false;
                }
                if (data1.length <= 0) {
                    $("#markerShareId").append("<div class='noData' style='margin-top: 5%; font-size: 20px; height: 22%; margin-left: 38%;'>No Data</div>");
                    $("#nextPageMarketShareData").show();
                    $("#prePageMarketShareData").show();
                    if (startValue > 0) {
                        $("#nextPageMarketShareData").attr('disabled', true);
                        $("#prePageMarketShareData").attr('disabled', false);
                    } else {
                        $("#nextPageMarketShareData").attr('disabled', false);
                        $("#prePageMarketShareData").attr('disabled', true);
                    }
                    return;
                }
                declineTableCreateTable(data1);
                $("#prePageMarketShareData").show();
                marketShareObj = null;
            }),
            error: (function (err) {
                marketShareObj = null;
                console.log(err);
            })
        });
}

function marketShareDeclineChart(data){
    let quarFy=[];
    let salesFy=[];
    let retailConc = [];
    for(let i=0; i < data.length; i++){
        quarFy.push(data[i].Quarter);
        salesFy.push(data[i].Sales_Per*1);
        retailConc.push(data[i].Growth*1);
    }

Highcharts.chart('markerShareId', {
    chart: {
        zoomType: 'xy'
    },

    credits: {
     enabled: false
    },
    title: {
        text: 'Market Share Decline across Quarters',
        style: {
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 600,
         }
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: quarFy,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis 
        labels: {
            formatter: function () {  
                return this.value;
            },
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Market Share',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
    }, { // Secondary yAxis
        labels: {
            format: '{value} %',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
          title: {
            text: 'Market Share Growth',
            style: {
                fontFamily: 'sans-serif',
                fontSize: '12px',
                fontWeight: 500,
             }
        },
        opposite: true
    }],
    tooltip: {
        formatter: function () {
            var points = this.points;
            var pointsLength = points.length;
            var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Quarter : ' + points[0].key + '</span><br/>' : '';
            var index;
            var y_value;
            for (index = 0; index < pointsLength; index++) {
                if (points[index].point.target != undefined) {
                    y_value = points[index].point.target;
                } else {
                    y_value = points[index].y;
                }
                let perc='';
                if(points[index].series.name =="Market Share Growth"){
                    perc='%';
                }
                tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + Highcharts.numberFormat(y_value,2)+ ''+perc+'</b><br/>';
            }
            return tooltipMarkup;
        },
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        showInLegend: false, 
        name: 'Sales',
        type: 'column',
        zIndex: 1,
        data: salesFy,
        tooltip: {
            valueSuffix: ''
        }

    }, {
        showInLegend: false, 
        name: 'Market Share Growth',
        type: 'spline',
        data: retailConc,
        yAxis: 1,
        zIndex: 2,
        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+"%";
            }
        },
        tooltip: {
            valueSuffix: '%'
        }
    }]
});
}



function declineTableCreateTable(data){

    jQuery("#markerShareItabled").jqGrid({
        data: data,
        datatype: "local",
        maxHeight: 200,
        minWidth: 1200,
        width: 1200,
        maxWidth: 1200,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
    
    
        colNames: ["District","Distributor","Part Class","Market Share Growth(%)"],
    
    
        colModel: [
            { name: 'District', index: 'District', sortable: true },
            { name: 'Distributor', index: 'Distributor', sortable: true },
            { name: 'Part_Category', index: 'Part_Category' },
            { name: 'Growth', index: 'Growth',formatter: getnumFormatterRupeIn,cellsformat: 'p', sortable: true }
        ],loadComplete: function () {
            if (startValue <= 1) {
                $("#prePageMarketShareData").attr('disabled', true);
            } else {
                $("#prePageMarketShareData").attr('disabled', false);
            }
            $("#nextPageMarketShareData").show();
            $("#nextPageMarketShareData").attr('disabled', false);
        },
    });
    jQuery("#markerShareItabled").jqGrid('navGrid', '#markerShareItabledLoader', { edit: false, add: false, del: false, refresh: true });
    
}

function getnumFormatterRupeIn(value) {
    let indianrupee = parseInt(value * 1);
    return (new Intl.NumberFormat('en-IN').format(indianrupee))+"%";
}
///----------Market Growth -------------//


function prePageLowMarketShareDataIn() {
    if (fromValue > 0) {
        showHideLoaderIn("lowShareItabledLoader", true);
        fromValue = fromValue - 100;
        toValue = toValue - 100;
        lowMarketShareTableChartApi(fromValue, toValue);
    }
};

function nextLowPageMarketShareDataIn() {
    showHideLoaderIn("lowShareItabledLoader", true);
    fromValue = fromValue + 100;
    toValue = toValue + 100;
    lowMarketShareTableChartApi(fromValue, toValue);

};

let oneTimeCall = true;
let fromValue=0;
let toValue=100;
let lowShareObj;
function lowMarketShareTableChartApi(fromValue,toValue){
    $("#lowShareItabled").jqGrid('GridUnload');
    $("#lowShareItabled").empty();
    $("#prePageLowMarketShareData").hide();
    $("#nextPageLowMarketShareData").hide();
        if (lowShareObj) {
            lowShareObj.abort();
            lowShareObj = null;
        }
        let patCata = $("#partCategoryFilterIn").val();
        var notSelected = $("#partCategoryFilterIn").find('option').not(':selected');
        var arrayOfUnselected = notSelected.map(function () {
            return this.value;
        }).get();
        if (arrayOfUnselected.length == 0) {
            patCata = "";
        }
        let filterData = createInsightFilterData();
        filterData.push({ dataType: "String", key: 'fromCount', value: fromValue.toString() });
        filterData.push({ dataType: "String", key: 'toCount', value: toValue.toString() });
      //  filterData.push({ dataType: "String", key: 'PartCategory', value: patCata.toString() });
        let procedureName = "Market_Share_Details";
        lowShareObj = $.ajax({
            url: getApiDomain(),
            type: 'POST',
            data: JSON.stringify({ chartDataForms: filterData, filter: procedureName,'filterHash' : cTageHash( procedureName + JSON.stringify(filterData)),'dashboardId' : dashboardId }),
     
           // data: JSON.stringify({ 'filter': "Market_Share_Details", 'chartDataForms': filterData }),
            success: (function (resultData) {
                let data = resultData.data.data[0];
                let data1=resultData.data.data[1];
                showHideLoaderIn("lowShareItabledLoader", false);
                if(oneTimeCall){
                    showHideLoaderIn("lowShareId", false);
                    lowShareChart(data);
                    oneTimeCall=false;
                }
                if (data1.length <= 0) {
                    $("#lowShareItabled").append("<div class='noData' style='margin-top: 5%; font-size: 20px; height: 22%; margin-left: 38%;'>No Data</div>");
                    $("#nextPageLowMarketShareData").show();
                    $("#prePageLowMarketShareData").show();
                    if (fromValue > 0) {
                        $("#nextPageLowMarketShareData").attr('disabled', true);
                        $("#prePageLowMarketShareData").attr('disabled', false);
                    } else {
                        $("#nextPageLowMarketShareData").attr('disabled', false);
                        $("#prePageLowMarketShareData").attr('disabled', true);
                    }
                    return;
                }
                lowShareTableCreateTable(data1);
                $("#prePageLowMarketShareData").show();
                lowShareObj = null;
            }),
            error: (function (err) {
                lowShareObj = null;
                console.log(err);
            })
        });
}


function lowShareChart(data){
    let quarFy=[];
    let salesFy=[];
    let retailConc = [];
    for(let i=0; i < data.length; i++){
        quarFy.push(data[i].Quarter);
        salesFy.push(data[i].Sales*1);
        retailConc.push(data[i].Sales_Per*1);
    }
    Highcharts.chart('lowShareId', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Market Share Trend across Quarters',
            style: {
                fontFamily: 'sans-serif',
                fontSize: '14px',
                fontWeight: 600,
             }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: quarFy,
            crosshair: true
        },
        yAxis: {
            min: 0,
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Market Share',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            plotLines: [{
                color: '#FF0000',
                width: 2,
                value: 50
            }]
        },
        tooltip: {
            formatter: function () {
                var points = this.points;
                var pointsLength = points.length;
                var tooltipMarkup = pointsLength ? '<span style="font-size: 13px">Quarter: ' + points[0].key + '</span><br/>' : '';
                var index;
                var y_value;
                for (index = 0; index < pointsLength; index++) {
                    if (points[index].point.target != undefined) {
                        y_value = points[index].point.target;
                    } else {
                        y_value = points[index].y;
                    }
                    let perc='';
                    if(points[index].series.name =="Market Share"){
                        perc='%';
                    }
                    tooltipMarkup += '<span style="color:' + points[index].series.color + '">\u25CF</span> ' + points[index].series.name + ': <b><i class="fa fa-inr" aria-hidden="true"></i>' + Highcharts.numberFormat(y_value,2) + ''+perc+'</b><br/>';
                }
                return tooltipMarkup;
            },
            shared: true,
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            showInLegend: false,
            name: 'Market Share',
            data: retailConc,
            dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y,2)+"%";
             }
            },
            tooltip: {
                valueSuffix: '%'
            }
    
        }]
    });
}

function lowShareTableCreateTable(data){
    jQuery("#lowShareItabled").jqGrid({
        data: data,
        datatype: "local",
        maxHeight: 200,
        minWidth: 1200,
        width: 1200,
        maxWidth: 1200,
        rowNum: 3,
        autowidth: true,
        shrinkToFit: true,
        forceFit: true,
        viewrecords: true,
        sortorder: "desc",
    
    
        colNames: ["District","Distributor","Part Class","Market Share(%)"],
    
    
        colModel: [
            { name: 'District', index: 'District', sortable: true },
            { name: 'Distributor', index: 'Distributor', sortable: true },
            { name: 'PartCategory', index: 'PartCategory' },
            { name: 'Sales_Per', index: 'Sales_Per',formatter: getnumFormatterRupeIn,cellsformat: 'p', sortable: true }
        ],loadComplete: function () {
            if (fromValue <= 1) {
                $("#prePageLowMarketShareData").attr('disabled', true);
            } else {
                $("#prePageLowMarketShareData").attr('disabled', false);
            }
            $("#nextPageLowMarketShareData").show();
            $("#nextPageLowMarketShareData").attr('disabled', false);
        },
    });
    jQuery("#lowShareItabled").jqGrid('navGrid', '#lowShareItabledLoader', { edit: false, add: false, del: false, refresh: true });
    
}