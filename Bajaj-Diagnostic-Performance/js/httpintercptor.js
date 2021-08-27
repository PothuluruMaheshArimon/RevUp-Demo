$.ajaxSetup({
    beforeSend: function (xhr) {
     //   xhr.setRequestHeader('Authorization', 'Bearer-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb3Jhc2VseS04Mzk0QHlvcG1haWwuY29tIiwianRpIjoiMzYxIiwiYXV0aCI6IlJPTEVfQ09ORklHVVJFUiIsImNvbXBhbnlJZCI6IjExMCIsInNlc3Npb25JZCI6IjIyZWEyNTEwNGNlODRjNGRhNzgxMWQ4NTEyNjVhNGU5IiwiZXhwIjoxNjMwNDc4MjU4fQ.7SXRgkubUR-uFMc-2WKGEIEOrpcakaeCd1XM1ZDx8cazHfO1_3XdnP02g3zthSgcshG944yMgagDNEHkQYmaow');
        xhr.setRequestHeader('Content-type', 'application/json');
    }
});
