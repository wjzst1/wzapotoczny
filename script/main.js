// This function retrieves issues from the Local Storage.
function fetchIssues () {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');
  
  issuesList.innerHTML = '';
  
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    
    
    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}
// This is an event handler to the submit event portion of the form.
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// This function saves the issues when submitted, with each of the identifiers.
function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }
  
  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  
  document.getElementById('issueInputForm').reset();
 
  fetchIssues();
  
  e.preventDefault(); 
}

<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>

// This function sets the status of the issue to Closed.
function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>

// Another button is generated for each issue item.
function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  // The Splice method is used to delete the current item from the array issues.
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  // This function is run again to update the list output.
  fetchIssues();
}
