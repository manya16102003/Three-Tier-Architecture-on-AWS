// Add your API endpoint here below
var API_ENDPOINT = "https://pzwl8pjjob.execute-api.us-east-1.amazonaws.com/2ND";

// AJAX POST REQUEST
document.getElementById("saveprofile").onclick = function () {
  var inputData = {
    "empId": $('#empid').val(),
    "empFirstName": $('#fname').val(),
    "empLastName": $('#lname').val(),
    "empAge": $('#empage').val()
  };

  $.ajax({
    url: API_ENDPOINT,
    type: 'POST',
    data: JSON.stringify(inputData),
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      document.getElementById("profileSaved").innerHTML = "Profile Saved!";
    },
    error: function (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  });
};

// AJAX GET REQUEST
document.getElementById("getprofile").onclick = function () {
  $.ajax({
    url: API_ENDPOINT,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      // Clear existing rows from the table
      $('#employeeProfile tbody').empty();

      // Append new rows based on the API response
      jQuery.each(response, function (i, data) {
        $("#employeeProfile tbody").append("<tr> \
          <td>" + data['empId'] + "</td> \
          <td>" + data['empFirstName'] + "</td> \
          <td>" + data['empLastName'] + "</td> \
          <td>" + data['empAge'] + "</td> \
          </tr>");
      });
    },
    error: function (error) {
      console.error("Error fetching profiles:", error);
      alert("Error fetching profiles. Please try again.");
    }
  });
};
