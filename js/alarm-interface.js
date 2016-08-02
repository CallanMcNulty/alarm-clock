alarmOn = false;
alarms = [];
$(document).ready(function(){
  showTime();
  $("#set-alarm").submit(function(event) {
    event.preventDefault();
    alarms.push(moment({h:$("#hours").val(), m:$("#minutes").val(), s:$("#seconds").val()}) );
  });
  $("#disable").click(function() {
    alarmOn = false;
    $("#time").removeClass("alarm-on");
    $("#disable").hide();
    $("#snooze").hide();
  });
  $("#snooze").submit(function(event) {
    event.preventDefault();
    alarmOn = false;
    $("#time").removeClass("alarm-on");
    $("#disable").hide();
    $("#snooze").hide();
    var seconds = parseInt($("#snseconds").val());
    console.log(typeof seconds);
    var snoozeAlarm = moment({h:moment().hour()+ parseInt($("#snhours").val()), m:moment().minute() + parseInt($("#snminutes").val()), s:moment().second()+parseInt($("#snseconds").val())})
    alarms.push(snoozeAlarm);
  });
});

var showTime = function() {
  setTimeout(function() {
    $('#time').text(moment());
    showTime();
    $("#alarm").empty();
    for(var i=0; i<alarms.length; i++) {
      alarmTime = alarms[i];
      $("#alarm").append("<li>"+alarmTime.toString()+"</li>");
      if(alarmTime != null) {
        if( moment().second()===alarmTime.second() &&
            moment().minute()===alarmTime.minute() &&
            moment().hour()===alarmTime.hour()) {
          alarmOn = true;
          alarms.splice(i,1);
          i--;
        }
      }
    }
    if(alarmOn) {
      $("#disable").show();
      $("#snooze").show();
      $("#time").addClass("alarm-on");
    }
  }, 1000);
}
