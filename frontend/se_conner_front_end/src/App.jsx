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
import OpportunityTableView from './Components/sales/opportunities/table/OpportunityTableView'
import NewOpportunityView from './Components/sales/opportunities/new/NewOpportunityView';
import CompanyTableView from './Components/sales/companies/CompanyTableView'
import ISPEdit from './Components/dashboard/edit/ISPEdit';
import EditISPServicesView from './Components/dashboard/editServices/EditISPServicesView';
import CompanyView from './Components/sales/companies/companyForm/CompanyView';
import ContactFormView from './Components/sales/contacts/new/contactFormView';
import ForecastTableView from './Components/sales/forecast/table/ForecastTableView';


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
              </Route>
              <Route path={"opportunities"}>
                <Route path={''} element={<OpportunityTableView/>}/>
                <Route path={"create"} element={<NewOpportunityView/>}/>
              </Route>
              <Route path={"companies"}>
                <Route path={''} element={<CompanyTableView/>}/>
                <Route path={':id'} element={<CompanyView/>}/>
                <Route path={":id/opportunities/new"} element={<NewOpportunityView/>}/>
                <Route path={":id/contacts/new"} element={<ContactFormView/>}/>
              </Route>
              <Route path={"isp"}>
                <Route path={''} element={<ISPEdit/>}/>
                {/* <Route path={':id'} element={<CompanyView/>}/> */}
                <Route path={'categories/:id'} element={<EditISPServicesView/>}/>
              </Route>
              <Route path={"forecast"}>
                <Route path={''} element={<ForecastTableView/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
