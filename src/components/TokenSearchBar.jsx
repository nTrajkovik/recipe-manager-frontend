import React, { useContext } from "react";
import Select from "react-select";
import { TagContext } from "../context/TagContext";

const TokenSearchBar = ({ handleFilter }) => {
  const options = useContext(TagContext).tags;

  const handleChange = (selectedOptions) => {
    const selectedTags = selectedOptions.map(option => option.value);
    handleFilter(selectedTags);
  }

  return (
    <div>
      <Select
        options={options}
        isMulti
        placeholder="Filter by tags"
        onChange={handleChange}
      />
    </div>
  );
};

export default TokenSearchBar;
