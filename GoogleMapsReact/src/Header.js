import React, { useState, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const center = { lat: 33.5651, lng: 73.0169 }; // Central coordinates
const libraries = ['places'];

export default function Header() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyA-Icxas0R93_RknBOd5J2OSkqxp4YTP5I',
        libraries: libraries,
    });

    const [map, setMap] = useState(null);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    const calculateRoute = async () => {
        if (!originRef.current.value || !destinationRef.current.value) return;

        const directionsService = new window.google.maps.DirectionsService();
        const request = {
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                setDirectionResponse(result);
                setDistance(result.routes[0].legs[0].distance.text);
                setDuration(result.routes[0].legs[0].duration.text);
            } else {
                console.error('Directions request failed due to ' + status);
                alert('Directions request failed: ' + status);
            }
        });
    };

    const clearRoute = () => {
        setDirectionResponse(null);
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
    };

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <div className='header'>
                <h2 style={{ textAlign: 'center' }}>React Google Maps Implementation</h2>
                <div className='input-container'>
                    <Autocomplete>
                        <input 
                            type="text" 
                            placeholder="From" 
                            ref={originRef}
                        />
                    </Autocomplete>
                    <Autocomplete>
                        <input 
                            type="text" 
                            placeholder="To" 
                            ref={destinationRef}
                        />
                    </Autocomplete>
                </div>
                <div className="calculate">
                    <button onClick={calculateRoute}>Calculate Route</button>
                    <button onClick={clearRoute}>Clear Route</button>
                </div>
                <button className="center" onClick={() => map.panTo(center)}>Center</button>
            </div>

            <div className='map-container'>
                <GoogleMap 
                    center={center} 
                    zoom={15} 
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                    }}
                    onLoad={(map) => {
                        setMap(map);
                        console.log("Map loaded successfully:", map);
                    }}
                > 
                    <Marker 
                        position={center} 
                        onLoad={(marker) => console.log("Marker loaded successfully:", marker)}
                    />
                    {directionResponse && <DirectionsRenderer directions={directionResponse} />}
                </GoogleMap>
            </div>

            <div className='info-container'>
                {distance && duration && (
                    <div className='distance-duration'>
                        <p>Distance: {distance}</p>
                        <p>Duration: {duration}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
