import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import NavBarComponent from "../NavBarComponent";
import CardDeck from 'react-bootstrap/CardDeck'
import ButtonComponent from '../ButtonComponent'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[],
            lastUpdated: '',
            confirmedCases:'',
            activeCases:'',
            recoveredCases:'',
            deaths:''

        }
    }

    componentDidMount(){
        fetch("https://api.rootnet.in/covid19-in/stats/latest")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson,
           lastUpdated: responseJson.lastOriginUpdate,
           confirmedCases:responseJson.data.summary.total,
           activeCases:responseJson.data.summary.total - responseJson.data.summary.discharged,
           recoveredCases:responseJson.data.summary.discharged,
           deaths:responseJson.data.summary.deaths
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }

    render() {
        return (

            <div className="header-container">

                <NavBarComponent/>
                <CardDeck>
                    <KPICardComponent variant="Primary" kpi="Total Confirmed Cases" data_number={this.state.confirmedCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Success" kpi="Total Recovered Cases" data_number={this.state.recoveredCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Warning" kpi="Total Active Cases" data_number={this.state.activeCases} lastUpdated={this.state.lastUpdated} />
                    <KPICardComponent variant="Danger" kpi="Total Deaths" data_number={this.state.deaths} lastUpdated={this.state.lastUpdated}/>
                </CardDeck>
                {/* <ButtonComponent title="Click me!" onClick={()=> {}}/> */}
            </div>
        )

    }
}
export default HeaderComponent;