import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import NavBarComponent from "../NavBarComponent";
import CardDeck from 'react-bootstrap/CardDeck'
import ButtonComponent from '../ButtonComponent';
import MapDropdownComponent from "../MapDropdownComponent/MapDropdownComponent";
import IndiaMapComponent from "../IndiaMapComponent/IndiaMapComponent";
import ProfileComponent from "../ProfileCard";
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
            mapDropDown : "Geographical Map",
            stateDropDown  :"Choose State",
            mapOptions : ['Geographical Map', 'Line Map', 'Some Map'],
            stateOptions : [],
            stateTotal : 0,
            stateRecovered : 0,
            stateActive : 0,
            stateDeceased : 0,
            
         }
    }
    getMapsType = () =>{

    }
    getStateData = (e) => {
        console.log("saood" )
        let valueState=e.currentTarget.innerText;
        
        let allStatesData=this.state.resultArray;
        for(let i=0;i<allStatesData.length;i++) {
            if(allStatesData[i].state==valueState) {
                this.setState({
                    stateTotal :allStatesData[i].value.total,
                    stateRecovered :allStatesData[i].value.recovered,
                    stateActive :allStatesData[i].value.active,
                    stateDeceased :allStatesData[i].value.deceased,
                    stateDropDown:valueState
                    
                })
            }

        }



    }

    changeDropdownValue=(e)=> {
        let value=e.currentTarget.innerHTML;
        this.setState({
            defaultDropdown:value
        })
    }
    getStatesData = () => {

        fetch(`https://api.covid19india.org/state_district_wise.json`)
          .then(resp => resp.json())
          .then(response => {
            
            this.setState({
              stateData: response
            })
            this.convertJSON();
          })
    
    
      }
    
      convertJSON = () => {
    
        let requiredStateData = Object.assign({}, this.state.stateData);
        
        let stateArray = Object.keys(requiredStateData);
       
        let resultArray = [];
        let districtArray = [];
        let singleObj = {};
        let districtName;
        for (let i = 0; i < stateArray.length; i++) {
          let stateName = stateArray[i];
          singleObj = Object.assign({}, {});
          singleObj.id = requiredStateData[stateName].statecode;
          singleObj.state = stateName;
          singleObj.value = Object.assign({}, {});
          singleObj.value.total = 0;
          singleObj.value.active = 0;
          singleObj.value.deceased = 0;
          singleObj.value.recovered = 0;
          singleObj.value.totalState=0;
          districtArray = Object.keys(requiredStateData[stateName].districtData);
    
          for (let j = 0; j < districtArray.length; j++) {
            districtName = districtArray[j];
            singleObj.value.total += requiredStateData[stateName].districtData[districtName].confirmed;
            singleObj.value.active += requiredStateData[stateName].districtData[districtName].active;
            singleObj.value.deceased += requiredStateData[stateName].districtData[districtName].deceased;
            singleObj.value.recovered += requiredStateData[stateName].districtData[districtName].recovered;
            // singleObj.value.totalState=requiredStateData[stateName].co;
          }
          resultArray.push(singleObj)
        }
        console.log("aradhya" + JSON.stringify(resultArray))
        this.setState({
          resultArray: resultArray,
          stateOptions:stateArray,

         

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
        this.getStatesData();

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
                    <p>Select the type of visualition : </p>
                        <MapDropdownComponent  selectedDropdownValue = {this.getMapsType} defaultDropdown = {this.state.mapDropDown} mapOptionsArr= {this.state.mapOptions}/>
                       
                    </div>
                    <div className="state-dropdown">
                    <p>Select state to view data : </p>
                        <MapDropdownComponent selectedDropdownValue = {this.getStateData} defaultDropdown ={this.state.stateDropDown}mapOptionsArr = {this.state.stateOptions}/>
                        
                    </div>
                </div>
                <div className="map-chart-state-container">
                    <div className="map-chart-container">
                        <IndiaMapComponent />
                    </div>
                    
                    <div className="state-data-container">
                        <KPICardComponent variant="Primary" kpi="Total Confirmed Cases" data_number={this.state.stateTotal} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Success" kpi="Total Recovered Cases" data_number={this.state.stateRecovered} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Warning" kpi="Total Active Cases" data_number={this.state.stateActive} lastUpdated={this.state.lastUpdated} />
                        <KPICardComponent variant="Danger" kpi="Total Deaths" data_number={this.state.stateDeceased} lastUpdated={this.state.lastUpdated} />
                    </div>
                </div>
                {/* <ButtonComponent title="Click me!" onClick={()=> {}}/> */}
                {/* <ProfileComponent/> */}
            </div>
        )

    }
}
export default HeaderComponent;