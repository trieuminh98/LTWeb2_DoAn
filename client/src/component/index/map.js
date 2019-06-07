//DLL
import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { connect } from "react-redux";
import Modal from "react-modal";

//Action
import FindDriverButton from "./findDriverButton";
import usersAction from "./../../actions/usersAction";
import bikeBookingAction from "./../../actions/bikeBookingAction";

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
      currentLocation: null, //Biến địa chỉ hiện tại
    };
  }

  //Lấy địa chỉ hiện tại bằng html5
  success = position => {
    const { usersReducer, history } = this.props;
    const { currentUser } = usersReducer;

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    if (currentUser) {
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
    }
  };

  //Báo lỗi khi xảy ra lỗi lấy vị trí hiện tại
  error() {
    console.log("lỗi");
  }

  componentDidMount() {
    const { usersReducer, history } = this.props;
    const { currentUser } = usersReducer;
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

  // componentDidUpdate(prevProps) {
  //   if(!prevProps.bikeBookingReducer.foundDriver && this.props.bikeBookingReducer.foundDriver){
  //     window.alert("Tìm được tài xế gần nhất");
  //   }
  // }

  onRenderLoadingIcon = () => {
    const { bikeBookingReducer } = this.props;
    let isLoading = bikeBookingReducer && bikeBookingReducer.loading;
    let noDriver = bikeBookingReducer && bikeBookingReducer.error;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      },
      overlay: { zIndex: 9999 }
    };
    if(isLoading){
      return (
        <Modal isOpen={isLoading} style={customStyles} contentLabel="system">
          <h1>Đang tìm tài xế....</h1>
        </Modal>
      );
    }
    else{
      return (
        <Modal isOpen={noDriver} style={customStyles} contentLabel="system">
          <h1>Không tìm thấy tài xế gần bạn 5km... Xin đợi lát tìm kiếm lại </h1>
          <button onClick={e => this.onCloseLoadingForm()}>Chấp Nhận</button>
        </Modal>
      );
    }
  };

  onCloseLoadingForm = () => {
    this.props.closeLoadingForm();
  }

  onAcceptBooking = guestInfo => {
    this.props.acceptBookingSuccess(guestInfo);
  };

  onRejectBooking = guestInfo => {
    this.props.acceptBookingFailure(guestInfo);
  };

  onRenderIsDrivingForm = () => {
    const { bikeBookingReducer } = this.props;
    const onPicking =
      (bikeBookingReducer.guest &&
        typeof bikeBookingReducer.guest !== "undefined") ||
      (bikeBookingReducer.foundDriver &&
        typeof bikeBookingReducer.foundDriver !== "undefined");
    const {
      isPickedUp,
      foundDriver,
      guest,
      pickedUp,
      isToGoal,
      toGoal,
      payed,
      isPayed
    } = bikeBookingReducer;
    const onToGoal = (foundDriver && isPickedUp) || (guest && pickedUp);
    const onPay = (foundDriver && isToGoal) || (guest && toGoal);
    const onComplete = (foundDriver && payed) || (guest && isPayed);
    if (onPicking) {
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        },
        overlay: { zIndex: 9999 }
      };
      return (
        <Modal isOpen={onPicking} style={customStyles} contentLabel="system">
          <h1>Bắt đầu vận chuyển</h1>
          {this.onRenderDriverPickedUp()}
          {onToGoal ? this.onRenderDrivingToGoal() : ""}
          {onPay ? this.onRenderPaying() : ""}
          {onComplete ? this.onRenderComplete() : ""}
        </Modal>
      );
    }
  };

  onCompleteByGuest = () => {
    this.props.completeByGuest();
  }

  onCompleteByDriver = (history) => {
    this.props.completeByDriver(history);
  }

  onRenderComplete = () => {
    const { bikeBookingReducer,usersReducer } = this.props;
    const { isPayed, payed, guest, money } = bikeBookingReducer;
    if (isPayed) {
      const history = {
        driver: usersReducer.currentUser.fullName,
        guest: guest.fullName,
        money
      }
      return (
        <button
          className="btn btn-success"
          onClick={e => this.onCompleteByDriver(history)}
        >
          Hoàn thành chuyến đi
        </button>
      );
    }
    else if(payed){
      return (
        <button
          className="btn btn-success"
          onClick={e => this.onCompleteByGuest()}
        >
          Hoàn thành chuyến đi
        </button>
      );
    }
  };

  onPayingRequest = guest => {
    this.props.onPayingRequest(guest);
  };

  onRenderPaying = () => {
    const { bikeBookingReducer } = this.props;
    const { isPayed, payed, guest, money } = bikeBookingReducer;
    if (!isPayed && guest) {
      return (
        <div>
          <span>Tổng tiền {money} VNĐ: </span>
          <button
            className="btn btn-success"
            onClick={e => this.onPayingRequest(guest)}
          >
            Nhận Tiền
          </button>
        </div>
      );
    } else if (isPayed && guest) {
      return (
        <div>
          <span>Tổng tiền {money} VNĐ : </span>
          <span>Đã nhận</span>
        </div>
      );
    } else {
      return (
        <div>
          <span>Tổng tiền {money} VNĐ: </span>
          <span>{payed ? "Đã trả" : "Đang đợi trả tiền..."}</span>
        </div>
      );
    }
  };

  onToGoalRequest = foundDriver => {
    this.props.onToGoalRequest(foundDriver);
  };

  onRenderDrivingToGoal = () => {
    const { bikeBookingReducer } = this.props;
    const { toGoal, isToGoal, foundDriver } = bikeBookingReducer;
    if (!isToGoal && foundDriver) {
      return (
        <div>
          <span>Đã tới điểm đến</span>
          <button
            className="btn btn-success"
            onClick={e => this.onToGoalRequest(foundDriver)}
          >
            Chấp nhận
          </button>
        </div>
      );
    } else if (isToGoal && foundDriver) {
      return (
        <div>
          <span>Đã tới điểm đến: </span>
          <span>Đã hoàn thành</span>
        </div>
      );
    } else {
      return (
        <div>
          <span>Đã tới điểm đến: </span>
          <span>{toGoal ? "Đã hoàn thành" : "Đang đợi..."}</span>
        </div>
      );
    }
  };

  onPickedUp = foundDriver => {
    this.props.pickedUpRequest(foundDriver);
  };

  onRenderDriverPickedUp = () => {
    const { bikeBookingReducer } = this.props;
    const { pickedUp, isPickedUp, foundDriver } = bikeBookingReducer;
    const isPickedUpFalse = !isPickedUp && foundDriver;
    const isPickedUpTrue = isPickedUp && foundDriver;
    if (isPickedUpFalse) {
      return (
        <div>
          <span>Tài xế đã tới đón:</span>
          <button
            className="btn btn-success"
            onClick={e => this.onPickedUp(foundDriver)}
          >
            Chấp nhận
          </button>
        </div>
      );
    } else if (isPickedUpTrue) {
      return (
        <div>
          <span>Tài xế đã tới đón:</span>
          <span>Đã hoàn thành</span>
        </div>
      );
    } else {
      return (
        <div>
          <span>Tài xế đã tới đón:</span>
          <span>{pickedUp ? "Đã hoàn thành" : "Đang đợi..."}</span>
        </div>
      );
    }
  };

  onRenderBookingForm = () => {
    const { bikeBookingReducer } = this.props;
    const {guest,money} = bikeBookingReducer;
    const guestMoneyInfo = {
      guest,
      money
    }
    let isReceiveFormGuest =
      bikeBookingReducer.guest &&
      typeof bikeBookingReducer.guest !== "undefined" &&
      !bikeBookingReducer.isDriving;
    if (isReceiveFormGuest) {
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        },
        overlay: { zIndex: 9999 }
      };
      return (
        <Modal
          isOpen={isReceiveFormGuest}
          style={customStyles}
          contentLabel="system"
        >
          <h1>Tìm được 1 chuyến đi từ {bikeBookingReducer.guest.username}</h1>
          <button
            className="btn btn-success"
            onClick={e => this.onAcceptBooking(guestMoneyInfo)}
          >
            Chấp nhận
          </button>
          <button
            className="btn btn-danger"
            onClick={e => this.onRejectBooking(bikeBookingReducer.guest)}
          >
            Từ chối
          </button>
        </Modal>
      );
    }
  };

  //Sự kiện kiểm tra vị trí mới mỗi khi map được di chuyển
  onMoveEnd = event => {
    if (this.osm && this.osm.current.leafletElement) {
      const map = this.osm.current.leafletElement;
      if (this.state.isSearchGoalLocation)
      {
        this.setState({
          goalLocation: map.getCenter(),
          isSearchGoalLocation: false
        });
      }
    }
  };

  onFindDriver = () => {
    const { currentLocation, goalLocation } = this.state;
    const currentAndGoal = {
      currentLocation,
      goalLocation
    }
    if (currentLocation) {
      if (goalLocation) {
        this.props.findDriversRequest(currentAndGoal);
      } else {
        console.log("chưa nhập điểm đến");
      }
    }
  };

  onRenderDriversInMap = () => {
    const { usersReducer } = this.props;
    const { drivers } = usersReducer;
    if (drivers && drivers.length > 0) {
      return drivers.map(d => {
        const position = [d.latLng.lat, d.latLng.lng];
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
          <Marker key={d.username} icon={eachDriverIcon} position={position} />
        );
      });
    }
  };

  render() {
    const { bikeBookingReducer } = this.props;
    const { foundDriver, guest } = bikeBookingReducer;
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
        {foundDriver ? <p>Tài xế cho bạn: {foundDriver.username}</p> : ""}
        {guest ? <p>Khách hàng của bạn: {guest.username}</p> : ""}
        <FindDriverButton onFindDriver={this.onFindDriver} />
        {this.onRenderIsDrivingForm()}
        {this.onRenderLoadingIcon()}
        {this.onRenderBookingForm()}
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
    usersReducer: state.usersReducer,
    bikeBookingReducer: state.bikeBookingReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserOnline: params => dispatch(usersAction.setUserOnline(params)),
    findDriversRequest: latLng =>
      dispatch(bikeBookingAction.findDriversRequest(latLng)),
    acceptBookingSuccess: guestInfo =>
      dispatch(bikeBookingAction.acceptBookingSuccess(guestInfo)),
    acceptBookingFailure: guestInfo =>
      dispatch(bikeBookingAction.acceptBookingFailure(guestInfo)),
    pickedUpRequest: foundDriver =>
      dispatch(bikeBookingAction.pickedUpRequest(foundDriver)),
    onToGoalRequest: foundDriver =>
      dispatch(bikeBookingAction.toGoalRequest(foundDriver)),
    onPayingRequest: guest => dispatch(bikeBookingAction.payingRequest(guest)),
    completeByGuest: () => dispatch(bikeBookingAction.completeByGuest()),
    completeByDriver: (history) => dispatch(bikeBookingAction.completeByDriver(history)),
    closeLoadingForm: () => dispatch(bikeBookingAction.closeLoadingForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMapComponent);
