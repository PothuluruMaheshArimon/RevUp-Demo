var currentLocation = document.URL;
//var currentLocation = "https://api-uat.digilytics.solutions/bim/api/v1/dashboard/91/report/191"
var matches = currentLocation.split("/");
var companyId = matches[7];
var dashboardId = matches[9];
// $("#companyId").val(companyId);
// $("#dashboardId").val(dashboardId);
var instrumentationKey;
var userId ;
var allowedEmailDomains;
var baseURL;
var chatURL;
var restBaseURL;

$(document).ready(function () {
$.ajax({     
    type: "GET",
    url: getDashboardApiDomain(),
    ajax:false,
    success: (function (data) {
        instrumentationKey = data[0].instrumentationKey;
        allowedEmailDomains = data[0].allowedEmailDomains;
        baseURL = data[0].baseURL;
        chatURL = data[0].chatURL;
        restBaseURL = data[0].restBaseURL;
        //appInsightStartPage();
        $("#userId").val(data[0].userId);
        $("#baseURL").val(data[0].baseURL);
        $("#restBaseURL").val(data[0].restBaseURL);
        $("#chatURL").val(data[0].chatURL);
        $("#allowedEmailDomains").val(data[0].allowedEmailDomains);
        userId = $("#userId").val();
        allowedEmailDomains =$("#allowedEmailDomains").val();
        baseURL=  $("#baseURL").val();
        chatURL = $("#chatURL").val();
        restBaseURL = $("#restBaseURL").val();
        userId = data[0].userId;
        allowedEmailDomains =data[0].allowedEmailDomains;
        baseURL=  data[0].baseURL;
        chatURL = data[0].chatURL;
        restBaseURL = data[0].restBaseURL;
        getLastRefreshedDate(); //ON LOAD CALL
        appInsightLoad();     
        shareDataAPIPreCall();   
        }),
        error: (function (err) {
        if(err.status == 404){
                $(".mainContent").html("<p><h3  style='text-align: center; color: #e7875c;'>Server is down due to regular maintenance activities by our experts. Regret for inconvenience caused. Please access the dashboards again in a while ! </h3></p>");
            }
            console.log(err);
        })
    });
});


function getDashboardApiDomain() {
    let host = window.location.host.toLowerCase();
    host = host.replace("www.", "");
    if (host == "" || host.indexOf('localhost') !== -1) {
        return "https://api-uat.digilytics.solutions/bim/api/v1/235/dashboard-embed-details/dashboard-info/292";
    }

    //let companyId = $("#companyId").val();
    if (!companyId || companyId == '') {
        alert("Company Id is is required");
        return null;
    }
    return "https://"+host+"/bim/api/v1/"+companyId+"/dashboard-embed-details/dashboard-info/"+dashboardId;
}

function appInsightLoad(){
    var sdkInstance = "appInsightsSDK"; window[sdkInstance] = "appInsights"; var aiName = window[sdkInstance], aisdk = window[aiName] || function (e) { function n(e) { t[e] = function () { var n = arguments; t.queue.push(function () { t[e].apply(t, n) }) } } var t = { config: e }; t.initialize = !0; var i = document, a = window; setTimeout(function () { var n = i.createElement("script"); n.src = e.url || "https://az416426.vo.msecnd.net/scripts/b/ai.2.min.js", i.getElementsByTagName("script")[0].parentNode.appendChild(n) }); try { t.cookie = i.cookie } catch (e) { } t.queue = [], t.version = 2; for (var r = ["Event", "PageView", "Exception", "Trace", "DependencyData", "Metric", "PageViewPerformance"]; r.length;)n("track" + r.pop()); n("startTrackPage"), n("stopTrackPage"); var s = "Track" + r[0]; if (n("start" + s), n("stop" + s), n("setAuthenticatedUserContext"), n("clearAuthenticatedUserContext"), n("flush"), !(!0 === e.disableExceptionTracking || e.extensionConfig && e.extensionConfig.ApplicationInsightsAnalytics && !0 === e.extensionConfig.ApplicationInsightsAnalytics.disableExceptionTracking)) { n("_" + (r = "onerror")); var o = a[r]; a[r] = function (e, n, i, a, s) { var c = o && o(e, n, i, a, s); return !0 !== c && t["_" + r]({ message: e, url: n, lineNumber: i, columnNumber: a, error: s }), c }, e.autoExceptionInstrumented = !0 } return t }(
        {
            instrumentationKey: instrumentationKey,
            autoTrackPageVisitTime: true,
            overridePageViewDuration: true
        }); window[aiName] = aisdk, aisdk.queue && 0 === aisdk.queue.length && aisdk.trackPageView({});
    
 }

// function trackCustomEvent(eventName, payload) {
//     // window.appInsights.trackEvent({name:"Full Screen Event Clicked"}, {"companyId":companyId.toString(),"userId":userId.toString(),"dashboardId":dashboardId.toString(),"reportName":reportTitle.toString(),"pageName":currentPageName.toString()});
//     window.appInsights.trackEvent({ name: eventName }, payload);
// }

// function trackCustomPageLoadEvent(eventName, payload) {
//     // window.appInsights.trackEvent({name:"Full Screen Event Clicked"}, {"companyId":companyId.toString(),"userId":userId.toString(),"dashboardId":dashboardId.toString(),"reportName":reportTitle.toString(),"pageName":currentPageName.toString()});
//     window.appInsights.trackEvent({ name: eventName }, payload);
// }

let lastRefreshedMonth;
    function getLastRefreshedDate(){
 
            $.ajax({
                url: getApiDomain(),
                type: 'POST',
                data: JSON.stringify({ 'filter': "Last_Refresh_Date_v2"}),
                success: (function (resultData) {
                    let dateString = resultData.data.data[0];
                    var parts = dateString[0].Max_Date.split('-');
                    lastRefreshedMonth = dateString[0].Month_Num_Fy;
                    if(parts.length != 3){
                        $("#lastRefreshedDateId").text(dateString);
                        $("#lastRefreshedDateIdIn").text(dateString);
                        return;
                    }
                    var displayDate = parts[2]+"/"+parts[1]+"/"+parts[0];
                    $("#lastRefreshedDateId").text(displayDate);
                    $("#lastRefreshedDateIdIn").text(displayDate);
                }),
                error: (function (err) {
                    console.log(err);
                })
            });
    }




    function get_cookies_array() {

        if (document.cookie && document.cookie != '') {
            var split = document.cookie.split(';');
            for (var i = 0; i < split.length; i++) {
                var name_value = split[i].split("=");
                name_value[0] = name_value[0].replace(/^ /, '');
                cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
            }
        }
    
        return cookies;
        
        }