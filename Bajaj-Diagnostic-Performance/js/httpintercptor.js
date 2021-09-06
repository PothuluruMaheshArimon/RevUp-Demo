$.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb3Jhc2VseS04Mzk0QHlvcG1haWwuY29tIiwianRpIjoiMzYxIiwiYXV0aCI6IlJPTEVfQ09ORklHVVJFUiIsImNvbXBhbnlJZCI6IjExMCIsInNlc3Npb25JZCI6IjRkMzQ4YTM1NWJiZDQ1OTM4MjA3MzNmZDY4ZGJlYmQ5IiwiZXhwIjoxNjMxMjQxMDU4fQ.SDh8k-KQ9g_ncjKF2DeAsKsPN20AAcN4fZRIHgFyV85l-J9KEUb6oPNIblvC0UCSfqrDFmUEOpDwAYL0ULZziA');
        xhr.setRequestHeader('Content-type', 'application/json');
    }
});
