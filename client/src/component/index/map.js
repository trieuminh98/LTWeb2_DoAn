import React from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

class GoogleMapComponent extends React.Component {
  render() {
    
    const position = [10.762060, 106.683073]; //Lấy từ trang chủ leaflet,Latitude - Longitude
    const zoom = 19;
    var myIcon = L.icon({
        iconUrl: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1097333/android/stickers/3989483.png;compress=true',
        iconSize:     [95, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32,64], // point of the icon which will correspond to marker's location
        shadowAnchor: null,  // the same for the shadow
        popupAnchor:  null // point from which the popup should open relative to the iconAnchor
    });

    return (
      <Map center={position} zoom={zoom} style={{height: '100vh', width: '100%'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker icon={myIcon} position={position}>
        </Marker>
      </Map>
    );
  }
}

export default GoogleMapComponent;
