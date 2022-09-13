import React, { Component } from 'react';
import { Navbar } from 'reactstrap';

class Header extends Component {
    render() {
        return <Navbar color="dark" dark expand="md">
            <h2 style={{ color: "white" }}>Circuit Clinical Developer's Challenge</h2>
        </Navbar>;
    }
}

export default Header;
