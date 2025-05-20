import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "../pages/Map";
import Home from "../pages/Home";
import DataInsights from "../pages/DataInsights";
import Search from "../pages/Search";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/mapa" element={<Map />} />
      </Routes>
      <Routes>
        <Route path="/relatorios" element={<DataInsights />} />
      </Routes>
      <Routes>
        <Route path="/pesquisa" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
