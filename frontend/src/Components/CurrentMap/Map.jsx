import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import example from '../Assists/example.jpeg';
import clueImage from '../Assists/clue.jpeg'
import avatarImage from '../Assists/avatar.jpeg';
import './Map.css';

// Default map center for MNNIT Allahabad
const MNNIT_CENTER = [25.4920, 81.8639];
const ZOOM_LEVEL = 16;

// A utility function to create custom icon with profile picture
const createProfileIcon = (profilePicUrl) => {
    return L.icon({
        iconUrl: example,
        iconSize: [40, 40], // Adjust icon size
        className: 'custom-icon',
    });
};

// A utility function to create custom icon with clues
const createClueIcon = () => {
    return L.icon({
        iconUrl: clueImage,
        iconSize: [40, 40], // Adjust icon size
        className: 'custom-clue-icon',
    });
};

// A utility function to create custom icon for my loaction
const createMeIcon = () => {
    return L.icon({
        iconUrl: avatarImage,
        iconSize: [40, 40], // Adjust icon size
        className: 'custom-icon',
    });
};

// Main Map component
const Map = ({ liveLocationMarkers, clueMarkers, myLocation }) => {
    
    const [location, setLocation] = useState(myLocation);

    useEffect(() => {
        setLocation(location);
    }, location);

    return (
        
        <MapContainer center={MNNIT_CENTER} zoom={ZOOM_LEVEL} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Live Location Markers */}
            {liveLocationMarkers.map((marker) => (
                <Marker
                    key={marker.userID}
                    position={[marker.latitude, marker.longitude]}
                    icon={createProfileIcon(marker.profilePicUrl)}
                >
                    <Popup>
                        <div>
                            <img src={marker.profilePicUrl} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                            <p>User ID: {marker.userID}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Clue Markers */}
            {clueMarkers.map((clue, index) => (
                <Marker
                    key={index}
                    position={[clue.latitude, clue.longitude]}
                    icon = {createClueIcon()}
                >
                    <Popup>
                        <p>Clue Location</p>
                    </Popup>
                </Marker>
            ))}
            {/* My Location */}
            <Marker
                key={123}
                position={[myLocation.latitude == null? 0 : myLocation.latitude, myLocation.longitude == null? 0 : myLocation.longitude]}
                icon = {createMeIcon()}
            >
                <Popup>
                    <p>My Location</p>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
