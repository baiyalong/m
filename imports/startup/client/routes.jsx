
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

// route components
import Root from '../../ui/layout/root.jsx'
import Home from '../../ui/layout/home.jsx'


import Login from '../../ui/page/login.jsx'

import Dashboard from '../../ui/page/dashboard.jsx'
import Image from '../../ui/page/image.jsx'
import Network from '../../ui/page/network.jsx'
import Volume from '../../ui/page/volume.jsx'
import Process from '../../ui/page/process.jsx'


const onLogin = (nextState, replace) => Meteor.userId() ? replace({ pathname: '/home' }) : null

const onHome = (nextState, replace) => !Meteor.userId() ? replace({ pathname: '/login' }) : null

const notFound = (nextState, replace) => {
    var paths = ['/', '/login', '/home', '/dashboard', '/image','/network','/volume','/process']
    if (!paths.includes(nextState.location.pathname))
        replace({ pathname: '/home' })
}


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={Root}>
            <IndexRedirect to="/login" />
            <Route path="/login" component={Login} onEnter={onLogin}/>
            <Route path="/home" component={Home} onEnter={onHome}>
                <IndexRedirect to="/dashboard" />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/image" component={Image} />
                <Route path="/network" component={Network} />
                <Route path="/volume" component={Volume} />
                <Route path="/process" component={Process} />
            </Route>
            <Route path="*" onEnter={notFound} />
        </Route>
    </Router>
)