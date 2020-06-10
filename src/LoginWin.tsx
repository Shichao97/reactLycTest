import React,{useState} from 'react';
import Modal from 'react-modal';
import './MyApp.css';
import './App.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
//import { stringify } from 'querystring';
const $ = jquery;

//
//{
  //Modal.setAppElement('#root')
  export default class  LoginWin extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          this.state={modalIsOpen:false};
      }

    doLogin(){
      let _this = this
      let params = $("#log_form").serializeArray();
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:"http://localhost:8080/login/testLogin",
          data:params,
          dataType:"json",
          success: function(data) {
              console.log(data)
              _this.props.listComp.setState({loginUser:data});
              _this.props.listComp.refs.logwin.setState({modalIsOpen:false});
          },
          error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
              //_this.props.listComp.refs.logwin.set
            }
             
          }
      })    
    }


    render(){
    //const [modalIsOpen, setModalIsOpen] = useState(false)  
    return (
      <div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:true})}>
              <div className='demo'>
              
                
              <form id="log_form">
              <h2>Please login first!</h2><br/>
                  *username:<input type='text' name='username'></input><br/><br/>
                  *password: <input type='password' name='passWord'></input><br/><br/>
                  <input type="button" value="Login" className="button" onClick={() => this.doLogin()}/><br/><br/><br/>
                  <button className="button" onClick={() => this.setState({modalIsOpen:false})}>Close</button>
              </form>
              </div>
              <div>
                  
              </div>
          </Modal>
      </div>
    );
  }
//}
}

