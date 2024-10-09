import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import HomePage from "./pages/Home/HomePage";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";
import CountriesList from "./components/CountriesList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";

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
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountriesList cities={cities} />} />
          <Route path="form" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
