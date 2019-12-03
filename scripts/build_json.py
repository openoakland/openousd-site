#!/usr/bin/python

import json
import requests
import os

api_location = "https://us-central1-openousd.cloudfunctions.net/openousd"
base_path = api_location + "/api"

data_path = os.path.join(os.path.dirname(__file__), "../data/")

# Get department data
response = requests.get(base_path + "/departments")
with open(data_path + "departments.json","w+") as f:
    json.dump(response.json(),f, indent=2)
