const downloadArray = [];
    let downloadStatus = true;
    /** 
    ###################################################################################################
    ###################################################################################################
*/ 

    function checkQueueInLoop(param) {
        // const keyPresent = downloadArray.findIndex(obj => obj.key == param);
        const keyPresent = 0;
        if (downloadStatus && downloadArray.length !== 0 && downloadArray[keyPresent].key !== undefined) {
            switch (downloadArray[keyPresent].key) {
                case "retailerCsvDownload":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    retailerPerformancePageShareDataDownload();
                    break;
                case "retailerCsvDownloadRetailerDril":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    retailerPerfDrillDownDataDownload();
                    break;
                case "partGroupCsvDownload":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    partGroupPageShareDataDownload();
                    break;
                case "partCodeCsvDownload":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    partCodePageShareDataDownload();
                    break;
                case "partDrillCsvDownload":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    partDrillPageShareDataDownload();
                    break;
                case "regulCodeCsvDownload":
                        $('#downloadCsvLoader').show();
                        downloadStatus = false;
                        regularPageShareDataDownload();
                        break;
                case "freqCodeCsvDownload":
                            $('#downloadCsvLoader').show();
                            downloadStatus = false;
                            frequentPageShareDataDownload();
                            break;
                case "dormCodeCsvDownload":
                            $('#downloadCsvLoader').show();
                            downloadStatus = false;
                            dormantPageShareDataDownload();
                            break;      
                case "ContactCodeDrillDown":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    retailerDrillPageShareDataDownload();
                    break;
                case"ContactCodeSpeciDrillDown":
                $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    retailerSpeciPageShareDataDownload();
                    break;
                case"PartcodenotDrillDown":
                $('#downloadCsvLoader').show();
                    downloadStatus = false;
                    partnotpurPageShareDataDownload();
                    break;
                case "RetailerSummeryDrillDown":
                    $('#downloadCsvLoader').show();
                    downloadStatus = false;   
                    retailersummeryPageShareDataDownload();
                    break;
                case "RetailerRecomendDrillSales":
                        $('#downloadCsvLoader').show();
                        downloadStatus = false;   
                        retailerRecSalesPageShareDataDownload();
                        break;
                 case "retailerOrderDrillDown":
                       $('#downloadCsvLoader').show();
                       downloadStatus = false;   
                       retailerRecOrderPageShareDataDownload();
                       break;
            }
        }
    }

/** 
    ###################################################################################################
    ###################################################################################################
*/ 

    function methodQueueRerun(){
        csvDownloadCompletedTrack(downloadArray[0].value);
        downloadArray.shift();
            downloadStatus = true;
            checkQueueInLoop();
            $('#countId').text(downloadArray.length);
    }

    
    function csvDownloasName(){
        let name ='';
        if(downloadArray.length > 0){
        for(let i=0; i< downloadArray.length; i++){
            name += "<span>"+ (i+1) +".&nbsp;"+downloadArray[i].value+" </span><br> ";
        }
    }
                return name;
            }

