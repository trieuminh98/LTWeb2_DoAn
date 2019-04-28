import React from 'react';
import logo from './logo.svg';
import './App.css';
import Members from './component/members/members';
import axios from 'axios';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
        members: []
    }
  }

  //Lấy dữ liệu từ local 5000
  componentDidMount(){
    axios.get('http://localhost:5000/api/members')
      .then(members => this.setState({members : members.data},() => console.log(members.data)))
  }

  
  render(){
    //var { members } = this.state //Kiểu ES6,hoặc var members = this.sate.members
    var elmMembers = this.state.members.map((member,index) => {
      return <Members key = {member.id} name={member.lastName}/> // lấy từng phần tử trong state gửi qua component Members,dùng map phải có từ khóa key
    })
    return (
      <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload. 
         </p>
         <a
           className="App-link"
           href="https:reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           <h1>
             { elmMembers } {/*Gọi biến elmMembers*/}
           </h1>
         </a>
       </header>
     </div>
    );
  }
}


export default App;
