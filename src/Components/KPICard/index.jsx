import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import moment from 'moment'
import { render } from '@testing-library/react';
const imageBaseURL = 'static/img/';

function KPICardComponent(props) {
    return (

        <div className="kpi-container"> <Card>
            <Card.Header>{props.kpi}</Card.Header>

            <Card.Body class="kpi-details">
                <Card.Img class='kpi-image' variant="top" src={`${imageBaseURL}${props.variant.toLowerCase()}.png`} />
                <Card.Text class="kpi-text" >
                    {props.data_number}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated at {moment(props.lastUpdated).format("MM-DD-YYYY LT")}</small>
            </Card.Footer>
        </Card>
        </div>



    )
}

export default KPICardComponent;
//total confirmed , active ,recoverd , deaths