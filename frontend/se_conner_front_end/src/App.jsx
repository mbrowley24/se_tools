import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginView from './Components/login/LoginView'
import Dashboard from './Components/dashboard/Dashboard'
import About from './Components/about/about'
import QuestionView from './Components/questions/QuestionView'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/discoveryquestions'>
            <Route path="" element={<QuestionView/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
