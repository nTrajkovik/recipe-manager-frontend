import React from "react";
import Select from "react-select";
import { _tags } from '../tags';

const TokenSearchBar = ({ handleFilter }) => {
  const options = _tags;

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
