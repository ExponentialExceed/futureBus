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

var reservePerson = 0;

var seatLeft = 0;

var obj = null;

setInterval(function() {
    // senter form {"temp":(), "enter":(),"leave":()}

    // server
    $.ajax({
        url: 'http://10.32.176.4/Exponential'
    }).done(function(data) {
        // TODO: add information to web
        obj = JSON.parse(data);
        seatLeft = (allSeat - ((obj.enter + reservePerson) - obj.leave));
        temperatureLabel.text(obj.temp + "°C");
        enterLabel.text("Enter: " + obj.enter);
        leaveLabel.text("Leave: " + obj.leave);
        totalLabel.text("Seat: " + seatLeft);
    });

    // time
    var date = new Date();
    timeLabel.text("Time: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    dateLabel.text("Date: " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
}, 1000);

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

reserveBtn.click(function() {
    if (seatLeft != 0) {
        var name = customerNameInput.val();
        reserveF(name);
        disabledButton(cancelBtn, false);
    } else {
        disabledButton(reserveBtn, true);
    }
    customerNameInput.val("");
});

cancelBtn.click(function() {
    if (reservePerson != 0) {
        var name = customerNameInput.val();
        cancelF(name);
        disabledButton(reserveBtn, false);
    } else {
        disabledButton(cancelBtn, true);
    }
    customerNameInput.val("");
});

var reserveF = function(name) {
    names[reservePerson++] = name;
    seatLeft -= 1;
    // update ui
    reserveLabel.text("Reserve: " + reservePerson);
    totalLabel.text("Seat: " + seatLeft);
}

var cancelF = function(name) {
    for (var i = 0; i < names.length; i++) {
        if (names[i] == name) {
            names.splice(i, 1);
            reservePerson -= 1;
            seatLeft += 1;
            // update ui
            reserveLabel.html("Reserve: " + reservePerson);
            totalLabel.html("Seat: " + seatLeft);
        }
    }
}

var disabledButton = function(button, disabled) {
    if (disabled) {
        button.attr("disabled", true);
    } else {
        button.removeAttr("disabled");
    }
}
