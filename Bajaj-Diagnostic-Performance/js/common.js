function getApiDomain() {

    let host = window.location.host.toLowerCase();
    host = host.replace("www.", "");
    if (host == "" || host.indexOf('localhost') !== -1) {
        return "https://api-uat.digilytics.solutions/reporting-service/api/v1/227/chart/data?isRoleBased=true";
    }
    var currentLocation1 = window.location.href;
    var matches = currentLocation1.split("/");
     var companyId1 = matches[7];
    var dashboardId1 = matches[9];
   // let companyId = $("#companyId").val();
    if (!companyId1 || companyId1 == '') {
        alert("Company Id is is required");
        return null;
    }
    return "https://" + host + "/reporting-service/api/v1/" + companyId1 + "/chart/data?isRoleBased=true";
}



var global_debounceTime = 2000;
const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}


function cTageHash(ProcedureNameAndPayload){
    let hashkey = CryptoJS.MD5(ProcedureNameAndPayload).toString();
    console.log('hashkey - '+hashkey)
    return  hashkey;
}