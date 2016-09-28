import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import AppContent from './components/AppContent';

import 'font-awesome/css/font-awesome.css';
import 'app.less';

ReactDOM.render(<AppContent/>,
    document.getElementById('app-content')
);
