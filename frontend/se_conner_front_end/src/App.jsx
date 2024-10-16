import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import About from './Components/about/about'



function App() {

  return (
    <>
      <AppDataContext>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path='/about' element={<About/>} />
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
