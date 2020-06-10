import React from 'react'
import TeacherList from './TeacherList'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Link to='/'>root</Link> <br />
        <Link to='/hello'>hello</Link> <br />
        <Link to='/todolist'>todolist</Link>
        <div>
          <Route path='/'  exact render={() => {
            return <div>root page</div>
          }} />
          <Route path='/hello' render={() => {
            return <div>hello world</div>
          }} />
          <Route path='/todolist' component={TeacherList} />
        </div>
      </Router>
    </div>
  )
}

export default App