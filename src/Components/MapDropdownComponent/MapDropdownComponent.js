import React, {Component} from 'react';
import arrow from './arrowDown.svg';
import { withRouter } from "react-router-dom";

class MapDropdownComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            defaultDropdown:'Geographical Map',
            showDropdown: false,
            mapOptionsArr:['Geographical Map', 'Line Map', 'Some Map'],
            selectedMap:''
        }
    }

    openDropdownBox =()=> {
        this.setState({
            showDropdown:!this.state.showDropdown,
            
        })

    }
    

    render() {
        return(
            <div>
           
            <div className="map-dropdown " onClick={this.openDropdownBox}>
            <div className="map-name">{this.props.defaultDropdown} </div>
            <img src={arrow} className="down-arrow"></img>
            
            </div>
            {this.state.showDropdown ? <div className='map-options' >
                {this.props.mapOptionsArr.map(item=> {
                    return (
                        <div onClick={(e)=>{this.changeDropdownValue(e);this.props.selectedDropdownValue(e)}}>{item}</div>
                    )
                })}
                </div>: null }
               
           
            </div>
        )
    }


}
export default withRouter(MapDropdownComponent);