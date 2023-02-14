import React, { useState } from 'react';
import { Panel, Placeholder, Row, Col } from 'rsuite';
import Category from './Category';
import "../../assets/css/admin.css";


const Card = (props, {onClick}) => (
  <Panel {...props} 
  onClick={onClick}
   >
    <Placeholder.Paragraph />
    <Placeholder.Paragraph />
  </Panel>
);

function index() {
  const [state, setstate] = useState("");

  const handleClick = () => {

  }

  return (
    <div className='MainContainer'>
     
        <Row>
          <Col md={6} sm={12}>
            <Card bordered header="Categories" className="Categorycards"
             onClick={()=>alert("1") }
            cardid="1"

            />
          </Col>
          
          <Col md={6} sm={12}>
            <Card bordered header="Sub Categories" className="Categorycards"
              />
          </Col>

          <Col md={6} sm={12} >
            <Card bordered header=" Store Categories" className="Categorycards"
               />
          </Col>
        </Row>
        <br />
        <br />
        {/* <Gap/> */}
        <Row>
          <Col md={6} sm={12}>
            <Card bordered header="Card title" className="Categorycards"
               />
              
          </Col>

          <Col md={6} sm={12} >
            <Card bordered header="Card title" className="Categorycards"

          />
          </Col>
        </Row>
      
    </div>
  )
}

export default index;