import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/navbarlogo.png";

function NavBarComponent(props) {
    return (
        // <>  
        // <Navbar bg="light" variant="light">
        //     <Navbar.Brand href="#home">
        //     <img
        //         alt=""
        //         src="/navbarlogo.png"
        //         width="70"
        //         height="70"
        //         className="d-inline-block align-top"
        //     />{' '}
        //     </Navbar.Brand>
        //     COVID-19 Dashboard INDIA
        // </Navbar>
        // </>
        <div className="logo-container">
            <div className="main-logo-container"><img src={logo} />
                    COVID-19 Dashboard INDIA
                </div>
        </div>
    )
}

export default NavBarComponent;
