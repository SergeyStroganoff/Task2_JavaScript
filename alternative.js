
createTable(document.getElementById('mainTablePart'), myStatementData);
function createTable(tbody, array) {

    array.forEach(function(items) {
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdSurname = document.createElement('td');
        var tdPhone = document.createElement('td');

        tdName.innerText = items.data;
        tdSurname.innerText = items.type;
        tdPhone.innerText = items.amount;

        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdPhone);
        tbody.appendChild(tr);

    });

} //end createTable