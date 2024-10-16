import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import About from './Components/about/about'
import AppointmentDashboard from "./Components/appointments/AppointmentDashboard.jsx";



function App() {

  return (
    <>
      <AppDataContext>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path='/about' element={<About/>} />
            <Route path={'dashboard'} element={<AppointmentDashboard/>}/>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
