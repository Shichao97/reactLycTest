import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
import TeacherList from './TeacherList';
import jquery from "jquery";
//import { stringify } from 'querystring';
const $ = jquery;


export default class TeacherEdit extends React.Component<any,any> {
    
     constructor(props: any,state: any){
        super(props,state);
        this.state = {}
        //console.log("teacherEdit constructor...");
     }
     
     componentDidMount(){
       /*
      let thi: TeacherEdit = this
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
      */ 
     let comp: TeacherList = this.props.listComp;
     let id: number = parseInt(this.props.tid);
     let data: any = this.getDataById(comp.state.page.content,id);
     this.setState({id:data.id,firstName:data.firstName,lastName:data.lastName});
   }
 
   getIdFromUrl(url: string): number{
     let n = url.lastIndexOf("=");
     return parseInt(url.substring(n+1));
   }
 
   getDataById(ds: any[],id: number): any{
     for(let d of ds){
       //console.log("id="+id+" d.id="+d.id);
       if(d.id == id) return d;
     }
     return null;
   }
  
    handleClick(s: string){
      let _this = this;
      let newData: any = $("#t_form").serializeArray();
      let param: any = $("#t_form").serialize();
      //let doc: any = document.getElementById("t_form");
      //let data: any = doc.serializeArray();
      //console.log("clicked "+param);
      $.ajax({
        type:"GET",
        crossDomain: true, 
        xhrFields: {
            withCredentials: true 
        },
      url:s+"?"+param,
        dataType:"json",
        success: function(data:any) {
            //console.log("edit="+data.firstName)
            //this.state = {firstName:data[0].firstName}
            //_this.toMainPage(s);       
            
            let tl: TeacherList = _this.props.listComp;
            //newData.id = _this.state.id;
            tl.refreshRecord(_this.state);
            console.log(_this.state);
            //tl.editRecord(); 
        },
        error: function(xhr:any, textStatus, errorThrown){
          console.log("edit status:"+xhr.status+" msg:"+textStatus)
          if(xhr.status=='604'){//未登录错误
            _this.props.listComp.refs.logwin.setState({modalIsOpen:true});
          }
           
        }
      })    
         
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
        case "first_name":
          this.setState({firstName: event.target.value});
          break;
        case "last_name":
          this.setState({lastName: event.target.value});
          break;
        default: break;
      }
      //console.log(this)
    }  

    render() {
      
       //this.getData();
       //$(document).ready(this.getData())
      //console.log("render:"+this.state.firstName); 
      //let i: number[]=[];
      //let t: any = this.state;  
      let _this: TeacherEdit = this
      let s: string = "http://localhost:8080/teacher/update/"+_this.state.id
      return (
          //ts.map(function (t:any) {
              //let s: string = "http://localhost:8080/teacher/showOne?id="+t.id
      <div><h1>teacher edit 'id'={_this.state.id}</h1>
              <form method='Post' id="t_form">
                <p></p>First name  <input id="fn" type="text" name="first_name" value={_this.state.firstName||''} onChange={_this.handleChange}/>
                <p></p>Last name  <input id="ln" type="text" name="last_name" value={_this.state.lastName||''} onChange={_this.handleChange}/>
                <p></p>......<input type="button" value="Edit" onClick={() => _this.handleClick(s)}/>
                ......_____________________________..........<input type="button" value="delete" onClick={() => _this.deleteTeacher(_this.state.id)}/>
              </form>
              
              </div>
          //}) 
      )
    }


    deleteTeacher(id:number){
      let _this: TeacherEdit = this
      $.ajax({
        type:"GET",
        url:"http://localhost:8080/teacher/delete/"+id,
        dataType:"json",
        success: function(data:any) {
            //console.log("Get="+data[0].firstName)
            //this.state = {firstName:data[0].firstName}
            _this.toMainPage("delkey_"+id);     
            _this.setState({id:"",firstName:"",lastName:""});
            //console.log(this.state.firstName);    
        }    ///.bind(this)
      })       
    }    
}
//export default TeacherEdit;