/** 
    ###################################################################################################
    ###################################################################################################
*/ 

    function downloadMethodQueue(downloadButtonId) {
        
        switch (downloadButtonId) {
            case "retailerCsvDownload":
                $('#downloadCsvLoader,#banDownload').show();
                $('#showDownload').hide();
                $("#retailerCsvDownload").attr("disabled", true);
                downloadArray.push({ "key": "retailerCsvDownload", "value": "Retailer Performance" });
                csvDownloadClickTrack("Retailer Performance");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;
            case "retailerCsvDownloadRetailerDril":
                $('#downloadCsvLoader,#banDownloadRetailerDril').show();
                $('#showDownloadRetailerDril').hide();
                $("#retailerCsvDownloadRetailerDril").attr("disabled", true);
                downloadArray.push({ "key": "retailerCsvDownloadRetailerDril", "value": "Part Category Performance" });
                csvDownloadClickTrack("Part Category Performance");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;
            case "partGroupCsvDownload":
                $('#downloadCsvLoader,#partGroupbanDownload').show();
                $('#partGroupshowDownload').hide();
                $("#partGroupCsvDownload").attr("disabled", true);
                downloadArray.push({ "key": "partGroupCsvDownload", "value": "Part Group Performance" });
                csvDownloadClickTrack("Part Group Performance");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;

            case "partCodeCsvDownload":
                $('#downloadCsvLoader,#partCodebanDownload').show();
                $('#partCodeshowDownload').hide();
                $("#partCodeCsvDownload").attr("disabled", true);
                downloadArray.push({ "key": "partCodeCsvDownload", "value": "Part Code Performance" });
                csvDownloadClickTrack("Part Code Performance");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;
            case "partDrillCsvDownload":
                $('#downloadCsvLoader,#partDrillbanDownload').show();
                $('#partDrillshowDownload').hide();
                $("#partDrillCsvDownload").attr("disabled", true);
                downloadArray.push({ "key": "partDrillCsvDownload", "value": "Part Code Drill Down" });
                csvDownloadClickTrack("Part Code Performance");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;
            case "regulCodeCsvDownload":
                $('#downloadCsvLoader,#regularCodebanDownload').show();
                $('#regulCodeshowDownload').hide();
                $("#regulCodeCsvDownload").attr("disabled", true);
                downloadArray.push({ "key": "regulCodeCsvDownload", "value": "Regular Retailer" });
                csvDownloadClickTrack("Regular Retailer");
                checkQueueInLoop(downloadButtonId);
                $('#countId').text(downloadArray.length);

                break;
        
                case "freqCodeCsvDownload":
                    $('#downloadCsvLoader,#frequentCodebanDownload').show();
                    $('#frequentCodeshowDownload').hide();
                    $("#freqCodeCsvDownload").attr("disabled", true);
                    downloadArray.push({ "key": "freqCodeCsvDownload", "value": "Frequent Buyers" });
                    csvDownloadClickTrack("Frequent Buyers");
                    checkQueueInLoop(downloadButtonId);
                    $('#countId').text(downloadArray.length);
    
                    break;

                case "dormCodeCsvDownload":
                    $('#downloadCsvLoader,#dormantCodebanDownload').show();
                    $('#dormantCodeshowDownload').hide();
                    $("#dormCodeCsvDownload").attr("disabled", true);
                    downloadArray.push({ "key": "dormCodeCsvDownload", "value": "Dormant Retailers" });
                    csvDownloadClickTrack("Dormant Retailers");
                    checkQueueInLoop(downloadButtonId);
                    $('#countId').text(downloadArray.length);
    
                    break;
                case "ContactCodeDrillDown":
                        $('#downloadCsvLoader,#retailerDrillbanDownload').show();
                        $('#retailerDrillshowDownload').hide();
                        $("#ContactCodeDrillDown").attr("disabled", true);
                        downloadArray.push({ "key": "ContactCodeDrillDown", "value": "Part Group wise Sales" });
                        csvDownloadClickTrack("Part Group wise Sales");
                        checkQueueInLoop(downloadButtonId);
                        $('#countId').text(downloadArray.length);
        
                        break;    
                case "ContactCodeSpeciDrillDown":
                            $('#downloadCsvLoader,#retailerSpecibanDownload').show();
                            $('#retailerSpecishowDownload').hide();
                            $("#ContactCodeSpeciDrillDown").attr("disabled", true);
                            downloadArray.push({ "key": "ContactCodeSpeciDrillDown", "value": "Retailer Specific Recommended order" });
                            csvDownloadClickTrack("Retailer Specific Recommended order");
                            checkQueueInLoop(downloadButtonId);
                            $('#countId').text(downloadArray.length);
            
                            break;
                case "PartcodenotDrillDown":
                            $('#downloadCsvLoader,#partcodebanDownload').show();
                            $('#partcodeshowDownload').hide();
                            $("#PartcodenotDrillDown").attr("disabled", true);
                            downloadArray.push({ "key": "PartcodenotDrillDown", "value": "Part not Purchased by this Retailer" });
                            csvDownloadClickTrack("Part not Purchased by this Retailer");
                            checkQueueInLoop(downloadButtonId);
                            $('#countId').text(downloadArray.length);
                            break;
                                case "RetailerSummeryDrillDown":
                                $('#downloadCsvLoader,#retaisumbanDownload').show();
                                $('#retailsummshowDownload').hide();
                                $("#RetailerSummeryDrillDown").attr("disabled", true);
                                downloadArray.push({ "key": "RetailerSummeryDrillDown", "value": "Retailer Summery" });
                                csvDownloadClickTrack("Part not Purchased by this Retailer");
                                checkQueueInLoop(downloadButtonId);
                                $('#countId').text(downloadArray.length);
                
                                break;
                                case "RetailerRecomendDrillSales":
                                    $('#downloadCsvLoader,#retailerDrillSalesshowDownload').show();
                                    $('#retailRecomshowDownload').hide();
                                $("#RetailerRecomendDrillSales").attr("disabled", true);
                                downloadArray.push({ "key": "RetailerRecomendDrillSales", "value": "Retailer Recommended" });
                                csvDownloadClickTrack("Recommended Part Group wise Sales");
                                checkQueueInLoop(downloadButtonId);
                                $('#countId').text(downloadArray.length);
                                break;

                                case "retailerOrderDrillDown":
                                    $('#downloadCsvLoader,#retailerDrillOrderBanDownload').show();
                                    $('#retailerDrillOrderDownload').hide();
                                    $("#retailerOrderDrillDown").attr("disabled", true);
                                    downloadArray.push({ "key": "retailerOrderDrillDown", "value": "Retailer Recommended View" });
                                    csvDownloadClickTrack("Recommended Part wise Orders");
                                    checkQueueInLoop(downloadButtonId);
                                    $('#countId').text(downloadArray.length);
                                    break;
            }
    }


