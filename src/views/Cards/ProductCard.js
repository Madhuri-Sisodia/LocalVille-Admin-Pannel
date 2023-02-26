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

const ProductCard = ({ latestProduct }) => {
  console.log("latestProduct", latestProduct);

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
                history.push("/admin/store");
              }}
            >
              View All
            </Button>
            <Card.Title as="h4">Latest Products</Card.Title>
            <p className="card-category"></p>
          </Card.Header>
          <Card.Body>
            <div className="row">
              {latestProduct.map((item, index) => (
                <Col md="4" key={index}>
                  <Card
                    style={{
                      padding: "5px 5px 5px 5px",
                      borderRadius: "20px 20px 20px 20px",
                      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.p_images}
                      alt="Image"
                      style={{
                        height: "200px",
                        borderRadius: "10px",
                        color: "blueviolet",
                      }}
                    />
                    <Card.Body>
                      <Card.Title
                        as="h5"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {item.product_name}
                      </Card.Title>
                      <p
                        className="card-description"
                        style={{
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.product_desc}
                      </p>

                      <div
                        style={{
                          float: "left",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          color: "blueviolet",
                        }}
                      >
                        {item.price}$
                      </div>
                      {/* <div className="icons">
                        <button className="minus">-</button>
                        <div style={{ marginRight: "10px" }}>1</div>
                        <button className="plus">+</button>
                      </div> */}
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        {item.is_verified == "1"
                          ? "Verified"
                          : item.is_verified == "0"
                          ? "Pending"
                          : "Rejected"}
                      </div>
                    </Card.Footer>

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

export default ProductCard;
