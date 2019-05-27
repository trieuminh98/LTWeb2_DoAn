import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css"
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  // iconSize: [64,64],
  // iconAnchor: [32,64],
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.osm = React.createRef(); //Refs để lấy thuộc tính dom trong JSX ra
    this.state = {
      isSearchGoalLocation : false, // Biến kiểm tra di chuyển bằng chuột hay di chuyển bằng thanh tìm kiếm
      goalLocation : null,
      currentLocation : null
    }
  }

  success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.setState({
      currentLocation : {lat,lng}
    })
  }

  error() {
    console.log("lỗi");
  }


  //Thanh tìm kiếm
  componentDidMount() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.success,this.error);
    }else{
      /*GEOLOCATION not available*/ 
    }
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      animateZoom: true,
      showPopup: false,
      searchLabel: 'Nhập vi trí cần tìm,địa chỉ cụ thể...',
      keepResult: true
      // autoClose: true
    });

    const map = this.osm.current.leafletElement;
    map.addControl(searchControl);

    map.on('geosearch/showlocation', () => {
      this.setState({
        isSearchGoalLocation : true
      });
    })
  }

  componentDidUpdate() {
    if(this.osm && this.osm.current.leafletElement) {
      const map = this.osm.current.leafletElement;
    }
  }

  //Sự kiện kiểm tra vị trí mới mỗi khi map được di chuyển
  onMoveEnd = event => {
    if(this.osm && this.osm.current.leafletElement) {
      const map = this.osm.current.leafletElement;
      if(this.state.isSearchGoalLocation){
        this.setState({
          goalLocation: map.getCenter(),
          isSearchGoalLocation : false
        })
      }
    }
  }

  render() {
    const position = [10.76206, 106.683073]; //Lấy từ trang chủ leaflet,Latitude - Longitude
    const zoom = 19;
    var myIcon = L.icon({
      iconUrl:
        "https://sdl-stickershop.line.naver.jp/products/0/0/1/1097333/android/stickers/3989483.png;compress=true",
      iconSize: [95, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [32, 64], // point of the icon which will correspond to marker's location
      shadowAnchor: null, // the same for the shadow
      popupAnchor: null // point from which the popup should open relative to the iconAnchor
    });

    console.log("goal",this.state.goalLocation);
    console.log("currentLocation",this.state.currentLocation);
    return (
      <Map
        center={position}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
        ref ={this.osm}
        maxZoom={19}
        onMoveEnd = {this.onMoveEnd}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker icon={myIcon} position={position} />
      </Map>
    );
  }
}

export default GoogleMapComponent;
