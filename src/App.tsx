import './App.css'
import AppRoutes from './routes/AppRoutes'
import { getUFsDictionary } from './util/formattedData';
import { checkCountries, checkRoutes, checkUFs } from './util/strorage'

checkCountries()
checkRoutes();
checkUFs();
getUFsDictionary();

function App() {

  return (
    <AppRoutes />
  )
}

export default App
