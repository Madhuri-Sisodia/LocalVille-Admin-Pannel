import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "../../assets/css/card.css";
import { useHistory } from "react-router";
import { FaRupeeSign } from "react-icons/fa";
import ProductDetailModel from "./ProductDetailModel";

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
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [rowData, setRowData] = useState(false);

  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <button
              type="submit"
              style={{
                backgroundColor: "blueviolet",
                border: "blue",
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

            <Card.Title as="h4">Latest Products</Card.Title>
            <p className="card-category"></p>
          </Card.Header>
          <Card.Body>
            <div className="row">
              {latestProduct.map((item, index) => (
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
                        ? "Pending"
                        : "Rejected"}
                    </div>

                    <div
                      className="image"
                      style={{ backgroundImage: `url(${item.p_images})` }}
                      onClick={() => {
                        setShowProductDetail(true);
                        setRowData(item);
                      }}
                    >
                      {console.log("item", item)}
                      <div className="heading">
                        <div className="price">
                          <FaRupeeSign />
                          {item.price}
                        </div>
                        <h5 className="title">{item.product_name}</h5>

                        <p className="card-description paragraph">
                          {item.product_desc}
                        </p>
                        <p className="card-description paragraph">{item.p_created}</p>
                        
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
      <ProductDetailModel
        showProductDetail={showProductDetail}
        setShowProductDetail={setShowProductDetail}
        rowData={rowData}
      />
    </Row>
  );
};

export default ProductCard;
