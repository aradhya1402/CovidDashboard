import React, { Component } from 'react';
import KPICardComponent from "../KPICard";
import ButtonComponent from '../ButtonComponent'
import DropdownComponent from '../DropdownComponent';
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [
                {
                  id: 0,
                  title: 'Uttar Pradesh',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 1,
                  title: 'Maharashtra',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 2,
                  title: 'Kerala',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 3,
                  title: 'Gujarat',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 4,
                  title: 'Punjab',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 5,
                  title: 'Andhra Pradesh',
                  selected: false,
                  key: 'location'
                }
                
              ],
            selectedValue : "check",
            chartType: [
                {
                  id: 1,
                  title: 'Line graph',
                  selected: false,
                  key: 'chartType'
                },
                {
                  id: 2,
                  title: 'Map demographics',
                  selected: false,
                  key: 'chartType'
                }
            ]
        }
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]));
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        this.setState({
          [key]: temp,
          //selectedValue: temp[id]
        });
    }

    render() {
        return (

            <div className="header-container">
                <ButtonComponent title="Click me!" onClick={()=> {}}/>
                <Dropdown
                    title="Select state"
                    list={this.state.location}
                    resetThenSet={this.resetThenSet}/>
                <Dropdown
                    title="Chart Types"
                    list={this.state.chartType}
                    resetThenSet={this.resetThenSet}/>
                {this.state.selectedValue}
            </div>
        )

    }
}
export default HeaderComponent;