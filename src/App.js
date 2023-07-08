import "./App.css";
import Api from "./Api";
import { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const fetchRecipes = (page) => {
    try {
      Api()
        .get(`/api/recipes?page=${page}`)
        .then((response) => setRecipes(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  const handlePageChange = async (page) => {
    setPage(page);
    // fetchRecipes(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchTitle = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchTitle;
  });

  return (
    <div className="App">
      <h1>Recipe Manager 9000</h1>
      <button onClick={() => handlePageChange(1)}>1</button> 
      {/* problemot bese sto ne mu dadovme funkcija tuku ja povikavme funkcijata */}
      {/* Bese  onClick={handlePageChange(1)}*/}
      <button onClick={() => handlePageChange(2)}>2</button>
      <SearchBar handleSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default App;
