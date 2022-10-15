from flask import Flask, render_template, request
import folium
import requests as req
import json
import numpy as np
from docplex.mp.model import Model


loc_x = []
loc_y = []

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
        loc_x.append(float(json.loads(response.text)["Results"][0]['longitude']))
        loc_y.append(float(json.loads(response.text)["Results"][0]['latitude']))
        
        return render_template('index.html')
        

@app.route('/map')
def flask_map():
    start_coords = (46.9540700, 142.7360300)
    folium_map = folium.Map(location=start_coords, zoom_start=14)
    return folium_map._repr_html_()

@app.route('/route')
def flask_route():
    return displayRouteInMap()

def displayRouteInMap():

    rnd = np.random
    rnd.seed(0)

    #model contraints 
    n = 4
    Q = 500
    N = [i for i in range(1, n+1)]
    V = [0] + N
    q = {i: rnd.randint(1, 10) for i in N}


    #input
    loc_y= np.array([11.026829830511458, 11.000032289646322, 11.009194665389133, 10.89167346812154, 11.026996214865315])
    loc_x= np.array([76.93035690329974, 76.95381913315647, 76.95947192353994, 76.99085176956464, 76.94524171004645])

    #model
    mdl = Model('CVRP')
    A = [(i, j) for i in V for j in V if i != j]
    c = {(i, j): np.hypot(loc_x[i]-loc_x[j], loc_y[i]-loc_y[j]) for i, j in A}
    x = mdl.binary_var_dict(A, name='x')
    u = mdl.continuous_var_dict(N, ub=Q, name='u')

    mdl.minimize(mdl.sum(c[i, j]*x[i, j] for i, j in A))
    mdl.add_constraints(mdl.sum(x[i, j] for j in V if j != i) == 1 for i in N)
    mdl.add_constraints(mdl.sum(x[i, j] for i in V if i != j) == 1 for j in N)
    mdl.add_indicator_constraints(mdl.indicator_constraint(x[i, j], u[i]+q[j] == u[j]) for i, j in A if i != 0 and j != 0)
    mdl.add_constraints(u[i] >= q[i] for i in N)
    mdl.parameters.timelimit = 15
    solution = mdl.solve(log_output=True)

    #parth arcs
    active_arcs = [a for a in A if x[a].solution_value > 0.9]

    # create map
    m = folium.Map(location=[loc_y.mean(), loc_x.mean()], zoom_start=10)
    # add home 
    folium.Marker([loc_y[0], loc_x[0]], popup='Home', icon=folium.Icon(color='red', icon='home')).add_to(m)
    # add markers
    for i in N:
        folium.Marker([loc_y[i], loc_x[i]], popup=(loc_y[i], loc_x[i])).add_to(m)
    # add lines
    for i, j in active_arcs[:-1]:
        folium.PolyLine(locations=[[loc_y[i], loc_x[i]], [loc_y[j], loc_x[j]]], color='red', weight=2.5, opacity=1).add_to(m)
    return m._repr_html_()

if __name__ == '__main__':
    app.run(debug=True) 