/** 
    ###################################################################################################
    ###################################################################################################
*/ 

// comman for all get filter data with attach from count and To count
function getFilterData(retailerperformData){
    const keyPresentFromCount = retailerperformData.findIndex(obj => obj.key == "fromCount");
    const keyPresentToCount = retailerperformData.findIndex(obj => obj.key == "toCount");
     fromZeroCount = keyPresentToCount  == -1 ? 0 : parseInt(retailerperformData[keyPresentToCount].value) ;
     toLastCount = keyPresentToCount  == -1 ? 500 : parseInt(retailerperformData[keyPresentToCount].value) + 500 ;
if( keyPresentFromCount== -1){
    retailerperformData.push({ dataType: "String", key: 'fromCount', value: fromZeroCount.toString() });
}else{
retailerperformData[keyPresentFromCount].value = fromZeroCount.toString();
}
if(keyPresentToCount == -1){
retailerperformData.push({ dataType: "String", key: 'toCount', value: toLastCount.toString() });
}else{
retailerperformData[keyPresentToCount].value = toLastCount.toString();
}
return retailerperformData;
}


// perparing data to csv comma seprated
function exportToCsv(fileName,rows) {
    let processRow = function (row) {
        let finalVal = '';
        for (let j = 0; j < row.length; j++) {
            let innerValue = row[j] === null || row[j] == undefined || "NAN" == row[j] ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            let result = innerValue.replace(/"/g, '');            
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    let csvFile = '';
    for (let i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }
     exportToCsvOnWindow(fileName,csvFile);
   
}

//download blob on window
function exportToCsvOnWindow(filename, csvFile){
let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
if (navigator.msSaveBlob) { 
    navigator.msSaveBlob(blob, filename);
} else {
    let link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

}