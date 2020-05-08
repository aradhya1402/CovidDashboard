import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faFacebook , faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-solid-svg-icons';
class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
         }
    }
   
    render() {
        return (

            <div className="profile-container">
                <div className="center">
                    <div className="front-face">
                        <div className="contents front">
                            <p>Abhishek Chauhan</p>
                            <span>Business Technology Analyst</span>
                        </div>
                    </div>
                    <div className="back-face">
                        <div className="contents back">
                            <h2>Feel Free to Connect</h2>
                            <div className="icons">
                                {/* <FontAwesomeIcon icon={ faFacebook } />
                                <FontAwesomeIcon icon={ faTwitter } />
                                <FontAwesomeIcon icon={ faInstagram } />
                                <FontAwesomeIcon icon={ faLinkedinIn } /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
export default ProfileComponent;