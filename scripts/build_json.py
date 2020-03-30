#!/usr/bin/python

import json
import requests
import os

api_location = "https://us-central1-openousd.cloudfunctions.net/openousd"
base_path = api_location + "/api"

data_path = os.path.join(os.path.dirname(__file__), "../data/")

# Get department data
response = requests.get(base_path + "/central-programs")
with open(data_path + "central-programs.json","w+") as f:
    json.dump(response.json(),f, indent=2)

# Get resource data for central programs
response = requests.get(base_path + "/central-programs/resources")
with open(data_path + "central-programs-resources.json","w+") as f:
    json.dump(response.json(),f, indent=2)

# Get sankey data (no grouping)
response = requests.get(base_path + "/sankey?year=2018")
with open(data_path + "sankey.json","w+") as f:
    json.dump(response.json(),f, indent=2)

# Get sankey data (restricted / unrestricted grouping)
response = requests.get(base_path + "/sankey?year=2018&groupBy=restricted")
with open(data_path + "sankey-restricted.json","w+") as f:
    json.dump(response.json(),f, indent=2)
