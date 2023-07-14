import "./App.css";
import Api from "./Api";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import AddRecipe from "./components/AddRecipe";
import Navbar from "./components/Navbar";
import TokenSearchBar from "./components/TokenSearchBar";
import Pagination from "./components/Pagination";
import { TagProvider } from "./context/TagContext";
import AddTag from "./components/AddTag";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./Auth";
import Loading from "./components/Loading";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [filteredTags, setFilteredTags] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const authenticate = (token) => {
    console.log({token});
    localStorage.setItem("jwt", token);
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const response = await Api().get('/api/user-data');
      console.log({response});
      if (response?.data) {
        setUser(response?.data);
        localStorage.setItem("userData", JSON.stringify(response?.data));
        navigate('/recipes');
      }
    } catch (error) {
      console.error('Unable to fetch user data', error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    setUser(null);
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem("userData");
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  const fetchRecipes = (page, searchTerm, filteredTags) => {
    try {
      Api()
        .get(
          `/api/recipes?page=${page}&pageSize=5&title=${searchTerm}&tags=${JSON.stringify(
            filteredTags
          )}`
        )
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

  if (loading) return <Loading />;
  return (
    <div>
      <div className="App">
        <Navbar logout={logout} user={user} />
        <TagProvider>
          <Routes>
            <Route
              path="/register"
              element={<Register authenticate={authenticate} />}
            />
            <Route
              path="/login"
              element={<Login authenticate={authenticate} />}
            />
            <Route
              path="/"
              element={
                <div>
                  This is my landing page...
                  <img src="/LP.png" alt="landing-page" />
                </div>
              }
            ></Route>
            <Route element={<Auth user={user} />}>
              <Route
                path="recipes"
                element={
                  <div>
                    <SearchBar handleSearch={handleSearch} />
                    <TokenSearchBar handleFilter={handleFilter} />
                    <Pagination
                      page={page}
                      pages={pages}
                      handlePageChange={handlePageChange}
                    />
                    <RecipeList recipes={recipes} />
                    {/* <button onClick={() => setPage(page+1)}>Load more</button> /*Infinite loading */}
                  </div>
                }
              ></Route>
            </Route>
            <Route element={<Auth user={user} allowedRoles={["admin"]} />}>
              <Route
                path="add"
                element={
                  <div>
                    <AddRecipe /> <AddTag />
                  </div>
                }
              ></Route>
            </Route>
            <Route
              path="unauthorized"
              element={<div>Unauthorized ...</div>}
            ></Route>
          </Routes>
        </TagProvider>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
