import React, { useState, useContext } from "react";
import { TagContext } from "../context/TagContext";
import Loading from "./Loading";

const AddTag = () => {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const tagContext = useContext(TagContext);
  const tags = tagContext.tags;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newTag = { label, value };
    const success = await tagContext.addTag(newTag);
    if (success) {
        setValue("");
        setLabel("");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>Current tags:</h2>
      <ol>
        {tags.map((tag) => (
          <li key={tag.value}>
            {tag.label}: ({tag.value}){" "}
            <button onClick={() => tagContext.removeTag(tag.value)}>X</button>
          </li>
        ))}
      </ol>
      <h2>Add Tag</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Label:
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Value:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTag;
