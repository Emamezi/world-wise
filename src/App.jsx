import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Testimonials from "./pages/Testimonials/Testimonials";
import { CitiesProvider, useCities } from "./Context/CitiesContext";

const BASE_URL = " http://localhost:9000";
function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="testimonials" element={<Testimonials />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
