import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import TeacherList from './TeacherList';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'core-js/es'  
import 'react-app-polyfill/ie9'  
import 'react-app-polyfill/stable'

//let testVar: string = "Haha,test";


ReactDOM.render(
  <React.StrictMode>
    <TeacherList />
  </React.StrictMode>,
  document.getElementById('root')
);


/*
ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('login')
);

*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
