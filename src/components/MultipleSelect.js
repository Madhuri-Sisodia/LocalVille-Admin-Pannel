import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
const options = [];

// const options = [
//     { label: "Grapes 🍇", value: "grapes" },
//     { label: "Mango 🥭", value: "mango" },
//     { label: "Strawberry 🍓", value: "strawberry", disabled: true },
//   ];
const MultipleSelect = ({ data, selectedVendors, setSelectedVendors }) => {
  console.log(data);

  data.map((ele, index) => {
    options.push({ label: `${ele.name},  ${ele.email}`, value: ele.email });
  });

  const [selected, setSelected] = useState([]);

  return (
    <div style={{ marginTop: "20px" }}>
      <p style={{ fontSize: "0.9rem" }}>SELECT VENDORS</p>
      <MultiSelect
        options={options}
        value={selectedVendors}
        onChange={(value) => {
          setSelectedVendors(value);
        }}
        labelledBy="Select"
      />
      {console.log("value", selectedVendors)}
    </div>
  );
};

export default MultipleSelect;
