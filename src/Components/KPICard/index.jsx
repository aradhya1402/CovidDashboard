import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { render } from '@testing-library/react';
const imageBaseURL = 'static/img/';

function KPICardComponent (props){
                return( 
                <>  
                <Card
                    border={props.variant.toLowerCase()}
                    //text={props.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}
                >
                    <Card.Header>{props.kpi}</Card.Header>
                    <Card.Img class="kpi-image" variant="top" src={`${imageBaseURL}${props.variant.toLowerCase()}.png`}  />
                    <Card.Body>
                
                    <Card.Text class="kpi-text" >
                                {props.data_number}
                    </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                </>
            

     )}

export default KPICardComponent;
//total confirmed , active ,recoverd , deaths 