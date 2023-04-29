import { MultiSelect } from "react-multi-select-component";
const options = [];

const MultipleSelect = ({ data, selectedVendors, setSelectedVendors }) => {
  data.map((ele, index) => {
    options.push({ label: `${ele.name},  ${ele.email}`, value: ele.email });
  });

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
    </div>
  );
};
export default MultipleSelect;
