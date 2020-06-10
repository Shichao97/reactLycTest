import * as React from 'react';
import ReactDOM from 'react-dom';
import TeacherEdit from './TeacherEdit';
import TeacherAdd from './TeacherAdd';
import './Login.css';
import logo from './logo.svg';
import jquery from "jquery";
const $ = jquery;



export default class Login extends React.Component<any,any> {
    constructor(props:any){
        super(props);
    }


    componentWillMount(){
        this.handleClick();
    }   

    handleClick(){
        /*
        ReactDOM.render(
               <div />,
             document.getElementById('login')
          );
          */
         $("#login").css("visibility","hidden")
    }

    render(){
        return <div className="App">
        
            <main  className="App-header">
            <input type="text" name="test" />
            <input type="text" name="test2" />
            <input type="text" name="test3" />
            <input type="text" name="test4" />
            <p>Hello world who am import  from "module";</p>
            <input type="button" value="Close" onClick={() => this.handleClick()}/>
            </main>
            
        </div>
    }
}