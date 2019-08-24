function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issueList = document.getElementById('issues');
    issueList.innerHTML = '';
    if(issues){
        for(let i = 0; i < issues.length; i++){
            let id = issues[i].id;
            let desc = issues[i].description;
            let severity = issues[i].severity;
            let assignedTo = issues[i].assignedTo;
            var status = issues[i].status;
            issueList.innerHTML += '<div class="jumbotron">' + 
                '<h6>Issue ID:' + id + '</h6>' + 
                '<h5>' + status + '</h5>' +
                '<h3>' + desc + '</h3>' +
                '<h6>' + severity + ' ' + ' ' + '<i class="fa fa-user" aria-hidden="true"></i>' + assignedTo + '</h6>' +
                '<button class="close-btn" onclick="setStatusClosed(\''+id+'\')">Close</button>' +
                '<button class="del-btn" onclick="deleteIssue(\''+id+'\')">Delete</button>' +
            '</div>'
        }
    }    
}

document.getElementById('inputform').addEventListener('submit', saveIssue);
function saveIssue(event){
    let issueId = chance.guid();
    let issueDesc = document.getElementById('descid').value;
    let issueSeverity = document.getElementById('severityselect').value;
    let issueAssignedTo = document.getElementById('assignid').value;
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    if(localStorage.getItem('issues') === null){
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('inputform').reset()
    fetchIssues();
    event.preventDefault();
}

function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    for(let i = 0; i< issues.length; i++){
        if(issues[i].id === id){
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    for(let i = 0; i < issues.length; i++){
        if(issues[i].id === id){
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}