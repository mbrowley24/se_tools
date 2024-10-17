import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import About from './Components/about/about'
import AppointmentDashboard from "./Components/appointments/AppointmentDashboard.jsx";
import CompanyDashboard from "./Components/Companies/CompanyDashboard.jsx";
import NewCompany from "./Components/Companies/new/NewCompany.jsx";



function App() {

  return (
    <>
      <AppDataContext>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path='/about' element={<About/>} />
            <Route path={'dashboard'} element={<AppointmentDashboard/>}/>
            <Route path={'companies'}>
              <Route path={''} element={<CompanyDashboard/>} />
              <Route path={'new'} element={<NewCompany/>} />
            </Route>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
