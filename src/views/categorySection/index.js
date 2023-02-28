import React, { useState } from 'react';
import { Panel, Placeholder, Row, Col } from 'rsuite';
import Category from './Category';
import "../../assets/css/admin.css";
import SubCategory from './SubCategory';
import Section from'./Section';

function index() {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = () => {

  }
  const Card = (props) => {
    return(
      <Panel {...props}>
      <Placeholder.Paragraph />
    </Panel>
    )
  };
  

  return (
    <div className='MainContainer'>
     
        <Row>
          <Col md={6} sm={12}>
            <Card bordered header="Categories" className="Categorycards"
            cardid="1"
            onClick={()=>setSelectedItem(1)}
            />
          </Col>
          
          <Col md={6} sm={12}>
            <Card bordered header="Sub Categories" className="Categorycards"
              onClick={()=>setSelectedItem(2)}
              />
          </Col>

          <Col md={6} sm={12} >
            <Card bordered header=" Store Categories" className="Categorycards" onClick={()=>setSelectedItem(3)}
               />
          </Col>
        </Row>
        <br />
        <br />
        {/* <Gap/> */}
        <Row>
          <Col md={6} sm={12}>
            <Card bordered header="Section" className="Categorycards" onClick={()=>setSelectedItem(4)}
               />
              
          </Col>

          <Col md={6} sm={12} >
            <Card bordered header="Attributes" className="Categorycards" onClick={()=>setSelectedItem(5)}
          />
          </Col>
        </Row>
<br/>

        {selectedItem==1 && <Category/>}
        {selectedItem==2 && <SubCategory/>}
        {selectedItem==4 && <Section/>}
      
    </div>
  )
}

export default index;