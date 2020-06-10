import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
import TeacherList from './TeacherList';
import jquery from "jquery";
//import { stringify } from 'querystring';
const $ = jquery;


export default class TeacherAdd extends React.Component<any,any> {

     constructor(props: any,state: any){
        super(props,state);
        this.state = {}
        console.log(props.listComp);
     }
     
     componentDidMount(){
      let thi: TeacherAdd = this
      $.ajax({
          type:"GET",
          url:thi.props.url,
          dataType:"json",
          success: function(data:any) {
              console.log("edit="+data.firstName)
              //this.state = {firstName:data[0].firstName}
              thi.setState(data);       
              
              //console.log(this.state.firstName);    
          }   //.bind(this)
      })    
    }
  
    handleClick(){
        
      let _this = this;

      
      //let data: any = document.getElementById("t_form").serializeArray();
      let param: any = $("#t_form").serializeArray();
      //let doc: any = document.getElementById("t_form");
      //let data: any = doc.serializeArray();
      console.log("clicked "+param);
      $.post("http://localhost:8080/teacher/add1", param, function(data: any) {
        if (data.id == 0){
            _this.toMainPage("add_"+data.teacherId);
            //_this.state={};
            _this.setState({teacherId:"",firstName:"",lastName:""});
    
        }
            //alert("add success!");
        else
            alert("no record added!")
       });
   
      //_this.state={teacherId:"",firstName:""};
      //_this.setState({teacherId:"",firstName:""});
      //console.log("clicked ");
    }

    toMainPage(skey:string){
      /*
      ReactDOM.render(
        <React.StrictMode>
          <TeacherList key={skey} url="http://localhost:8080/teacher/showAll"/>
        </React.StrictMode>,
        document.getElementById('root')
      );*/
      let comp: TeacherList = this.props.listComp;
      comp.loadData();
     }

    //只有带箭头，this才有效
    handleChange = (event:any) =>  {
      //this.setState({this.state.firstName: event.target.value});
      //let _this = this;
      
      switch(event.target.name){
          case "teacherId":
          this.setState({teacherId: event.target.value});
          break;
          case "firstName":
            this.setState({firstName: event.target.value});
            break;
          case "lastName":
            this.setState({lastName: event.target.value});
            break;
          case "birthdate":
            this.setState({birthdate: event.target.value});
            break;
          case "gender":
            this.setState({gender: event.target.value});
            console.log(event.target.value);
            break;
          default: break;
      }
      
    }  

    render() {
      
       //<p></p>Gender  <input id="gd" type="text" name="gender" value={_this.state.gender} onChange={_this.handleChange}/>
       //$(document).ready(this.getData())
      // <input type="radio" id="female" name="gender" value="0"  checked onChange={_this.handleChange}/>
      //          <label >女</label>
      //          <input type="radio" id="male" name="gender" value="1" onChange={_this.handleChange}/>
      //          <label >男</label>
      //console.log("render:"+this.state.firstName); 
      //let i: number[]=[];
      //let t: any = this.state;  
      let _this: TeacherAdd = this
      let s: string = "http://localhost:8080/teacher/update/"+_this.state.id
      return (
          //ts.map(function (t:any) {
              //let s: string = "http://localhost:8080/teacher/showOne?id="+t.id
      <div><h1>Add Teacher</h1>
              <form method='Post' id="t_form">
                <p></p>TeachID  <input id="fn" type="text" name="teacherId" value={_this.state.teacherId||''} onChange={_this.handleChange}/>
                <p></p>First name  <input id="fn" type="text" name="firstName" value={_this.state.firstName||''} onChange={_this.handleChange}/>
                <p></p>Last name  <input id="ln" type="text" name="lastName" value={_this.state.lastName||''} onChange={_this.handleChange}/>
                <p></p>Birthday  <input id="br" type="text" name="birthdate" value={_this.state.birthdate||''} onChange={_this.handleChange}/>
                

                <select name="gender" onChange={_this.handleChange}>
                  <option value="0">female</option>
                  <option value="1">male</option>
                </select>  



                <p></p>......<input type="button" value="Add" onClick={() => _this.handleClick()}/>
                ......
              </form>
              
              </div>
          //}) 
      )
    }


    
}
//export default TeacherEdit;
