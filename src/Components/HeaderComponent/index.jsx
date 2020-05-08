import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import NavBarComponent from "../NavBarComponent";
import CardDeck from 'react-bootstrap/CardDeck'
import ButtonComponent from '../ButtonComponent';
import MapDropdownComponent from "../MapDropdownComponent/MapDropdownComponent";
import IndiaMapComponent from "../IndiaMapComponent/IndiaMapComponent";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            lastUpdated: '',
            confirmedCases: '',
            activeCases: '',
            recoveredCases: '',
            deaths: '',
            mapDropDown : "",
            stateDropDown  :" ",
            mapOptions : ["A","B"],
            stateOptions : ["C" , "D"]

        }
    }
    getMapsType = () =>{

    }
    getStateData = () => {

    }
    changeDropdownValue=(e)=> {
        let value=e.currentTarget.innerHTML;
        this.setState({
            defaultDropdown:value
        })
    }
    getNationalData = () => {

        fetch("https://api.rootnet.in/covid19-in/stats/latest")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson,
                    lastUpdated: responseJson.lastOriginUpdate,
                    confirmedCases: responseJson.data.summary.total,
                    activeCases: responseJson.data.summary.total - responseJson.data.summary.discharged,
                    recoveredCases: responseJson.data.summary.discharged,
                    deaths: responseJson.data.summary.deaths
                })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    componentDidMount() {
        this.getNationalData();
    }

    render() {
        return (

            <div className="header-container">

                <NavBarComponent />
                <CardDeck>
                    <KPICardComponent variant="Primary" kpi="Total Confirmed Cases" data_number={this.state.confirmedCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Success" kpi="Total Recovered Cases" data_number={this.state.recoveredCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Warning" kpi="Total Active Cases" data_number={this.state.activeCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Danger" kpi="Total Deaths" data_number={this.state.deaths} lastUpdated={this.state.lastUpdated} />
                </CardDeck>
                <div className="dropdown-header-container">
                    <div className="map-demo-dropdown">
                        <MapDropdownComponent  selectedDropdownValue = {this.getMapsType} defaultDropdown = {this.state.mapDropDown} mapOptionsArr= {this.state.mapOptions}/>
                    </div>
                    <div className="state-dropdown">
                        <MapDropdownComponent selectedDropdownValue = {this.getStateData} defaultDropdown ={this.state.stateDropDown}mapOptionsArr = {this.state.stateOptions}/>
                    </div>
                </div>
                <div className="map-chart-state-container">
                    <div className="map-chart-container">
                        <IndiaMapComponent />
                    </div>
                    <div className="state-data-container">
                        <KPICardComponent variant="Primary" kpi="Total Confirmed Cases" data_number={this.state.confirmedCases} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Success" kpi="Total Recovered Cases" data_number={this.state.recoveredCases} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Warning" kpi="Total Active Cases" data_number={this.state.activeCases} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Danger" kpi="Total Deaths" data_number={this.state.deaths} lastUpdated={this.state.lastUpdated} />
                    </div>
                </div>
                {/* <ButtonComponent title="Click me!" onClick={()=> {}}/> */}
            </div>
        )

    }
}
export default HeaderComponent;