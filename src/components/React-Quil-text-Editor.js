import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const MyComponent = ({ setMessage, message }) => {
  const [input, setInput] = useState("");
  return (
    <div className="text-editor" style={{ paddingBottom: "20px" }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={message}
        onChange={(value) => setMessage(value)}
        style={{ height: "300px" }}
      ></ReactQuill>
    </div>
  );
};

export default MyComponent;
