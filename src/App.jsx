import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import HomePage from "./pages/Home/HomePage";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";
import { useEffect, useState } from "react";

const BASE_URL = " http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch {
        alert("Error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>List of form</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
