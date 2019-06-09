import React from "react";

class ListDrivers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="div-container-driver">
          <span style={{ fontSize: "30px" }}>Danh sách tài xế</span>
          <table className="table table-driver">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>
                    <button className="btn btn-custom-active">kích hoạt</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ListDrivers;
