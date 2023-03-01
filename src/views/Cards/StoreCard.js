import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "../../assets/css/card.css";
import { useHistory } from "react-router";

// const cardsData = [
//   {
//     title: "Iphones",
//     content: "Product 1",
//     image: "./Images/img3.jpg",
//     description: "Example product #123",
//     price: "229$",
//   },
//   {
//     title: "Laptops",
//     content: "Product 2",
//     image: "./Images/img3.jpg",
//     description: "Example product #123",
//     price: "229$",
//   },
//   {
//     title: "Cameras",
//     content: "Product 3",
//     image: "./Images/img3.jpg",
//     description: "Example product #123",
//     price: "229$",
//   },
// ];

const StoreCard = ({ latestStore }) => {
  const history = useHistory();
  console.log("latestStore", latestStore);
  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <button
              type="submit"
              style={{
                backgroundColor: "blueviolet",
                border: "blueviolet",
                borderRadius: "4px",
                float: "right",
                padding: "9px 19px",
                color: "white",
              }}
              onClick={() => {
                history.push("/admin/store");
              }}
            >
              View All
            </button>
            <Card.Title as="h4">Latest Stores</Card.Title>
            <p className="card-category"></p>
          </Card.Header>
          <Card.Body>
            <div className="row">
              {latestStore.map((item, index) => (
                <Col md="4" key={index}>
                  <Card className="card">
                    <div
                      className="card-div"
                      style={{
                        backgroundColor:
                          item.is_verified == "1"
                            ? "blueviolet"
                            : item.is_verified == "0"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {item.is_verified == "1"
                        ? "Verified"
                        : item.is_verified == "0"
                        ? "In Review"
                        : "Rejected"}
                    </div>

                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${item.store_image})`,
                      }}
                    >
                      <div className="heading">
                        <h5 className="title">{item.store_name}</h5>
                        <p className="card-description paragraph">
                          {item.store_desc}
                        </p>
                      </div>
                    </div>
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
