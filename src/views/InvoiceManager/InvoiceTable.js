import React from "react";
import { InvoiceData } from "views/InvoiceManager/InvoiceComponant";
const InvoiceTable = () => {
  function ImageUploader() {
    const [image, setImage] = useState(null);
    const handleImageChange = async (event) => {
      if (event.target.files && event.target.files[0]) {
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        try {
          const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            const imageURL = await response.json();
            setImage(imageURL);
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
    return (
      <div>
        {image && <img src={image} alt="Preview" />}
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
    );
  }

  return (
    <>
      <InvoiceData />
    </>
  );
};

export default InvoiceTable;
