import * as React from 'react';
import ReactDOM from 'react-dom';
import TeacherEdit from './TeacherEdit';
import TeacherAdd from './TeacherAdd';
import MyDialog from './MyDialog';
import LoginWin from './LoginWin';
import MyModal from './MyModal';
import MyApp from './MyApp';
import jquery from "jquery";
const $ = jquery;



export default class TeacherList extends React.Component<any,any> {

   constructor(props:any,state: any){
      super(props,state);
      this.state = {page:{content:[]}};
      //console.log(testVar);
   }

   handleSearch(){
    let param: any = $("#search_form").serialize();
    let url = "http://localhost:8080/teacher/search?pageSize=20&"+param;
    this.state={url:url,test2:"yes4"};
    this.setState({url:url});
    this.loadUrlData(url);
   }

   lastPage(){
    //let totalPagNumer:number = this.state.page.totalPages;
    let pageNumber:number = this.state.page.number;
    let pageNo:number = pageNumber-1;
    if(pageNo>=0){
      this.loadData(pageNo);
    }
   }

   nextPage(){
    let totalPagNumer:number = this.state.page.totalPages;
    let pageNumber:number = this.state.page.number;
    let pageNo:number = pageNumber+1;
    if(pageNo<totalPagNumer){
      this.loadData(pageNo);
    }
   }

   gotoPage(){
    let totalPagNumer:number = this.state.page.totalPages;
    let pageNumber:number = this.state.page.number;
    let pageNo:number = this.state.goPage-1;
    if(pageNo>=0 && pageNo<totalPagNumer && pageNo != pageNumber){
      this.loadData(pageNo);
    }
   }

