from flask import Flask

import folium

frontend = Flask(__name__)


@frontend.route('/')
def index():
    # start_coords = [46.9540700, 142.7360300]
    # folium_map = folium.Map(location=start_coords, zoom_start=14)
    # folium.PolyLine(locations=[[10.89167, 76.99085], [11.02682, 76.93035]]).add_to(folium_map)
    # # folium.Marker([46.9540700, 142.7360300], popup='Yakutsk', icon=folium.Icon(color='red', icon='home')).add_to(folium_map)
    return "HEllo OWorld <h1>HEllo OWorld</h1>"


if __name__ == '__main__':
    frontend.run(debug=True)