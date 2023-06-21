import { useEffect, useState } from "react";
import { Select } from "@mui/material";

const SortDropDown = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(["وصل حدثيا", "الاعلي سعر", "الاقل سعر "]);
  }, []);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <select
      className="form-select"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option selected>ترتيب حسب</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export default SortDropDown;
