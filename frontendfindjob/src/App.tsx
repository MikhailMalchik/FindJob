import { Route, Routes} from 'react-router-dom'
import { Navigation } from './components/Navigation';
import { AboutResumePage } from './pages/AboutResumePage';
import { AboutVacancyPage } from './pages/AboutVacancyPage';
import { AdminPage } from './pages/Adminpage';
import { ApplicantPage } from './pages/ApplicantPage';
import { EmployerPage } from './pages/EmployerPage';
import { MainPage } from './pages/MainPage';

import { ResumePage } from './pages/ResumePage';
import { StaffPage } from './pages/StaffPage';
function App() {
  return(
    <>
    <Navigation />
    <Routes>
      
      <Route path="/" element = {<MainPage />} />
      
      <Route path="/vacancy/:id" element = {<AboutVacancyPage />} />
      <Route path="/resume/:id" element = {<AboutResumePage />} />
      <Route path="/employer" element = {<EmployerPage />} />
      <Route path="/applicant" element = {<ApplicantPage />} />
      <Route path="/staff" element = {<StaffPage />} />
      <Route path="/admin" element = {<AdminPage />} />
      <Route path="/resumes" element = {<ResumePage />} />
     
    </Routes>
    </>
  )
 
}

export default App; 
