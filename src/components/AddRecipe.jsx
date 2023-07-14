import React, { useContext, useState } from "react";
import Api from "../Api";
import Select from "react-select";
import { TagContext } from "../context/TagContext";
import Loading from "./Loading";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [preparation, setPreparation] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleIngredientChange = (e, index, field) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const handleTagChange = (selectedOptions) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    setTags(selectedTags);
  };

  const deleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file, setSelectedFile);
  } ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const newRecipe = {
      title,
      preparation,
      time,
      ingredients,
      tags,
      image: selectedFile,
    };
    try {
      await Api().post("/api/recipes", newRecipe);
      setTitle("");
      setPreparation("");
      setTime("");
      setIngredients([]);
      setTags([]);
      setSelectedFile(null);
      toast("Succesfully saved recipe!");
    } catch (error) {
      console.error(error);
      toast("Failed to add recipe. Please try again.");
    }
    setLoading(false);
  };
  const options = useContext(TagContext).tags;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Add a recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Preparation:
          <input
            type="text"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <h4>Ingredients:</h4>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="text"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(e, index, "name")}
                required
              />
              :
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(e, index, "quantity")}
                required
              />
              <input
                type="text"
                placeholder="Units"
                value={ingredient.units}
                onChange={(e) => handleIngredientChange(e, index, "units")}
                required
              />
              <button type="button" onClick={() => deleteIngredient(index)}>
                X
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => {
            setIngredients([
              ...ingredients,
              { name: "", quantity: "", units: "" },
            ]);
          }}
        >
          Add Ingredient
        </button>
        <br />
        <label>
          Tags:
          <Select
            options={options}
            isMulti
            value={tags.map((tag) => ({ value: tag, label: tag }))}
            onChange={handleTagChange}
            placeholder="Select tags"
          />
        </label>

        <input
          type="file"
          onChange={handleImageUpload}
        />
        <button type="submit" disabled={loading}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
