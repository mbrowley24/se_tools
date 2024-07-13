import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppDataContext } from './context/dataContext';
import LoginView from './Components/login/LoginView'
import About from './Components/about/about'
import AddOpportunityView from './Components/sales/forecast/addOpportunity/AddOpportunityView';
import ComcastView from './Components/education/comcast/ComcastView'
import CompanyView from './Components/sales/companies/companyForm/CompanyView';
import CompanyTableView from './Components/sales/companies/CompanyTableView'
import ContactFormView from './Components/sales/contacts/new/contactFormView';
import Dashboard from './Components/dashboard/Dashboard'
import EditISPServicesView from './Components/dashboard/editServices/EditISPServicesView';
import ForecastTableView from './Components/sales/forecast/table/ForecastTableView';
import ISPEdit from './Components/dashboard/edit/ISPEdit';
import MeetingTableView from './Components/sales/meetings/table/MeetingTableView';
import NewOpportunityView from './Components/sales/opportunities/new/NewOpportunityView';
import ProductsView from './Components/sales/products/ProductsView';
import QuestionView from './Components/questions/panels/QuestionView'
import RepTableView from './Components/sales/reps/table/RepTableView'
import NewQuestion from './Components/questions/new/NewQuestion';
import TemplateView from './Components/discoveryQuestionTemplate/new/TemplateView'
import NewTemplateView from './Components/discoveryQuestionTemplate/new/NewTemplateView'
import TemplateFormView from './Components/discoveryQuestionTemplate/new/TemplateFormView'
import EditQuestion from './Components/questions/edit/EditQuestion';
import AddQuestionView from './Components/discoveryQuestionTemplate/addQuestions/AddQuestionView';


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
              <Route path=":id" element={<EditQuestion/>}/>
              <Route path={"templates"}>
                <Route path={''} element={<TemplateView/>}/>
                <Route path={':id'} element={<AddQuestionView/>}/>
              </Route>
            </Route>
            <Route path={"/education"}>
              <Route path={"comcast"} element={<ComcastView/>}/>
            </Route>
            <Route path={"/sales"}>
              <Route path={"companies"}>
                <Route path={''} element={<CompanyTableView/>}/>
                <Route path={':id'} element={<CompanyView/>}/>
                <Route path={":id/opportunities/new"} element={<NewOpportunityView/>}/>
                <Route path={":id/contacts/new"} element={<ContactFormView/>}/>
              </Route>
              <Route path={"forecast"}>
                <Route path={''} element={<ForecastTableView/>}/>
                <Route path={':id/:rep_id'} element={<AddOpportunityView/>} />
              </Route>
              <Route path={"isp"}>
                <Route path={''} element={<ISPEdit/>}/>
                {/* <Route path={':id'} element={<CompanyView/>}/> */}
                <Route path={'categories/:id'} element={<EditISPServicesView/>}/>
              </Route>
              <Route path={"meetings"}>
                <Route path={":id"} element={<MeetingTableView/>}/>
              </Route>
              <Route path={"opportunities"}>
                <Route path={"create"} element={<NewOpportunityView/>}/>
              </Route>
              <Route path={"products"}>
                <Route path={':id'} element={<ProductsView/>}/>
              </Route>
              <Route path={"reps"}>
                <Route path='' element={<RepTableView/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppDataContext>
    </>
  )
}

export default App
