// import React, { useState } from "react";
// import { Card, Col, Row, Button } from "react-bootstrap";
// import "../../assets/css/card.css";
// import { useHistory } from "react-router";
// import { FaRupeeSign } from "react-icons/fa";
// import ProductDetailModel from "./ProductDetailModel";

// // const cardsData = [
// //   {
// //     title: "Iphones",
// //     content: "Product 1",
// //     image: "./Images/img3.jpg",
// //     description: "Example product #123",
// //     price: "229$",
// //   },
// //   {
// //     title: "Laptops",
// //     content: "Product 2",
// //     image: "./Images/img3.jpg",
// //     description: "Example product #123",
// //     price: "229$",
// //   },
// //   {
// //     title: "Cameras",
// //     content: "Product 3",
// //     image: "./Images/img3.jpg",
// //     description: "Example product #123",
// //     price: "229$",
// //   },
// // ];

// const ProductCard = ({ latestProduct }) => {
//   const history = useHistory();
//   const [showProductDetail, setShowProductDetail] = useState(false);
//   const [rowData, setRowData] = useState(false);

//   return (
//     <Row>
//       <Col md="12">
//         <Card>
//           <Card.Header>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "blueviolet",
//                 border: "blue",
//                 borderRadius: "4px",
//                 float: "right",
//                 padding: "9px 19px",
//                 color: "white",
//               }}
//               onClick={() => {
//                 history.push("/admin/product");
//               }}
//             >
//               View All
//             </button>

//             <Card.Title as="h4">Latest Products</Card.Title>
//             <p className="card-category"></p>
//           </Card.Header>
//           {latestProduct.length == 0 ? (
//             <p>No data available</p>
//           ) : (
//             <Card.Body>
//               <div className="row">
//                 {latestProduct.map((item, index) => (
//                   <Col md="4" key={index}>
//                     <Card className="card">
//                       <div
//                         className="card-div"
//                         style={{
//                           backgroundColor:
//                             item.is_verified == "1"
//                               ? "#76cbac"
//                               : item.is_verified == "0"
//                               ? "orange"
//                               : "red",
//                         }}
//                       >
//                         {item.is_verified == "1"
//                           ? "Verified"
//                           : item.is_verified == "0"
//                           ? "Pending"
//                           : "Rejected"}
//                       </div>

//                       <div
//                         className="image"
//                         style={{
//                           backgroundImage: `url('${item.theme_img}')`,
//                         }}
//                         onClick={() => {
//                           setShowProductDetail(true);
//                           setRowData(item);
//                         }}
//                       >
//                         <div className="heading">
//                           <div className="price">
//                             <FaRupeeSign />
//                             {item.price}
//                           </div>
//                           <h5 className="title">{item.product_name}</h5>

//                           <p className="card-description paragraph">
//                             {item.product_desc}
//                           </p>
//                           <p className="card-description paragraph">
//                             {item.p_created}
//                           </p>
//                         </div>
//                       </div>
//                     </Card>
//                   </Col>
//                 ))}
//               </div>
//             </Card.Body>
//           )}
//         </Card>
//       </Col>
//       <ProductDetailModel
//         showProductDetail={showProductDetail}
//         setShowProductDetail={setShowProductDetail}
//         rowData={rowData}
//       />
//     </Row>
//   );
// };

// export default ProductCard;



import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "../../assets/css/card.css";
import { useHistory } from "react-router";
import { FaRupeeSign } from "react-icons/fa";
import ProductDetailModel from "./ProductDetailModel";
import iPhoneImage from "../../assets/Images/img3.jpg";

const ProductCard = () => {
  const history = useHistory();
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [rowData, setRowData] = useState(null);

  // Dummy product data
  const dummyProducts = [
    {
      product_name: "iPhone 13",
      product_desc: "Latest Apple iPhone with A15 Bionic chip",
      price: "999",
      theme_img: iPhoneImage, 
      is_verified: "1",
      p_created: "2024-01-15",
    },
    {
      product_name: "MacBook Pro",
      product_desc: "Apple MacBook Pro 16-inch with M1 Max chip",
      price: "2499",
      theme_img: "./Images/macbook.jpg",
      is_verified: "1",
      p_created: "2024-02-05",
    },
    {
      product_name: "Canon EOS R5",
      product_desc: "High-performance mirrorless camera from Canon",
      price: "3899",
      theme_img: "./Images/canon-r5.jpg",
      is_verified: "1",
      p_created: "2024-03-10",
    },
  ];

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
                history.push("/admin/product");
              }}
            >
              View All
            </button>

            <Card.Title as="h4">Product Showcase</Card.Title>
            <p className="card-category">Check out our exclusive products</p>
          </Card.Header>
          <Card.Body>
            <div className="row">
              {dummyProducts.map((item, index) => (
                <Col md="4" key={index}>
                  <Card className="card">
                    <div
                      className="card-div"
                      style={{
                        backgroundColor:
                          item.is_verified === "1"
                            ? "#76cbac"
                            : item.is_verified === "0"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {item.is_verified === "1"
                        ? "Verified"
                        : item.is_verified === "0"
                        ? "Pending"
                        : "Rejected"}
                    </div>

                    <div
                      className="image"
                      style={{
                        backgroundImage: `url('${item.theme_img}')`,
                      }}
                      onClick={() => {
                        setShowProductDetail(true);
                        setRowData(item);
                      }}
                    >
                      {console.log("IIII",item.theme_img)}
                      <div className="heading">
                        <div className="price">
                          <FaRupeeSign />
                          {item.price}
                        </div>
                        <h5 className="title">{item.product_name}</h5>

                        <p className="card-description paragraph">
                          {item.product_desc}
                        </p>
                        <p className="card-description paragraph">
                          {item.p_created}
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
      {rowData && (
        <ProductDetailModel
          showProductDetail={showProductDetail}
          setShowProductDetail={setShowProductDetail}
          rowData={rowData}
        />
      )}
    </Row>
  );
};

export default ProductCard;

