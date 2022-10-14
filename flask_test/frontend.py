from flask import Flask, render_template, request
import folium
import requests as req
import json
import numpy as np


loc_x = np.array([])

url = "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi"

querystring = {"address":"215, sukrawarpet street, coimbatore, 641001"}

headers = {
	"X-RapidAPI-Key": "954bd9e800mshf505c10f126c98dp193b7cjsnf78c048d56c5",
	"X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com"
}

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html') 



@app.route('/geocode', methods=['POST', 'GET'])
def geocode():
    if request.method == 'POST':
        address = request.form.get('address')
        querystring = {"address":address}
        response = req.request("GET", url, headers=headers, params=querystring)
        np.append(loc_x, int(json.loads(response.text)["Results"][0]['longitude']))
        print(loc_x)
        return render_template('index.html')
        

@app.route('/map')
def flask_map():
    start_coords = (46.9540700, 142.7360300)
    folium_map = folium.Map(location=start_coords, zoom_start=14)
    return folium_map._repr_html_()


if __name__ == '__main__':
    app.run(debug=True) 