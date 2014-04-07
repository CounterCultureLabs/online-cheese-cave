#!/usr/bin/python

import re
import serial
import cherrypy

ser = serial.Serial('/dev/ttyS0', 9600)

class CheeseServer(object):
  # search for static files first
  _cp_config = {
    'tools.staticdir.on': True,
    'tools.staticdir.dir': '/opt/cheese/www',
    'tools.staticdir.index': 'index.html'
  }

  @cherrypy.expose
  def get_sensor_data(self):
    ser.write("r")
    line = ser.readline()
    if line and (len(line) > 0):
      m = re.match("<(\d+\.?\d*)\|(\d+\.?\d*)>", line)
      if not m or (len(m.groups()) < 2):
        return '{"status": "error", "msg": "Got invalid data from arduino"}'

      humidity = m.group(1)
      temperature = m.group(2)
      return '{"status": "success", "data": {"humidity": '+humidity+', "temperature": '+temperature+'}}'

    else:
      return '{"status": "error", "msg": "Error talking to arduino"}'

config = {
  # no config needed
}

# global config
cherrypy.config.update({
  'server.socket_host': '0.0.0.0',
  'server.socket_port': 80
})

cherrypy.tree.mount(CheeseServer(), config=config)
