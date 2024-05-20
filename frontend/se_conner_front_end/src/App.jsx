import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import Dashboard from './Components/dashboard/Dashboard'
import About from './Components/about/about'
import QuestionView from './Components/questions/QuestionView'
import NewQuestion from './Components/questions/NewQuestion'
import TemplateView from './Components/discoveryQuestionTemplate/TemplateView'
import NewTemplateView from './Components/discoveryQuestionTemplate/NewTemplateView'
import TemplateFormView from './Components/discoveryQuestionTemplate/TemplateFormView'
import ComcastView from './Components/education/comcast/ComcastView'
import RepTableView from './Components/sales/reps/table/RepTableView'
import NewRepView from './Components/sales/reps/new/NewRepView'
import OpportunityTableView from './Components/sales/opportunities/table/OpportunityTableView'


function App() {

  return (
    <>
      <AppDataContext>
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
                <Route path={':id'} element={<TemplateFormView/>}/>
              </Route>
            </Route>
            <Route path={"/education"}>
              <Route path={"comcast"} element={<ComcastView/>}/>
            </Route>
            <Route path={"/sales"}>
              <Route path={"reps"}>
                <Route path='' element={<RepTableView/>}/>
                <Route path={"add"} element={<NewRepView/>}/>
              </Route>
              <Route path={"opportunities"}>
                <Route path={''} element={<OpportunityTableView/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
