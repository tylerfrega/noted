import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import NoteBookList from './components/Todo/NotebookList'
import Home from './components/Home'
import Edit from './components/Todo/Edit'
import CreateNotebook from './components/Todo/CreateNotebook'
import './App.scss'

function App() {
    return (
        <div className='app todo-container paper'>
            <Router>
                <div className='header'>
                    <Link to='/todo'>
                        Noted...
                    </Link>
                </div>
                <div>
                    <Switch>
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/todo' component={NoteBookList}></Route>
                        <Route path='/edit/:_id' component={Edit}></Route>
                        <Route path='/create' component={Edit}></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
