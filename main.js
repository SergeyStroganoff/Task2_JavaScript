myStatementData.sort(function (a, b) {
    return new Date(a.date.toString()) - new Date(b.date.toString())
});

myStatementDataGroupedByData = [];
let data = null;
let count = 0;
for (let elem of myStatementData) {
    let datetime = new Date(elem.date.toString());
    let currentDate = datetime.toLocaleDateString()
    if (currentDate !== data) {
        data = elem.date;
        let inMoney = 0;
        let outMoney = 0;
        if (elem.amount > 0) {
            inMoney = elem.amount;
        } else {
            outMoney = elem.amount;
        }
        myStatementDataGroupedByData[count] = {dat: currentDate, in: inMoney, out: outMoney};
        count++;
    } else {
        if (elem.amount > 0) {
            myStatementDataGroupedByData[count].in += elem.amount;
        } else {
            myStatementDataGroupedByData[count].out -= elem.amount;
        }
    }
}

function changeDisplayStyleElements(elements, displayStyle) {
    for (let elem of elements) {
        elem.style.display = displayStyle;
    }
}

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


function makerGroupedTable() {
    let tbod = document.querySelector('tbody');
    for (let i = 0; i < myStatementDataGroupedByData.length; i++) {
        let tr = document.createElement('tr');
        let into = myStatementDataGroupedByData[i].in;
        let out = myStatementDataGroupedByData[i].out;
        let dat = myStatementDataGroupedByData[i].dat;
        tr.innerHTML = buildTableString(dat, into, out);
        tbod.appendChild(tr);
    }
}

makeTable(buildTableString());

let numberUncheckedCheckbox = 0;
var numberDisabledCheckbox = -1;
var typeCheckbox = document.querySelector('input[value="type"]');
var timeCheckbox = document.querySelector('input[value="time"]');
var dataCheckbox = document.querySelector('input[value="data"]');
var arrivalCheckbox = document.querySelector('input[value="arrival"]');
var spendingCheckbox = document.querySelector('input[value="spending"]');
var selector = document.getElementById("selector");
var optionSelectorGroupedByData = document.querySelector('option[value="groupedByData"]');
var optionSelectorNotGrouped = document.querySelector('option[value="no_grouped"]');
let checkBoxArray = [typeCheckbox, timeCheckbox, dataCheckbox, arrivalCheckbox, spendingCheckbox];


function changeElementDisplay(elementArray, checkbox) {
    if (!checkbox.checked) {
        for (let elem of elementArray) {
            elem.style.display = "none";
        }
        numberUncheckedCheckbox++;
        if (numberUncheckedCheckbox === 4) {
            for (let n = 0; n < checkBoxArray.length; n++) {
                if (checkBoxArray[n].checked) {
                    checkBoxArray[n].disabled = true;
                    numberDisabledCheckbox = n;
                }
            }
        }
    } else {
        for (let elem of elementArray) {
            elem.style.display = "";
        }
        numberUncheckedCheckbox--;
        if (numberDisabledCheckbox > -1) {
            checkBoxArray[numberDisabledCheckbox].disabled = false;
            numberDisabledCheckbox = -1;
        }
    }
}

function eraseTableBody() {
    let table = document.querySelector('tbody');
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

function transformTable() {
    let tableRowElements = document.querySelectorAll('.row1');
    changeDisplayStyleElements(tableRowElements, "none");
    tableRowElements = document.querySelectorAll('.row2');
    changeDisplayStyleElements(tableRowElements, "none");
    eraseTableBody();
    makerGroupedTable();
    checkboxSwitchOff(true);
}

function makeFullTable() {
    let tableRowElements = document.querySelectorAll('.row1');
    changeDisplayStyleElements(tableRowElements, "");
    tableRowElements = document.querySelectorAll('.row2');
    changeDisplayStyleElements(tableRowElements, "");
    eraseTableBody();
    makeTable();
    checkboxSwitchOff(false);
}

function checkboxSwitchOff(bool) {
    for (let checkBox of checkBoxArray) {
        checkBox.disabled = bool;
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

selector.addEventListener('change', () => {
    if (optionSelectorGroupedByData.selected) {
        transformTable();
        optionSelectorNotGrouped.selected = false;
    }
    if (optionSelectorNotGrouped.selected) {
        makeFullTable();
        optionSelectorGroupedByData.selected = false;
    }
});