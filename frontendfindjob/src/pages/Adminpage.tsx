import { useState,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Applicant } from '../components/Applicants';
import { Employer } from '../components/Employers';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { Modal } from '../components/ModalLogin';
import {Product} from '../components/Product'
import { Registration } from '../components/Registration';
import { Staff } from '../components/Staffs';
import { Vacancy } from '../components/Vacancies';
import { ModalContext } from '../context/ModalContext';
import { vacancy} from '../data/vacancy'
import { useApplicant } from '../hooks/applicants';
import { useEmployer } from '../hooks/employers';
import { useProducts } from '../hooks/products';
import { useStaff } from '../hooks/staffs';
import { useVacancies } from '../hooks/vacancies';
import { IProduct, IVacancy } from '../models';


 export function AdminPage(){

    const {loading1, error1,applicant, addApplicant} = useApplicant()
    const {loading2, error2,employer, addEmployer} = useEmployer()
    const {loading3, error3,staff, addStaff} = useStaff()
    const navigation = useNavigate();
    const {modal,open,close} = useContext(ModalContext)

    async function checkAdmin() {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch('https://localhost:7186/Staff/checkstaff', {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + token  // передача токена в заголовке
          }
      });
      if (response.ok=== true) {
        const data = await response.json()
      if(data == true)
      {
      console.log(data)        
        return;
      }
      else
      {
        console.log("Status: ", response.status);
        navigation("/")
      }
  };
}
    useEffect(() => {
      
    checkAdmin()

     
    }, []);
  
    return ( 
        <div className=" flex mx-3 w-auto pt-5 border rounded">
            
      <div className=" w-1/3 mx-0  mr-4"> 
      <span className="font-bold ml-48" >Соискатели</span>
      {loading1 && <Loader/>}
      {error1 &&  <ErrorMessage error={error1}/>}
       
          { applicant.map(applicant => <Applicant applicant={applicant} key={applicant.id}/>)}
          
          
      </div>
      <div className=" w-1/3 mx-0  mr-4"> 
      <span className="font-bold ml-48" >Работодатели</span>
      {loading2 && <Loader/>}
      {error2 &&  <ErrorMessage error={error2}/>}
       
          { employer.map(employer => <Employer employer={employer} key={employer.id}/>)}
          
         
      </div>
      <div className=" w-1/3 mx-0  mr-4"> 
      <span className="font-bold ml-48" >Работники</span>
      {loading3 && <Loader/>}
      {error3 &&  <ErrorMessage error={error2}/>}
       
          { staff.map(staff => <Staff staffd={staff} key={staff.id}/>)}
          
          
      </div>
      </div>
      );
    }