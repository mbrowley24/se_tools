import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginView from './Components/login/LoginView'
import Dashboard from './Components/dashboard/Dashboard'
import About from './Components/about/about'
import QuestionView from './Components/questions/QuestionView'
import NewQuestion from './Components/questions/NewQuestion'
import TemplateView from './Components/discoveryQuestionTemplate/TemplateView'
import NewTemplateView from './Components/discoveryQuestionTemplate/NewTemplateView'

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
            <Route path="new" element={<NewQuestion/>}/>
            <Route path={"templates"}>
              <Route path={''} element={<TemplateView/>}/>
              <Route path={"new"} element={<NewTemplateView/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
