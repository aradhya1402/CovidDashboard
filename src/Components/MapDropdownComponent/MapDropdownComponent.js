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
    changeDropdownValue=(e)=> {
        let value=e.currentTarget.innerHTML;
        this.setState({
            defaultDropdown:value
        })
    }
    selectedDropdownValue=(e)=> {
        if (e.currentTarget.innerText === 'Geographical Map') {
            this.props.history.push({
                pathname: '/indiaMap',
            });
        }
        else if(e.currentTarget.innerText==='Line Map') {
            this.props.history.push({
                pathname:'/lineMap'
            })
        }

    }
    

    render() {
        return(
            <div>
           
            <div className="map-dropdown " onClick={this.openDropdownBox}>
            <div className="map-name">{this.state.defaultDropdown} </div>
            <img src={arrow} className="down-arrow"></img>
            
            </div>
            {this.state.showDropdown ? <div className='map-options' >
                {this.state.mapOptionsArr.map(item=> {
                    return (
                        <div onClick={(e)=>{this.changeDropdownValue(e);this.selectedDropdownValue(e)}}>{item}</div>
                    )
                })}
                </div>: null }
               
           
            </div>
        )
    }


}
export default withRouter(MapDropdownComponent);