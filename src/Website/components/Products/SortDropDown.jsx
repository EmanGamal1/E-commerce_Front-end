import { useEffect, useState } from "react";
import { Select } from "@mui/material";

const SortDropDown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions([
      { key: "الأحدث", value: "-createdAt" },
      { key: "الأعلي مبيعا", value: "-total_orders" },
      { key: "الأعلي سعرا", value: "-price" },
      { key: "الأقل سعرا", value: "price" },
    ]);
  }, []);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onSortChange(event.target.value);
  };
  return (
    <select
      className="form-select"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value={""} selected>
        ترتيب حسب
      </option>
      {options.map(
        (option) => (
          console.log("option", option),
          (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          )
        )
      )}
    </select>
  );
};
export default SortDropDown;
