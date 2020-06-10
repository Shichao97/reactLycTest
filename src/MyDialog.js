import React from 'react';
import ReactDOM from 'react-dom';
import jquery from "jquery";
const $ = jquery;
export default class MyDialog extends React.Component {
  constructor(props){
    super(props);
  }
  handleClick(){
    jquery("#login").css("visibility","hidden")
  }

  getCookie(key) {        
    const name = key + "=";        
    const ca = document.cookie.split(';');        
    for (let i = 0; i < ca.length; i++) {            
      const c = ca[i].trim();            
      if (c.indexOf(name) === 0) {                
        return c.substring(name.length, c.length);            
      }        
    }        
    return "";    
  }

  

  render() {
    const container = {
      position: 'absolute',
      top: '20%',
      left: '50%',
      marginLeft: '-150px',
      width: '400px',
      height: '300px',
      border: '1px solid blue',
      zIndex: 9999,
      backgroundColor: 'lightgray'
    }
    const title = { 
      height: '35px',
      "text-align": 'center',
      backgroundColor: 'lightblue'
    }
    const layer = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.5)',
      zIndex: 1
    }
    return (
      <div>
        <div style={container}>
          <div style={title}>{this.props.title}</div>
          <div>
            {this.props.children}
            <input type="button" value="Close" onClick={() => jquery("#login").css("visibility","hidden")}/>
          </div>
          <input type="button" value="test DELETE" onClick={() => this.props.listComp.handleDelete("53")}/>
          <input type="button" value="show cookies" onClick={() => console.log("Cookies: "+document.cookie)}/>
          <p/><p/>
          <input type="button" value="test login" onClick={() => this.login()}/>
        </div>
        <div style={layer}></div>
      </div>
    );
  }



  login(){
    let _this = this
    let params = $("#log_form").serializeArray();
    $.ajax({
        type:"POST",
        crossDomain: true, 
        xhrFields: {
            withCredentials: true 
        },
        url:"http://localhost:8080/teacher/testLogin?username=lyc&passWord=12345",
        data:params,
        dataType:"json",
        success: function(data) {
            console.log(data)
            //this.state = {firstName:data[0].firstName}
            //thi.setState(data);       
            
            //console.log(this.state.firstName);    
        },
        error: function(xhr, textStatus, errorThrown){
          console.log("request status:"+xhr.status+" msg:"+textStatus)
          if(xhr.status=='604'){//未登录错误
            
          }
           
        }
    })    
  }





}


