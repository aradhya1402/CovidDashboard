
import React, { Component } from 'react';
import {
  ComposableMap, Geographies, Geography
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { withRouter } from "react-router-dom";


const INDIA_TOPO_JSON = require('./indiatopo.json');
// Red Variants

const DEFAULT_COLOR = 'brown';

const PROJECTION_CONFIG = {
  scale: 500,
  center: [85, 20],
  rotation: [-11, 0, 0],
};
const geographyStyle = {
  default: {
    outline: 'black'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

class IndiaMapComponent extends Component {
  constructor(props) {

    super(props);
    this.state = {
      stateData: {},
      resultArray: [],
      tooltipContent: '',
      setTooltip: '',
    
    }
    this.setTooltipContent = this.setTooltipContent.bind(this)

  }


  showTooltip = (geo, current = { value: 'NA' }) => {
    let name = (geo.properties.name)
    return () => {

      this.setTooltipContent(name, current);

    };

  }
  hideTooltip() {
    return () => {
      this.setTooltipContent('');

    };
  }
  setTooltipContent = (name, current = { value: 'NA' }) => {
    let numberValue = current.value.total !== undefined ? name + ' : ' + current.value.total : '';

    this.setState({ setTooltip: numberValue })

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
    console.log(stateArray)
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
      districtArray = Object.keys(requiredStateData[stateName].districtData);

      for (let j = 0; j < districtArray.length; j++) {
        districtName = districtArray[j];
        singleObj.value.total += requiredStateData[stateName].districtData[districtName].confirmed;
        singleObj.value.active += requiredStateData[stateName].districtData[districtName].active;
        singleObj.value.deceased += requiredStateData[stateName].districtData[districtName].deceased;
        singleObj.value.recovered += requiredStateData[stateName].districtData[districtName].recovered;
      }
      resultArray.push(singleObj)
    }
    this.setState({
      resultArray: resultArray
    })
  }
  colorRange = (stateNumbers) => {
    // let stateNumbers=this.state.resultArray.value.total;
    let color;

    if (stateNumbers > 0 && stateNumbers <= 20) {
      color = '#FEE8D6';

    }
    else if (stateNumbers > 20 && stateNumbers <= 100) {
      color = '#FFDAB9';

    }
    else if (stateNumbers > 100 && stateNumbers <= 500) {
      color = '#FFCC99';

    }
    else if (stateNumbers > 500 && stateNumbers < 1000) {
      color = '#FFA54F';

    }
    else if (stateNumbers > 1000 && stateNumbers < 3000) {
      color = '#EE7621';

    }
    else if (stateNumbers > 3000 && stateNumbers < 5000) {
      color = '#FF6600';

    }
    else if (stateNumbers > 5000) {
      color = '#CD3700';

    }
    return color;
  }

  componentDidMount = () => {
    this.getStatesData();
    this.setTooltipContent();

  }

  render() {
    return (
      <div className="india-map">
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={400}
          height={400}
          data-tip=""
          style={{ width: "100%", height: "auto" }} 
        >

          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = this.state.resultArray.find(s => s.id === geo.id);
                return (

                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? this.colorRange(current.value.total) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={this.showTooltip(geo, current)}
                    onMouseLeave={this.hideTooltip()}

                  />
                );

              })

            }


          </Geographies>
          
        </ComposableMap>
        <ReactTooltip >
          {this.state.setTooltip}
        </ReactTooltip>
        
        </div>
    )
  }
}
export default withRouter(IndiaMapComponent);