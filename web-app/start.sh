#!/bin/sh

cd /opt/cheese
cherryd -d -e production -p /var/run/cheese.pid -i cheese
