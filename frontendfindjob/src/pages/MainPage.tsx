import { useState,useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { Vacancy } from '../components/Vacancies';
import { useVacancies } from '../hooks/vacancies';
import { IVacancy } from '../models';

 export function MainPage(){
   
  
    const {loading, error, vacancy, addVacancy} = useVacancies()
    const[checkCreateVacancy, setCheckCreateVacancy] = useState(false)
    const [query, setQuery] = useState("")    
    const [chcreateVac, setchCreateVac] = useState(false)
    const [sortState, setSortState] = useState("none");
  const sortMethods: any = {
    none: { method: (a: IVacancy, b: IVacancy) => null },
    salary: { method: (a: IVacancy, b: IVacancy) => (a.salary < b.salary ? 1 : -1) },
    experience: { method: (a: IVacancy, b: IVacancy) => (a.description < b.description ? -1 : 1) },
    name: { method: (a: IVacancy, b: IVacancy) => (a.nameVacancy < b.nameVacancy ? -1 : 1) }
  }

    return ( 
      <>
      <div className="flex justify-center mt-5">
        
            <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                  <h2 className="mb-1 ml-4">Поиск по имени вакансии</h2>
                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange= {(e) => setQuery(e.target.value)} 
                    placeholder="Введите название вакансии" 
                     
                    aria-label="Search" 
                    aria-describedby="button-addon2"/>
                 </div>
            </div>
        </div>
      <div className="parent flex justify-center content-center items-center mt-5">


     

        <div  className=" w-full mr-4 ml-4 content-center">
        <p className="font-bold text-center mb-5 text-xl">Вакансии</p>
        <div className="main">
          <h2 className='font-bold  mb-1'>Сортировка: </h2>
      <select className='mb-4 px-2 py-2 rounded bg-cyan-600 text-white ' defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option className='text-amber-500' value="DEFAULT" disabled>None</option>
        <option value="salary">По зарплате</option>
        <option value="experience">По описанию</option>
        <option value="name">По имени вакансии</option>
      </select>


          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
          {vacancy.sort(sortMethods[sortState].method).filter((vacancy) => vacancy.nameVacancy.toLocaleLowerCase().includes(query ) ).map(vacancy => <Vacancy vacancy={vacancy} key={vacancy.id} />)}
        </div>
        
        </div>
        </div>
       </>
      );
    }