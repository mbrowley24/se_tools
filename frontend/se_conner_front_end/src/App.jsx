import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginView from './Components/login/LoginView'
import Dashboard from './Components/dashboard/Dashboard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
