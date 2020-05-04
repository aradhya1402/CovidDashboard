import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import ButtonComponent from '../ButtonComponent'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (

            <div className="header-container">
                <ButtonComponent title="Click me!" onClick={()=> {}}/>
            </div>
        )

    }
}
export default HeaderComponent;