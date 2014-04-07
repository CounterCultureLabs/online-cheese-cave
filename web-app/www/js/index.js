
// Online Cheese Cave client side Javascript
// Copyright 2014 Marc Juul <juul@sudomesh.org>
// License: AGPLv3

var app = {

  run: function() {
    this.update();
  },

  update: function() {
    $.ajax({
      url: '/get_sensor_data',
      dataType: 'json',
      success: this.got_sensor_response.bind(this),
      error: this.ajax_error.bind(this)
    });
  },

  ajax_error: function(jqXHR, err) {
    console.log("ajax error: " + err);
  },
 
  got_sensor_response: function(o) {
    if(!o || (o.status != 'success')) {
       console.log("Error getting sensor data");
       return;
    }
    this.got_sensor_data(o.data);
  },

  got_sensor_data: function(o) {
    if(!o || !o.humidity || !o.temperature) {
      console.log("Got sensor response but mising required data");
      return;
    }
    $('#temp').html(o.temperature+' &#176;C');
    $('#humid').html(o.humidity+'%');

    var d = new Date();
    var h = d.getHours();
    h = (h < 10) ? '0'+h : h;
    var m = d.getMinutes();
    m = (m < 10) ? '0'+m : m;
    var s = d.getSeconds();
    s = (s < 10) ? '0'+s : s;

    $('#updated').html(h+':'+m+':'+s);

    setTimeout(this.update.bind(this), 100);
  },

};





app.run();
