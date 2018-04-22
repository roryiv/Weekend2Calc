class Calculation {
    constructor(x, y, operator) {
        this.x = x;
        this.y = y;
        this.op = operator;
    }

    reset() {
        this.x = '';
        this.y = '';
        this.op = '=';
    }
}
//initialize an object to store calculation data to send to server
let toCalc = new Calculation();
//initialize a boolean to switch between writing to x and writing to y
let opSelected = false;

$(document).ready(function () {
    toCalc.reset();
    refreshHistory();
    $('#equals').on('click', calculate);
    $('.number').on('click', numberHandler);
    $('.operation').on('click', operationHandler);
    $('#clear').on('click', clear);
    $('#deleteHistoryButton').on('click', byeHistory);
    $('#calculationHistory').on('click', '.calc', reCalculate);
});

function calculate() {
    //check for weird inputs
    if (toCalc.x == '') {
        toCalc.x = 0;
    }
    if (toCalc.y == '' && toCalc.op != '=') {
        toCalc.y = 0;
    }

    //send object to server for processing
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: toCalc
    })
    .then(function (response) {
        console.log(response);
        refreshHistory();
    });

    //obtain solution from server and display on DOM
    $.ajax({
        type: 'GET',
        url: '/solution'
    })
    .then(function (response) {
        updateCalcDisplay(response);
    });

    //reset the object for next calculation
    toCalc.reset();
    opSelected = false;
}

function reCalculate() {
    //get the calculation that was clicked and parse it
    let data = $(this).text().split(' ');

    //package data into a Calculation object with our recycled variable name
    toCalc.x = data[0];
    toCalc.op = data[1];
    toCalc.y = data[2];

    //calculate it as usual
    calculate();
}

function refreshHistory() {
    //ask server for history and display on DOM
    $.ajax({
        type: 'GET',
        url: '/history'
    })
    .then(function (response) {
        $('#calculationHistory').empty();
        for (let object of response) {
            $('#calculationHistory').prepend(
                `<li class="calc">${object.x} ${object.op} ${object.y}</li>`);
        }
    });
}

function byeHistory() {
    //delete history from server and clear display from DOM
    $.ajax({
        type: 'DELETE',
        url: '/history'
    })
    .then(function (response) {
        console.log(response);
        refreshHistory();
    });
}

function numberHandler() {
    //update the number on the DOM and in the object in real time as user clicks buttons
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
    //store information about which operation the user has selected and update DOM
    toCalc.op = $(this).attr('id');
    opSelected = true;
    updateCalcDisplay(`${toCalc.x} ${toCalc.op}`);
}

function clear() {
    //resets the calculation both on the DOM and in the client
    toCalc.reset();
    opSelected = false;
    $('#calculationData').empty();
    $('#calculationData').append('<p>0</p>');
}

function updateCalcDisplay(toDisplay) {
    //changes the calculator display on the DOM to whatever is passed in
    $('#calculationData').empty();
    $('#calculationData').append(`<p>${toDisplay}</p>`);
}