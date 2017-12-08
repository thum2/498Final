import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Search from './components/Search/Search.jsx';
import LostPage from './components/LostPage/LostPage.jsx';
import FoundPage from './components/FoundPage/FoundPage.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Notifications from './components/Notifications/Notifications.jsx';
import DetailView from './components/DetailView/DetailView.jsx'
import FoundGallery from './components/FoundGallery/FoundGallery.jsx'
import styles from './styles/main.scss';

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/lostpage" component={LostPage}/>
            <Route exact path="/foundpage" component={FoundPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
			<Route exact path="/detailview/:id" component={DetailView}/>
            <Route exact path="/petsfound" component={FoundGallery}/>
			<Route exact path="/notifications" component={Notifications}/>
        </Switch>    
    </Router>,
    document.getElementById('react-app')
);
