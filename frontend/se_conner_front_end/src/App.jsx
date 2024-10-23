import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import About from './Components/about/about'
import AppointmentDashboard from "./Components/appointments/AppointmentDashboard.jsx";
import CompanyDashboard from "./Components/Companies/CompanyDashboard.jsx";
import NewCompany from "./Components/Companies/new/NewCompany.jsx";
import SalesReps from "./Components/sales_reps/SalesReps.jsx";
import NewSalesRep from "./Components/sales_reps/new/NewSalesRep.jsx";
import Dashboard from "./Components/dashboards/Dashboard.jsx";
import NewAppointment from "./Components/appointments/new/NewAppointment.jsx";



function App() {

  return (
    <>
      <AppDataContext>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path='/about' element={<About/>} />
            <Route path={'dashboard'} element={<Dashboard/>}/>
            <Route path={'appointments'}>
              <Route path={''} element={<AppointmentDashboard/>}/>
            </Route>
            <Route path={'sales_reps'}>
              <Route path={''} element={<SalesReps/>}/>
              <Route path={'new'} element={<NewSalesRep/>}/>
            </Route>
            <Route path={'companies'}>
              <Route path={''} element={<CompanyDashboard/>} />
              <Route path={'new'} element={<NewCompany/>}/>
              <Route path={':id/appointments'}>
                <Route path={''} element={<AppointmentDashboard/>}/>
                <Route path={'new'} element={<NewAppointment/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
