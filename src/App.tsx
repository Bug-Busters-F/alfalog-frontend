import './App.css'
import AppRoutes from './routes/AppRoutes'
import { checkCountries, checkRoutes } from './util/strorage'

checkCountries()
checkRoutes();

function App() {

  return (
    <AppRoutes />
  )
}

export default App
