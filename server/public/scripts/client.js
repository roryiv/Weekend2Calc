class Calculation {
    constructor(x, y, operator) {
        this.x = x;
        this.y = y;
        this.op = operator;
    }

    reset() {
        this.x = '';
        this.y = '';
    }
}

let toCalc = new Calculation();
let opSelected = false;

$(document).ready(function () {
    toCalc.reset();
    refreshHistory();
    $('#equals').on('click', calculate);
    $('.number').on('click', numberHandler);
    $('.operation').on('click', operationHandler);
    $('#clear').on('click', clear);
});

function calculate() {
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: toCalc
    })
        .then(function (response) {
            console.log(response);
            refreshHistory();
        });

    $.ajax({
        type: 'GET',
        url: '/solution'
    })
        .then(function (response) {
            updateCalcDisplay(response);
        });

    toCalc.reset();
    opSelected = false;
}

function refreshHistory() {
    $.ajax({
        type: 'GET',
        url: '/history'
    })
        .then(function (response) {
            $('#calculationHistory').empty();
            for (let object of response) {
                $('#calculationHistory').prepend(
                    `<li>${object.x} ${object.op} ${object.y}</li>`)
            }
        });
}

function numberHandler() {
    if (!opSelected) {
        toCalc.x += $(this).attr('id');
        updateCalcDisplay(toCalc.x);
    }
    else if (opSelected) {
        toCalc.y += $(this).attr('id');
        updateCalcDisplay(`${toCalc.x} ${toCalc.op} ${toCalc.y}`)
    }
}

function operationHandler() {
    toCalc.op = $(this).attr('id');
    opSelected = true;
    updateCalcDisplay(`${toCalc.x} ${toCalc.op}`);
}

function clear() {
    toCalc.reset();
    opSelected = false;
    $('#calculationData').empty();
}

function updateCalcDisplay(toDisplay) {
    $('#calculationData').empty();
    $('#calculationData').append(`<p>${toDisplay}</p>`);
}