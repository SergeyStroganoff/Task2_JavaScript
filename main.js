myStatementData.sort(function (a, b) {
    return new Date(a.date.toString()) - new Date(b.date.toString())
});

function makeTable() {
    let tbod = document.querySelector('tbody');
    for (let i = 0; i < myStatementData.length; i++) {
        let tr = document.createElement('tr');
        let datetime = new Date(myStatementData[i].date.toString());
        let data = datetime.toLocaleDateString();
        let time = datetime.toLocaleTimeString();
        let type = myStatementData[i].type;
        let into = "";
        let out = "";
        if (myStatementData[i].amount > 0) {
            into = myStatementData[i].amount;
        } else out = myStatementData[i].amount;
        tr.innerHTML = buildTableString(data, time, type, into, out);
        tbod.appendChild(tr);
    }
}

function buildTableString() {
    let string = "";
    for (let i = 0; i < arguments.length; i++) {
        string += '<td class=row' + i + '>' + arguments[i] + '</td>';
    }
    return string;
}


makeTable(buildTableString());

var numberUncheckedCheckbox = 0;

var typeCheckbox = document.querySelector('input[value="type"]');
var timeCheckbox = document.querySelector('input[value="time"]');
var dataCheckbox = document.querySelector('input[value="data"]');
var arrivalCheckbox = document.querySelector('input[value="arrival"]');
var spendingCheckbox = document.querySelector('input[value="spending"]');

let checkBoxArray = [typeCheckbox, timeCheckbox, dataCheckbox, arrivalCheckbox, spendingCheckbox];


function changeElementDisplay(elementArray, checkbox) {
    if (!checkbox.checked) {
        for (let elem of elementArray) {
            elem.style.display = "none";
            numberUncheckedCheckbox++
        }
        for (let n = 0; n < checkBoxArray.length; n++) {
            if (checkBoxArray[n].getAttribute('value') === checkbox.getAttribute('value')) {
                 checkBoxArray.splice(n-1,1);
            }

            if (checkBoxArray.length === 1) {
                checkBoxArray[0].setAttribute("indeterminate", "true");
            }
        }
        alert(checkBoxArray.length);
    } else {
        for (let elem of elementArray) {
            elem.style.display = "";
            numberUncheckedCheckbox--;
        }
    }
}

dataCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.row0');
    changeElementDisplay(elements, dataCheckbox);
});

timeCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.row1');
    changeElementDisplay(elements, timeCheckbox);
});

typeCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.row2');
    changeElementDisplay(elements, typeCheckbox);
});

arrivalCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.row3');
    changeElementDisplay(elements, arrivalCheckbox);
});

spendingCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.row4');
    changeElementDisplay(elements, spendingCheckbox);
});