import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (

            <div className="header-container">
                <KPICardComponent data="Hello" />
            </div>
        )

    }
}
export default HeaderComponent;