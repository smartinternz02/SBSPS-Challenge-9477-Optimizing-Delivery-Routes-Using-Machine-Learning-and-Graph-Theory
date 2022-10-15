from flask import Flask, render_template, request
import folium
import requests as req
import json
from flask_cors import CORS
import jsonify


#api key and header for geocoding
url = "https://trueway-geocoding.p.rapidapi.com/Geocode"

headers = {
	"X-RapidAPI-Key": "954bd9e800mshf505c10f126c98dp193b7cjsnf78c048d56c5",
	"X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com"
}

loc_x = []
loc_y = []

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return {"name": "John", "age": 30}

@app.route('/geocode', methods=['POST', "GET"])
def geocode():
    if request.method == 'POST':
        data = request.get_json()
        address = data['address']
        print(address)
        querystring = {"address":address,"language":"en"}
        response = req.request("GET", url, headers=headers, params=querystring)
        long = float(json.loads(response.text)["results"][0]['location']['lng'])
        lat = float(json.loads(response.text)["results"][0]['location']['lat'])
        loc_x.append(long)
        loc_y.append(lat)
        print(loc_x, loc_y)
    return {"longitude": loc_x, "latitude": loc_y} 


if __name__ == '__main__':
    app.run(debug=True) 