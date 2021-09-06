function trackAutoStartTimeEvent(viewName) {
    window.appInsights.startTrackPage(viewName);
  //  console.log("-----------page start event ----------------")
}
function trackAutoEndTimeEvent(viewName, payload) {
    window.appInsights.stopTrackPage(viewName, null, payload);
   // console.log("-----------page stop event ----------------")
}

function trackCustomEvent(eventName, payload) {
    window.appInsights.trackEvent({ name: eventName }, payload);
}

function trackCustomPageLoadEvent(eventName, payload) {
    window.appInsights.trackEvent({ name: eventName }, payload);
}

function trackCustomTimeSpentEvent(eventName, payload) {
    window.appInsights.trackEvent({ name: eventName }, payload);
}

window.addEventListener('beforeunload', (event) => {
    appInsiteTimeTrackingClose();
   // console.log("tab close event delay --500 ms");
    var start = Date.now(), now = start;
    var delay = 500; // msec
    while (now - start < delay) {
        now = Date.now();
    }
    // this is needed to avoid to show a confirmation prompt
    delete event['returnValue'];
});


let propertiesPalyLoad = {};
let trackPageView = false;
let PreViewName = '';
function appInsiteCall() {
    let viewName = $('.reportTitle').text();
    let properties = createPayload(viewName);
    
    trackCustomPageLoadEvent('Report Open', properties);
    if (PreViewName !== viewName) {
        if (trackPageView)
         appInsiteTimeTrackingClose();
        appInsiteTimeTrackingSatrt();
               
    }
}


let idleTime = 0;
let idleTimeStatus = true;
// call every minute
let idleInterval = setInterval(timeIncrement, 60000); //1 minute
//check user any activity like any event
$(document).on("mouseover mousemove mouseleave keypress focus blur", function () {
    if (idleTime > 1 && !idleTimeStatus) {
        appInsiteTimeTrackingSatrt();
     //   console.log(idleTime + "-88-" + idleTimeStatus);
    }
    idleTimeStatus = true;
    idleTime = 0;
   // console.log(idleTime + "-77-" + idleTimeStatus);
});
//time out default in 15 minute
function timeIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 15 && idleTimeStatus) {// 15 time out 
       // console.log(idleTime + "--" + idleTimeStatus);
        appInsiteTimeTrackingClose();
        idleTimeStatus = false;
    }
}

//call this method when used click any view
function appInsiteTimeTrackingSatrt() {
   // console.log("tab active ");
    let viewName = $('.reportTitle').text();
    let properties = createPayload(viewName);
    trackAutoStartTimeEvent(viewName);
    propertiesPalyLoad = properties;
   // console.log(propertiesPalyLoad);
    if (propertiesPalyLoad.reportName != undefined && propertiesPalyLoad.reportName != "")
        sendMsgtoParent(propertiesPalyLoad);
        trackPageView = true;
        PreViewName = viewName;

}

//call method when user change page 
function appInsiteTimeTrackingClose() {
   // console.log("tab Close / InActive Event");
    let viewName = $('.reportTitle').text();
   let viewNameTemp = PreViewName != '' ? PreViewName : viewName;
    let properties = createPayload(viewNameTemp);
    trackAutoEndTimeEvent(PreViewName, properties);
    trackPageView = true;
    PreViewName = viewName;
}


// this method used in filter event  
function filterAppInsiteCall(filterValue, filter_Name) {
    // trackCustomEvent('Filter Changed', {
    //     "companyId": companyId.toString(),
    //     "userId": userId.toString(),
    //     "dashboardId": dashboardId.toString(),
    //     "reportName": $('.reportTitle').text(),
    //     "filterName": filter_Name,
    //     "filterValue": filterValue
    // });
}
//sent payload to parent iframe
function sendMsgtoParent(payload) {
   console.log(payload);
    window.parent.postMessage(payload, '*');
}

//payload send to app insight
function createPayload(vieName){
    // let properties = {
    //     "companyId": companyId.toString(),
    //     "userId": userId.toString(),
    //     "dashboardId": dashboardId.toString(),
    //     "reportName": vieName 
    // };
    return "properties";
}
// when user click csv download button 
function csvDownloadClickTrack(tableName){    
        trackCustomEvent('Click CSV Download', {
            "companyId": companyId.toString(),
            "userId": userId.toString(),
            "dashboardId": dashboardId.toString(),
            "reportName": $('.reportTitle').text(),
            "tableName": tableName
            
        });
    }
// when csv download completed
    function csvDownloadCompletedTrack(tableName){    
        trackCustomEvent('CSV Download Completed', {
            "companyId": companyId.toString(),
            "userId": userId.toString(),
            "dashboardId": dashboardId.toString(),
            "reportName": $('.reportTitle').text(),
            "tableName": tableName
            
        });
    }


// $(document).on('visibilitychange mozvisibilitychange msvisibilitychange ', function () {
//     if ((document.hidden || document.mozHidden || document.msHidden || document.webkitHidden)) {
//         appInsiteTimeTrackingTabClose();
//     } else {
//         appInsiteTimeTrackingTabSwitch();
//     }
// });
