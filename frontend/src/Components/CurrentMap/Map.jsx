import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import example from '../Assists/example.jpeg';
import clueImage from '../Assists/clue.jpeg';
import avatarImage from '../Assists/avatar.jpeg';
import './Map.css';

// Import the Popup components
import MyLocationPopup from '../Popups/MyLocation';
import OtherPeoplePopup from '../Popups/OtherPeoplePopup';
import CluePopup from '../Popups/CluePopup';

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

const Map = ({ liveLocationMarkers, clueMarkers, myLocation }) => {
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
                        <OtherPeoplePopup userID={marker.userID} profilePicUrl={marker.profilePicUrl} />
                    </Popup>
                </Marker>
            ))}

            {/* Clue Markers */}
            {clueMarkers.map((clue, index) => (
                <Marker
                    key={index}
                    position={[clue.latitude, clue.longitude]}
                    icon={createClueIcon()}
                >
                    <Popup>
                        <CluePopup />
                    </Popup>
                </Marker>
            ))}

            {/* My Location */}
            <Marker
                key="my-location"
                position={[myLocation.latitude ?? 0, myLocation.longitude ?? 0]}
                icon={createMeIcon()}
            >
                <Popup>
                    <MyLocationPopup name="My Profile" />
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
