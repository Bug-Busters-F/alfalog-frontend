import { getCountries } from "../api/service/countries";
import { getRoutes } from "../api/service/routes";
import { getUFsDictionary } from "./formattedData";

const COUNTRIES_LOCAL_STORAGE_KEY = "countries";
const ROUTES_LOCAL_STORAGE_KEY = "routes";
const UFS_LOCAL_STORAGE_KEY = "UFs"

export const checkCountries = async () => {
  const storedCountries = localStorage.getItem(COUNTRIES_LOCAL_STORAGE_KEY);


  if (!storedCountries || JSON.parse(storedCountries).length === 0) {
    const data = await getCountries();
    localStorage.setItem(COUNTRIES_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};

export const checkUFs = async () => {
  const storedUFs = localStorage.getItem(UFS_LOCAL_STORAGE_KEY);


  if(!storedUFs || localStorage.getItem(UFS_LOCAL_STORAGE_KEY)){

    const data = await getUFsDictionary();

    const plainObject = Object.fromEntries(data);

    console.log(plainObject);

    localStorage.setItem(UFS_LOCAL_STORAGE_KEY, JSON.stringify(plainObject));
}
};



export const checkRoutes = async () => {
  const storedRoutes = localStorage.getItem(ROUTES_LOCAL_STORAGE_KEY);


  if (!storedRoutes || JSON.parse(storedRoutes).length === 0) {
    const data = await getRoutes();
    localStorage.setItem(ROUTES_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};