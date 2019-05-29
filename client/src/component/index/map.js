import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import FindDriverButton from "./findDriverButton";
import usersAction from "./../../actions/usersAction";
import { connect } from "react-redux";

//Chỉnh sửa tránh đụng độ với webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  // iconSize: [64,64],
  // iconAnchor: [32,64],
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.osm = React.createRef(); //Refs để lấy thuộc tính dom trong JSX ra
    this.state = {
      isSearchGoalLocation: false, // Biến kiểm tra di chuyển bằng chuột hay di chuyển bằng thanh tìm kiếm
      goalLocation: null, // Biến địa chỉ điểm đến
      currentLocation: null //Biến địa chỉ hiện tại
    };
  }

  //Lấy địa chỉ hiện tại bằng html5
  success = position => {
    const { usersReducer, history } = this.props;
    const { currentUser } = usersReducer;

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    let userInfo = {
      username: currentUser.fullName,
      fullName: currentUser.fullName,
      role: currentUser.role,
      latLng: { lat, lng }
    };

    this.props.setUserOnline(userInfo);

    this.setState({
      currentLocation: { lat, lng }
    });
  };

  //Báo lỗi khi xảy ra lỗi lấy vị trí hiện tại
  error() {
    console.log("lỗi");
  }

  componentDidMount() {
    const { usersReducer, history } = this.props;
    const { currentUser } = usersReducer;
    console.log(usersReducer);
    //Kiểm tra trạng thái đăng nhập
    if (!currentUser || currentUser === "") {
      //Nếu user chưa đăng nhập thì đi đưa qua trang đăng nhập
      history.push("/login");
    } else {
      //Gọi action set user online
    }
    //Lấy địa chỉ hiện tại
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      window.alert("bạn cần bật cho phép định vị vị trí hiện tại");
    }
    //Thanh tìm kiếm
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      animateZoom: true,
      showPopup: false,
      searchLabel: "Nhập vi trí cần tìm,địa chỉ cụ thể...",
      keepResult: true
      // autoClose: true
    });

    const map = this.osm.current.leafletElement;
    map.addControl(searchControl);

    //Kiểm tra xem có dùng thanh tìm kiếm
    map.on("geosearch/showlocation", () => {
      this.setState({
        isSearchGoalLocation: true
      });
    });
  }

  componentDidUpdate() {
    if (this.osm && this.osm.current.leafletElement) {
      const map = this.osm.current.leafletElement;
    }
  }

  //Sự kiện kiểm tra vị trí mới mỗi khi map được di chuyển
  onMoveEnd = event => {
    if (this.osm && this.osm.current.leafletElement) {
      const map = this.osm.current.leafletElement;
      if (this.state.isSearchGoalLocation) {
        this.setState({
          goalLocation: map.getCenter(),
          isSearchGoalLocation: false
        });
      }
    }
  };

  onFindDriver = () => {
    const { currentLocation, goalLocation } = this.state;
  };

  onRenderDriversInMap = () => {
    const { usersReducer } = this.props;
    const { drivers } = usersReducer;
    if (drivers && drivers.length > 0) {
      return drivers.map(d => {
        const position = [d.latLng.lat,d.latLng.lng];
        const eachDriverIcon = L.icon({
          iconUrl:
            "https://b.sccpre.cat/mypng/small/111-1112464_png-file-svg-driver-line-icon.png",
          iconSize: [30, 30], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [32, 64], // point of the icon which will correspond to marker's location
          shadowAnchor: null, // the same for the shadow
          popupAnchor: null // point from which the popup should open relative to the iconAnchor
        });
        return (
          <Marker key= {d.clientid} icon={eachDriverIcon} position={position} />
        )
      });
    }
  };

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
    return (
      <React.Fragment>
        <FindDriverButton onFindDriver={this.onFindDriver} />
        <Map
          center={position}
          zoom={zoom}
          style={{ height: "100vh", width: "100%" }}
          ref={this.osm}
          maxZoom={19}
          onMoveEnd={this.onMoveEnd}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.onRenderDriversInMap()}
          <Marker icon={myIcon} position={position} />
        </Map>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersReducer: state.usersReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserOnline: params => dispatch(usersAction.setUserOnline(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMapComponent);
