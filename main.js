const tbodyElement = document.querySelector('.table-body');
let numberUncheckedCheckbox = 0;
let numberDisabledCheckbox = -1;
const typeCheckbox = document.querySelector('.type-checkbox');
const timeCheckbox = document.querySelector('.time-checkbox');
const dataCheckbox = document.querySelector('.data-checkbox');
const arrivalCheckbox = document.querySelector('.arrival-checkbox');
const spendingCheckbox = document.querySelector('.spending-checkbox');
const selector = document.getElementById("selector");
const optionSelectorGroupedByData = document.querySelector('#grouped');
const optionSelectorNotGrouped = document.querySelector('#no_grouped');
const checkBoxArray = [typeCheckbox, timeCheckbox, dataCheckbox, arrivalCheckbox, spendingCheckbox];

myStatementData.sort(function (a, b) {
    return new Date(a.date.toString()) - new Date(b.date.toString())
});


groupedByData = [];
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
        groupedByData[count] = {dat: currentDate, in: inMoney, out: outMoney};
        count++;
    } else {
        if (elem.amount > 0) {
            groupedByData[count].in += elem.amount;
        } else {
            groupedByData[count].out -= elem.amount;
        }
    }
}

function changeDisplayStyleElements(elements, displayStyle) {
    for (let elem of elements) {
        elem.style.display = displayStyle;
    }
}

function buildTableBodyAllRows() {
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
        tr.innerHTML = buildTableColumns(data, time, type, into, out);
        tbodyElement.appendChild(tr);
    }
}

function buildTableColumns() {
    let htmlString = "";
    for (let i = 0; i < arguments.length; i++) {
        let className;
        switch (i) {
            case 0: {
                className = 'data-row';
                break;
            }
            case 1: {
                className = 'time-row';
                break;
            }
            case 2: {
                className = 'type-row';
                break;
            }
            case 3: {
                className = 'arrival-row';
                break;
            }
            case 4: {
                className = 'spending-row';
                break;
            }
        }
        htmlString += '<td class=' + className + '>' + arguments[i] + '</td>';
    }
    return htmlString;
}


function makerGroupedTable() {
    for (let i = 0; i < groupedByData.length; i++) {
        let tr = document.createElement('tr');
        let into = groupedByData[i].in;
        let out = groupedByData[i].out;
        let dat = groupedByData[i].dat;
        tr.innerHTML = buildTableColumns(dat, into, out);
        tbodyElement.appendChild(tr);
    }
}

buildTableBodyAllRows(buildTableColumns());


function changeElementDisplay(elementArray, checkbox) {
    if (!checkbox.checked) {
        selector.disabled = true;
        for (let nextElement of elementArray) {
            nextElement.style.display = "none";
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
        for (let nextElement of elementArray) {
            nextElement.style.display = "";
        }
        numberUncheckedCheckbox--;
        if (numberUncheckedCheckbox === 0) {
            selector.disabled = false;
        }
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

function makeGroupedTable() {
    let tableRowElements = document.querySelectorAll('.time-row');
    changeDisplayStyleElements(tableRowElements, "none");
    tableRowElements = document.querySelectorAll('.type-row');
    changeDisplayStyleElements(tableRowElements, "none");
    eraseTableBody();
    makerGroupedTable();
    checkboxSwitchOff(true);
}

function makeFullTable() {
    let tableRowElements = document.querySelectorAll('.time-row');
    changeDisplayStyleElements(tableRowElements, "");
    tableRowElements = document.querySelectorAll('.type-row');
    changeDisplayStyleElements(tableRowElements, "");
    eraseTableBody();
    buildTableBodyAllRows();
    checkboxSwitchOff(false);
}

function checkboxSwitchOff(bool) {
    for (let checkBox of checkBoxArray) {
        checkBox.disabled = bool;
    }
}


dataCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.data-row');
    changeElementDisplay(elements, dataCheckbox);
});

timeCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.time-row');
    changeElementDisplay(elements, timeCheckbox);
});

typeCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.type-row');
    changeElementDisplay(elements, typeCheckbox);
});

arrivalCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.arrival-row');
    changeElementDisplay(elements, arrivalCheckbox);
});

spendingCheckbox.addEventListener('change', () => {
    let elements = document.querySelectorAll('.spending-row');
    changeElementDisplay(elements, spendingCheckbox);
});

selector.addEventListener('change', () => {
    if (optionSelectorGroupedByData.selected) {
        makeGroupedTable();
    }
    if (optionSelectorNotGrouped.selected) {
        makeFullTable();
    }
});