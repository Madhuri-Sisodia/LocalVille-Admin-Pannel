import React, { useState } from 'react';
import { Panel, Placeholder, Row, Col } from 'rsuite';
import Category from './Category';
import "../../assets/css/admin.css";
import SubCategory from './SubCategory';

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

          <Col md={6} sm={12}>
            <Card bordered header="Section" className="Categorycards"
               />
              
          </Col>

          {/* <Col md={6} sm={12} >
            <Card bordered header=" Store Categories" className="Categorycards"
               />
          </Col> */}
        </Row>
        <br />
        <br />
        {/* <Gap/> */}
        <Row>
          

          {/* <Col md={6} sm={12} >
            <Card bordered header="Attributes" className="Categorycards"
          />
          </Col> */}
        </Row>
<br/>

        {selectedItem==1 && <Category/>}
        {selectedItem==2 && <SubCategory/>}
      
    </div>
  )
}

export default index;