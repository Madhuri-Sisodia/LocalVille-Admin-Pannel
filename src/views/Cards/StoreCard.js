import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "../../assets/css/card.css";
import {useHistory} from "react-router-dom";

const cardsData = [
  {
    title: "Iphones",
    content: "Product 1",
    image: "./Images/img3.jpg",
    description: "Example product #123",
    price: "229$",
  },
  {
    title: "Laptops",
    content: "Product 2",
    image: "./Images/img3.jpg",
    description: "Example product #123",
    price: "229$",
  },
  {
    title: "Cameras",
    content: "Product 3",
    image: "./Images/img3.jpg",
    description: "Example product #123",
    price: "229$",
  },
];

const StoreCard = () => {

  const history = useHistory();
  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
          <Button
                  className="btn-fill float-right"
                  style={{
                    backgroundColor: "blueviolet",
                    borderColor: "blueviolet",
                  }}
                  type="submit"
                  onClick={() => {
                    history.push("/admin/store")
                  }}
                >
                 View All
                </Button>
            <Card.Title as="h4">Latest Store</Card.Title>
            <p className="card-category"></p>
          </Card.Header>
          <Card.Body>
            <div className="row">
              {cardsData.map((card, index) => (
                <Col md="4" key={index}>
                  <Card
                    style={{
                      padding: "5px 5px 5px 5px",
                      borderRadius: "20px 20px 20px 20px",
                    }}
                  >
                    <Card.Img variant="top" src={card.image} />
                    <Card.Body>
                      <Card.Title
                        as="h4"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {card.title}
                      </Card.Title>
                      <p className="card-description">{card.description}</p>

                      <div
                        style={{
                          float: "left",
                          fontWeight: "bold",
                          color: "blueviolet",
                        }}
                      >
                        {card.price}
                      </div>
                      {/* <div className="icons">
                        <button className="minus">-</button>
                        <div style={{ marginRight: "10px" }}>1</div>
                        <button className="plus">+</button>
                      </div> */}
                    </Card.Body>

                    {/* <div className="card-buttons">
                      <Button
                        className="btn-btn-primary btn-round float-left"
                        style={{
                          color: "blueviolet",
                          borderColor: "blueviolet",
                          marginLeft: "10px",
                          marginBottom: "8px",
                        }}
                        type="submit"
                      >
                        Add To Cart
                      </Button>

                      <Button
                        className="btn-fill btn-round float-right"
                        style={{
                          backgroundColor: "blueviolet",
                          borderColor: "blueviolet",
                          marginRight: "10px",
                          marginBottom: "8px",
                        }}
                        type="submit"
                      >
                        Buy Now
                      </Button>
                    </div> */}
                  </Card>
                </Col>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StoreCard;
