import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';


function Form() {
    // const [Address, setAddress] = useState('');

    const HandleClick = event => {
        event.preventDefault();
        var myParams = {
            address: document.getElementById('addressInput').value
        }
        // console.log(document.getElementById('addressInput').value);
        
        axios.post('/geocode', myParams)
            .then((res) =>{console.log("geocode success")})
            .catch((err) => {console.log(err)})
    };

    return ( 
            <form onSubmit={HandleClick}>
            <input id='addressInput' type="text" required placeholder="Enter a location" name='address' />
            <button type="submit">Submit</button>
            {/* <h1>{Address}</h1> */}
            </form>
        
    )
}

export default Form