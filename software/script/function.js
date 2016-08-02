var names = [];

var allSeat = 20;

var timeLabel = $('#time-div');
var dateLabel = $('#date-div')
var temperatureLabel = $('#temp-div');

var totalLabel = $('#total-div');

var enterLabel = $('#enter-div');
var reserveLabel = $('#reserve-div');
var leaveLabel = $('#leave-div');

var customerNameInput = ($('#customerName-input'));

var reserveBtn = $('#reserve-btn');
var cancelBtn = $('#cancel-btn');

var enterPerson = 0;
var reservePerson = 0;
var leavePerson = 0;

var seatLeft = 0;

setInterval(function() {
    var date = new Date();
    timeLabel.html("<center>" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "</center>");
    dateLabel.html("<center>" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "</center>");
}, 1000);

setInterval(function() {
    $.ajax({
        url: 'http://10.32.176.4/Exponential'
    }).done(function(data) {
        // TODO: add temperature to here
        temperatureLabel.html();
    });
}, 10000);

customerNameInput.keyup(function(e) {
    e.preventDefault();
    if (e.which == 8) {
        if (customerNameInput.val() === "") {
            disabledButton(reserveBtn, true);
            disabledButton(cancelBtn, true);
        } else {
            disabledButton(reserveBtn, false);
            disabledButton(cancelBtn, false);
        }
    } else {
        if (customerNameInput.val() === "") {
            disabledButton(reserveBtn, true);
            disabledButton(cancelBtn, true);
        } else {
            disabledButton(reserveBtn, false);
            disabledButton(cancelBtn, false);
        }
    }
});

var goIn = function() {
    enterPerson += 1;
    seatLeft = allSeat - ((enterPerson + reservePerson) - leavePerson);
    enterLabel.html(enterPerson);
    totalLabel.html(seatLeft);
}

var goOut = function() {
    numLeaave += 1;
    seatLeft = allSeat - ((enterPerson + reservePerson) - leavePerson);
    leaveLabel.html(leavePerson);
    totalLabel.html(seatLeft);
}

var reserveF = function(name) {
    reserveList[reservePerson] = name;
    reservePerson += 1;
    seatLeft -= 1;
}

var cancelF = function(index) {
    reserveList[index] = "";
    reservePerson -= 1;
    seatLeft += 1;
}

var disabledButton = function(button, disabled) {
    if (disabled) {
        button.attr("disabled", true);
    } else {
        button.removeAttr("disabled");
    }
}

reserveBtn.click(function() {
    if (seatLeft != 0) {
        var name = customerNameInput.val();
        reserveF(name);
    } else {
        alert("no seat left");
    }
});
