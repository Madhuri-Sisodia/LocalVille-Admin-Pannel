import React, { useState } from "react";
import { Panel, Placeholder, Row, Col } from "rsuite";
import Category from "./Category";
import "../../assets/css/admin.css";
import SubCategory from "./SubCategory";
import Section from "./Section";
import SizeAttribute from "./SizeAttribute";
import Size from "./Size";
import Color from "./Color";

function index() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = () => {};
  const Card = (props) => {
    return (
      <div className="CategoryCardSection">
        <Panel {...props}>
          <Placeholder.Paragraph />
        </Panel>
      </div>
    );
  };

  return (
    <div className="MainContainer">
      <div className="CategoryCardSection1">
        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Section"
            className="Categorycards"
            onClick={() => setSelectedItem(1)}
          />
        </Col>

        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Categories"
            className="Categorycards"
            cardid="1"
            onClick={() => setSelectedItem(2)}
          />
        </Col>

        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Sub Categories"
            className="Categorycards"
            onClick={() => setSelectedItem(3)}
          />
        </Col>
      </div>
      <br />
      <div className="CategoryCardSection1">
        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Size Attribute"
            className="Categorycards"
            onClick={() => setSelectedItem(4)}
          />
        </Col>

        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Size"
            className="Categorycards"
            onClick={() => setSelectedItem(5)}
          />
        </Col>

        <Col lg="6" md="12" sm="12" xs="24">
          <Card
            bordered
            header="Color"
            className="Categorycards"
            onClick={() => setSelectedItem(6)}
          />
        </Col>
      </div>

      <br />
      {selectedItem == 1 && <Section />}
      {selectedItem == 2 && <Category />}
      {selectedItem == 3 && <SubCategory />}
      {selectedItem == 4 && <SizeAttribute />}
      {selectedItem == 5 && <Size />}
      {selectedItem == 6 && <Color />}
    </div>
    // </div>
  );
}

export default index;
