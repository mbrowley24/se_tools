import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginView from './Components/login/LoginView'
import Dashboard from './Components/dashboard/Dashboard'
import About from './Components/about/about'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
