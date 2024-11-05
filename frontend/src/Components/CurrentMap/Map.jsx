import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import avatarImage from '../Assists/avatar.jpeg';
import clueImage from '../Assists/clue.jpeg';
import example from '../Assists/example.jpeg';
import './Map.css';

// Import the Popup components
import CluePopup from '../Popups/CluePopup';
import MyLocationPopup from '../Popups/MyLocation';
import OtherPeoplePopup from '../Popups/OtherPeoplePopup';

const MNNIT_CENTER = [25.4920, 81.8639];
const ZOOM_LEVEL = 16;

// Utility functions for custom icons
const createProfileIcon = (profilePicUrl) => {
    return L.icon({
        iconUrl: example,
        iconSize: [40, 40],
        className: 'custom-icon',
    });
};
const createClueIcon = () => {
    return L.icon({
        iconUrl: clueImage,
        iconSize: [40, 40],
        className: 'custom-clue-icon',
    });
};

const createMeIcon = () => {
    return L.icon({
        iconUrl: avatarImage,
        iconSize: [40, 40],
        className: 'custom-icon',
    });
};

const Map = (props) => {

    const mask = props?.mask;
    const liveLocationMarkers = props?.liveLocationMarkers;
    const clueMarkers = props?.clueMarkers;
    const myLocation = props?.myLocation;

    return (
        <MapContainer center={MNNIT_CENTER} zoom={ZOOM_LEVEL} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Live Location Markers */}
            {mask == 'multi'? liveLocationMarkers.map((marker) => (
                <Marker
                    key={marker.userID}
                    position={[marker.latitude, marker.longitude]}
                    icon={createProfileIcon(marker.profilePicUrl)}
                >
                    <Popup>
                        <OtherPeoplePopup userID={marker.userID} profilePicUrl={marker.profilePicUrl} />
                    </Popup>
                </Marker>
            )) : <div></div>}

            {/* Clue Markers */}
            {clueMarkers?.map((clue, index) => (
                <Marker
                    key={index}
                    position={[clue.latitude, clue.longitude]}
                    icon={createClueIcon()}
                >
                    <Popup>
                        <CluePopup clue={clue.ClueData} />
                    </Popup>
                </Marker>
            ))}

            {/* My Location */}
            {myLocation.latitude && myLocation.longitude && (<Marker
                key="my-location"
                position={[myLocation.latitude, myLocation.longitude]}
                icon={createMeIcon()}
            >
                <Popup>
                    <MyLocationPopup name="My Profile" />
                </Popup>
            </Marker>)}
        </MapContainer>
    );
};

export default Map;
