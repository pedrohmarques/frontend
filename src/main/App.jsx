import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import React from 'react'
import {BrowserRouter} from 'react-router-dom'


import Routes from './Routes'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Routes></Routes>
            <NotificationContainer/>
        </div>
    </BrowserRouter>

    