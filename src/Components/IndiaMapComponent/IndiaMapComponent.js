
import React, {Component} from 'react';
import { 
    ComposableMap, Geographies, Geography 
  } from 'react-simple-maps';
  import { StatefulToolTip } from "react-portal-tooltip"


  const INDIA_TOPO_JSON = require('./indiatopo.json');
  // Red Variants

  const DEFAULT_COLOR = 'brown';

  const PROJECTION_CONFIG = {
    scale: 350,
    center: [100.9629, 22.5937]
  };
  const geographyStyle = {
    default: {
      outline: 'none'
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
  
  
// const [tooltipContent, setTooltipContent] = useState('')
class IndiaMapComponent extends Component {
    constructor(props){
        super(props);
            this.state={
                stateData:{},
                resultArray:[],
                tooltip:false,
                setTooltipContent:'',

            }
        
    }
    
    showTooltip() {
      if(!this.state.tooltip) {
      this.setState({tooltip: true})
      }
  }
  hideTooltip() {
      this.setState({tooltip: false})
  }

    getStatesData =() => {

        fetch(`https://api.covid19india.org/state_district_wise.json`)
        .then(resp => resp.json())
        .then(response => {
           
           this.setState({
               stateData:response
           })
           this.convertJSON();
        })
        

    }

    convertJSON =()=> {

        let requiredStateData=Object.assign({},this.state.stateData);
        let stateArray=Object.keys(requiredStateData);
        let resultArray=[];
        let districtArray=[];
        let singleObj={};
        let districtName;
        for(let i=0;i<stateArray.length;i++) {
            let stateName=stateArray[i];
            singleObj=Object.assign({},{});
            singleObj.id=requiredStateData[stateName].statecode;
            singleObj.state=stateName;
            singleObj.value=Object.assign({},{});
            singleObj.value.total=0;
            singleObj.value.active=0;
            singleObj.value.deceased=0;
            singleObj.value.recovered=0;
            districtArray=Object.keys(requiredStateData[stateName].districtData);
            
            for(let j=0;j<districtArray.length;j++) {
                districtName=districtArray[j];
                singleObj.value.total+=requiredStateData[stateName].districtData[districtName].confirmed;
                singleObj.value.active+=requiredStateData[stateName].districtData[districtName].active;
                singleObj.value.deceased+=requiredStateData[stateName].districtData[districtName].deceased;
                singleObj.value.recovered+=requiredStateData[stateName].districtData[districtName].recovered;
            }
            resultArray.push(singleObj)
        }
        this.setState({
            resultArray:resultArray
        })
    }
    colorRange=(stateNumbers)=> {
      // let stateNumbers=this.state.resultArray.value.total;
      let color;

      if(stateNumbers>0 && stateNumbers<=20) {
        color='#FEE8D6';

      }
     else if(stateNumbers>20 && stateNumbers<=100) {
        color='#FFDAB9';

      }
     else if(stateNumbers>100 && stateNumbers<=500) {
        color='#FFCC99';

      }
      else if(stateNumbers>500 && stateNumbers<1000) {
        color='#FFA54F';

      }
      else if(stateNumbers>1000 && stateNumbers<3000 ) {
        color='#EE7621';

      }
      else if(stateNumbers>3000 && stateNumbers<5000 ) {
        color='#FF6600';

      }
      else if(stateNumbers>5000  ) {
        color='#CD3700';

      }
      return color;
    }

    componentDidMount=() => {
        this.getStatesData();
       
    }

    render() {
      const button = <span>Hover me to display the tooltip</span>
      // const tooltipContent, setTooltipContent = '';
        // const gradientData = {
        //     fromColor: COLOR_RANGE[0],
        //     toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
        //     min: 0,
        //     max: this.state.resultArray.reduce((max, item) => (item.value > max ? item.value : max), 0)
        //   };
       console.log("hello " +this.state.setTooltipContent)
        return (
            <div>
              {/* <ReactTooltip>{this.state.setTooltipContent}</ReactTooltip> */}
              
              
               
                 <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
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
                    // onMouseLeave={this.onMouseLeave()}
                  
                  />
                 
          
                );

               
                    
              })

            }
            
             
        </Geographies>
        
        </ComposableMap>
        {/* <StatefulToolTip parent={ button }>
    Stateful Tooltip content here!
  </StatefulToolTip> */}
        {/* {this.state.tooltip==true? <div>Aradhya</div> : ''} */}
       
        
   
            </div>
        )
    }
}
export default IndiaMapComponent;