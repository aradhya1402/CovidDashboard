import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import CardDeck from 'react-bootstrap/CardDeck'
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (

            <div className="header-container">
                <CardDeck>
                    <KPICardComponent variant="Primary" kpi="Total Confirmed Cases" data_number="321" />
                    <KPICardComponent variant="Success" kpi="Total Recovered Cases" data_number="123" />
                    <KPICardComponent variant="Warning" kpi="Total Active Cases" data_number="32" />
                    <KPICardComponent variant="Danger" kpi="Total Deaths" data_number="32" />
                </CardDeck>
            </div>
        )

    }
}
export default HeaderComponent;