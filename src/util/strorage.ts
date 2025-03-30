import { getCountries } from "../api/service/countries";
import { getRoutes } from "../api/service/routes";

const COUNTRIES_LOCAL_STORAGE_KEY = "countries";
const ROUTES_LOCAL_STORAGE_KEY = "routes";

export const checkCountries = async () => {
  const storedCountries = localStorage.getItem(COUNTRIES_LOCAL_STORAGE_KEY);


  if (!storedCountries || JSON.parse(storedCountries).length === 0) {
    const data = await getCountries();
    localStorage.setItem(COUNTRIES_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};


export const checkRoutes = async () => {
  const storedRoutes = localStorage.getItem(ROUTES_LOCAL_STORAGE_KEY);


  if (!storedRoutes || JSON.parse(storedRoutes).length === 0) {
    const data = await getRoutes();
    localStorage.setItem(ROUTES_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};