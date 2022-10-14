
from flask import Flask, render_template, request
import folium

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html') 



@app.route('/geocode')
def geocode():
    if request.method == 'GET':
        address = request.form.get('address')
        return "address: "+ address
        

@app.route('/map')
def flask_map():
    start_coords = (46.9540700, 142.7360300)
    folium_map = folium.Map(location=start_coords, zoom_start=14)
    return folium_map._repr_html_()


if __name__ == '__main__':
    app.run(debug=True) 