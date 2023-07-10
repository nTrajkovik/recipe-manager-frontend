import "./App.css";
import Api from "./Api";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import AddRecipe from "./components/AddRecipe";
import Navbar from "./components/Navbar";
import TokenSearchBar from "./components/TokenSearchBar";
import Pagination from "./components/Pagination";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [filteredTags, setFilteredTags] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchRecipes = (page, searchTerm, filteredTags) => {
    try {
      Api()
        .get(`/api/recipes?page=${page}&pageSize=5&title=${searchTerm}&tags=${JSON.stringify(filteredTags)}`)
        .then((response) => {
          const data = response.data;
          setRecipes(data.recipes);
          // setRecipes(prevRecipes => [...prevRecipes, ...data.recipes]); // infinite loading
          setPages(data.pages);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecipes(page, searchTerm, filteredTags);
  }, [page, searchTerm, filteredTags]);

  const handlePageChange = async (page) => {
    setPage(page);
    // fetchRecipes(page);
  };

  const handleFilter = (tags) => {
    setFilteredTags(tags);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchTitle = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchTags =
      filteredTags.length === 0 ||
      (recipe.tags && filteredTags.every((tag) => recipe.tags.includes(tag)));
    return matchTitle && matchTags;
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is my landing page...
              <img src="/LP.png" alt="landing-page" />
            </div>
          }
        ></Route>
        <Route
          path="recipes"
          element={
            <div>
              <SearchBar handleSearch={handleSearch} />
              <TokenSearchBar handleFilter={handleFilter} />
              <Pagination page={page} pages={pages} handlePageChange={handlePageChange} />
              <RecipeList recipes={filteredRecipes} />
              {/* <button onClick={() => setPage(page+1)}>Load more</button> /*Infinite loading */} 
            </div>
          }
        ></Route>
        <Route path="add" element={<AddRecipe />}></Route>
      </Routes>
    </div>
  );
}

export default App;
