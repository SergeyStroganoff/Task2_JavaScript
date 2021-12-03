//let tbody = document.querySelector('tbody');
var tbod = document.querySelector('tbody');
for (var i = 0; i < myStatementData.length; i++) {
    let tr = document.createElement('tr');
    let datetime = new Date(myStatementData[i].date.toString());
    let data = datetime.toLocaleDateString();
    let time = datetime.toLocaleTimeString();
    let into = "";
    let out = "";
    if (myStatementData[i].amount > 0) {
        into = myStatementData[i].amount;
    } else out = myStatementData[i].amount;
    tr.innerHTML =
        '<td>' + data + '</td>' +
        '<td>' + time + '</td>' +
        '<td>' + myStatementData[i].type + '</td>' +
        '<td>' + into + '</td>' +
        '<td>' + out + '</td>';
    tbod.appendChild(tr);
}

function simple(){
    alert("Do not touch")
}

