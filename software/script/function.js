var names = [];

var timeLabel = $('#time-div');
var dateLabel = $('#date-div')
var temperatureLabel = $('#temp-div');

var totalLabel = $('#total-div');

var enterLabel = $('#enter-div');
var reserveLabel = $('#reserve-div');
var leaveLabel = $('#leave-div');

var customerText = ($('#customerName-input')).val();

var reserveBtn = $('#reserve-btn');
var cancelBtn = $('#cancel-btn');

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

var enterF = function() {
    numEnter += 1;
    numSeat = 20 - numEnter + numLeave;
    enter.html(numEnter);
    seat.html(numSeat);
}

var leaveF = function() {
    numLeaave += 1;
    numSeat = 20 - numEnter + numLeave;
    leave.html(numLeaave);
    seat.html(numSeat);
}

var reserveF = function(name) {
    reserveList[numReserve] = name;
    numReserve += 1;
    numSeat -= 1;
}

var cancelF = function(index) {
    reserveList[index] = "";
    numReserve -= 1;
    numSeat += 1;
}

reserveBtn.click(function() {
    if (numSeat !== 0) {
        var name = inputName.val();
        reserveF(name);
    } else {
        alert("no seat left");
    }
});