   loadUrlData(url:string){
    console.log("loadUrl= "+url)
    let thi: TeacherList = this
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success: function(data:any) {
            //console.log("Get="+data[0].firstName)
            //this.state = {firstName:data[0].firstName}
            thi.setState({page:data,goPage:data.number+1}); 
            //设置当前页到跳转框   
            
            console.log(data.pageSize);
            //console.log(this.state.firstName);    
        }    ///.bind(this)
    })    
   }
   
   loadData(pageNo?:number){
    let url = this.state.url;//"http://localhost:8080/teacher/search?searchWord=&searchType=firstName"
    if(pageNo==undefined){
      url = url+"&pageNo="+this.state.page.pageNumber;
      
    }
    else{
      url = url+"&pageNo="+pageNo;
    }
    
    this.loadUrlData(url);
   }

  

  handleClick(tid: string){

    console.log("clicked "+tid);
    /*
    ReactDOM.render(
        <div>test</div>,
      document.getElementById('right')
    );
      */
     //key 不同，才会重新render
    ReactDOM.render(
      <React.StrictMode>
        <TeacherEdit key={tid} tid={tid} listComp={this}/>
      </React.StrictMode>,
      document.getElementById('right')
    );
       
  }

  refreshRecord(data: any){
    for(let d of this.state.page.content){
      if(d.id == data.id){
        d.firstName = data.firstName;
        d.lastName = data.lastName;
      }
    }
    this.setState({});
  }


  handleChange = (event:any) =>  {
    //this.setState({this.state.firstName: event.target.value});
    //let _this = this;
    
    switch(event.target.name){
      case "goPage":
        let n:number = event.target.value;
        if(n>=1 && n<=this.state.page.totalPages){
          this.setState({goPage: event.target.value});
        }
        break;
        case "searchWord":
          this.setState({searchWord: event.target.value});
          break;
      case "searchType":
          this.setState({searchType: event.target.value});
          break;
        case "pageNo":
          this.setState({pageNo: event.target.value});
          //console.log(event.target.value);
          break;
        default: break;
    }
    
  }    

  hideLogin(){
    $("#login").css("visibility","hidden")
  }

  handleDelete(id:string){
    let _this: TeacherList = this;
    let url1:string = "http://localhost:8080/teacher/del/"+id;
    $.ajax({
      type:"DELETE",
      crossDomain: true, 
      xhrFields: {
          withCredentials: true 
      },
     url:url1,
     dataType:"json",
     success:function(data){
      //console.log(data.msg);
      if(data.msg == 1){
          ReactDOM.render(
            <div>Delete success: id = {id}</div>
            ,document.getElementById('right')
            );
       //let deleID:any = document.getElementById(id);
         //let p = deleID.parentNode;
          //p.removeChild(deleID);
          //_this.deleteListById(id,_this.state.page.content);
          _this.setState({});
         
      }else{
       alert("Delete failed: id = "+id);
      }
     },
      error:function(xhr:any,textStatus,errorThrown){
        console.log("request status:"+xhr.status+" msg:"+textStatus);
        if(xhr.status=='604'){
          let logwin:any = _this.refs.logwin;
          logwin.setState({modalIsOpen:true});
        }
      }
    })
   
}

  showLogin(){
     /*
    let logwin:any = this.refs.logwin;
    logwin.setState({modalIsOpen:true});
    */
    //$("#login").css("visibility","visible");
   
    let _this = this;
    if(this.state.loginWin == undefined){
      
      const element = (
        <MyDialog title='Login Please' listComp={this}/>
          
          
      
      );
      
      ReactDOM.render(element,document.getElementById('login'));
      this.setState({loginWin:true});
    }
    else{
      $("#login").css("visibility","visible")
    }
    
  }

  render() {
    let ts: any[] = this.state.page.content;  
    let _this: TeacherList = this
    // let logWin: Comment = <LoginWin />;
    if(this.state.goPage == undefined){
      console.log("page.content is null..Show only search.")
      return <div>Teacher Search: {this.renderForm()}</div>
    }
    else return (
        /*
      <div className="app">
        First teacher={this.state.firstName}
      </div>

      <div onClick={() => this.handleClick()}>
          <span>点击</span>
      </div>
        */
      <div key="tlist">Teacher Search
      
      

      {
        
        this.renderForm()
      }
        <table ><tbody>
      {
        
          ts.map(function (t:any) {
              let s: string = "http://localhost:8080/teacher/showOne?id="+t.id
              let sex: string = t.gender==1?"male":"femal";
              return (
              <tr key={t.id}>
                <td>{t.teacherId}</td>
                <td><a href="#"  onClick={() => _this.handleClick(t.id)}> {t.firstName} . {t.lastName}</a> </td>
                <td>{t.birthdate}</td>
                <td>{sex}</td>
              
              </tr>)
          })
        
      }
     <p></p><p></p>
      </tbody></table>
      
      <input type="button" value="Last page" onClick={() => _this.lastPage()}/>
      &nbsp;&nbsp;<input type="button" value="Next page" onClick={() => _this.nextPage()}/>
      &nbsp;&nbsp;&nbsp; 第{_this.state.page.number + 1}页/共{_this.state.page.totalPages}页
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input width="3" type="number" name="goPage" value={_this.state.goPage||''} onChange={_this.handleChange}/>
      <input type="button" value="Goto page" onClick={() => _this.gotoPage()}/>
      
      
			

      <p></p><p></p>
      <input type="button" value="Show half" onClick={() => _this.deleteHalf()}/>
      
      
      <div className=""></div><input type="button" value="Add Teacher" onClick={() => _this.addTeacher()}/>
      </div>
    )
  }


  renderForm(){
    let _this: TeacherList = this;
    //<input type="button" value="Open test window" onClick={() => _this.showLogin()}/>
    return(
      
      <form id="search_form">
        <LoginWin listComp={this} ref="logwin"/>
        &nbsp;&nbsp;<input type="button" value="Open test window" onClick={() => _this.showLogin()}/>
      <p></p> 
      Use Field: <select name="searchType" onChange={_this.handleChange}>
        <option value="firstName">First name</option>
        <option value="lastName">Last name</option>
        <option value="teacherId">Teacher ID</option>
      </select>  &nbsp;
      <input id="br" type="text" name="searchWord" value={_this.state.searchWord||''} onChange={_this.handleChange}/>
      

      <input type="button" value=" Search" onClick={() => _this.handleSearch()}/>

      <br></br>Sort By: <select name="sortBy" onChange={_this.handleChange}>
          <option value="" ></option>
          <option value="firstName" >First name</option>
          <option value="lastName">Last name</option>
          <option value="teacherId">Teacher ID</option>
      </select>  

      </form>
    
      )
    }

  addTeacher(){
    ReactDOM.render(
      <React.StrictMode>
        <TeacherAdd key="add" listComp={this}/>
      </React.StrictMode>,
      document.getElementById('right')
    );   
  }

  deleteHalf(){
    let list: any[] = this.state.page.content; 
    list.splice(0,list.length/2);
    this.setState({});
  }

  editRecord(){
    console.log("editRecord logged");
  }
}
//export default TeacherList