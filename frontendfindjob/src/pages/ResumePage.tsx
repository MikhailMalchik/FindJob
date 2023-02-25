import { useState,useContext } from 'react';
import { CreateVacancy } from '../components/CreateVacancy';
import { ErrorMessage } from '../components/ErrorMessage';

import { Loader } from '../components/Loader';
import { Modal } from '../components/ModalLogin';
import {Product} from '../components/Product'
import { Registration } from '../components/Registration';
import { Resume } from '../components/Resumes';
import { Vacancy } from '../components/Vacancies';
import { ModalContext } from '../context/ModalContext';
import { ModalContextCreate } from '../context/ModalCreateVacancyContext';
import { vacancy} from '../data/vacancy'
import { useProducts } from '../hooks/products';
import { useResumes } from '../hooks/resumes';
import { useVacancies } from '../hooks/vacancies';
import { IProduct, IResume, IVacancy } from '../models';


 export function ResumePage(){
  
    const {loading5, error5, resume} = useResumes()
    const {modalCreate,openCreate,closeCreate} = useContext(ModalContextCreate)
    const[checkCreateVacancy, setCheckCreateVacancy] = useState(false)
    const [query, setQuery] = useState("")
    
    const   findHandler =(vacancy :IVacancy) => {
    
      
    }
    const [sortState, setSortState] = useState("none");
    const sortMethods: any = {
      none: { method: (a: IResume, b: IResume) => null },
      salary: { method: (a: IResume, b: IResume) => (a.description < b.description ? -1 : 1) },
      experience: { method: (a: IResume, b: IResume) => (a.experience < b.experience ? -1 : 1) },
      name: { method: (a: IResume, b: IResume) => (a.skills < b.skills ? -1 : 1) }
    }
    const [chcreateVac, setchCreateVac] = useState(false)
    
   console.log(modalCreate)
  
    return ( 
      <>
      <div className="flex justify-center mt-5">
        
            <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                  <h2 className="mb-1 ml-4">Поиск по скилам</h2>
                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange= {(e) => setQuery(e.target.value)} 
                    placeholder="Введите название скила" 
                     
                    aria-label="Search" 
                    aria-describedby="button-addon2"/>
                 </div>
            </div>
        </div>
      <div className="parent flex justify-center content-center items-center mt-5">
        
     

        <div  className=" w-full mr-4 ml-4 content-center">
        <p className="font-bold text-center mb-5 text-xl">Резюме</p>
        <div className="main">
          <h2 className='font-bold  mb-1'>Сортировка: </h2>
      <select className='mb-4 px-2 py-2 rounded bg-cyan-600 text-white ' defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option className='text-amber-500' value="DEFAULT" disabled>None</option>
        <option value="salary">По описанию</option>
        <option value="experience">По опыту работы</option>
        <option value="name">По навыкам</option>
      </select>
      </div>


          {loading5 && <Loader />}
          {error5 && <ErrorMessage error={error5} />}
          {resume.sort(sortMethods[sortState].method).filter((resume) => resume.skills.toLocaleLowerCase().includes(query ) ).map(resume => <Resume resume={resume} key={resume.id} />)}
        </div>
        
        </div>
        <div className="w-full mx-0  mr-4 ">
        
      
          
        </div>
        </>
      );
    }