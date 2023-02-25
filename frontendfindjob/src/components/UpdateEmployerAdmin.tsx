import React, { useEffect, useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import axios, { AxiosError } from 'axios';
import { useVacancies } from '../hooks/vacancies';
import { useVacancyUpdate } from '../hooks/vacancyupdate';
import { Navigation, useNavigate} from 'react-router-dom';
import { useApplicantUpdate } from '../hooks/applicantupdate';
import { useEmployerUpdate } from '../hooks/employerupdate';

interface UpdateVacancyProps
{
  employerId: number,
  onUpdate: () => void
}

export function UpdateEmployerAdmin({ employerId}:any)
{
    const navigation = useNavigate()
   
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    var userid =  localStorage.getItem("user")
    
    var myNumber = Number(employerId)
    console.log(employerId)

    var {employer, error2} = useEmployerUpdate(myNumber);
    
    console.log(employer)

    useEffect(() => {
        UpdateField();
      }, [employer]);

      function UpdateField()
      {
          if(employer != null)
          
          {   
            
            setEmail(employer.id)
            console.log(employer.id)
              setPhone(employer.phone);
              setName(employer.name);
              setSurname(employer.surname);
              setCompanyName(employer.companyName);
               
          }
      }

    
    // Для полей заполнения.
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [companyname, setCompanyName] = useState("");
    
    const [email, setEmail] = useState(0);
    const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setName(event.target.value);
     }
     const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setSurname(event.target.value);
     }
     const changePhone = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setPhone(event.target.value);
     }
     const changeCompanyName = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setCompanyName(event.target.value);
     }
   
 
    // Валидация введенных данных и попытка отправки запроса.
    const submitUpdate = async (event: React.FormEvent) =>
    {
     event.preventDefault();
     if(name === "" || surname === "" || phone === "" || companyname === "")
     {
       setErrorValidation(true)
       setErrorValidationText("Заполните все поля")
       return
     }
     else
     {
     const formData = new FormData();
     formData.append("email", email.toString())
     console.log(email)
     formData.append("name", name);  
     formData.append("surname", surname);
     formData.append("phone", phone);
     formData.append("companyname", companyname);
     
     try
         {
             const response = await axios.post('https://localhost:7186/Employer/updateEmployer', formData)
             navigation(0)
            
             //onUpdate();
         }
         catch(e: unknown)
         {
             const error = e as AxiosError;
             setErrorRequestText(error.message);
             setErrorRequest(true);
         }
     
 
     }
    }

    return(
        <form onSubmit={submitUpdate}>
        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={name}
          placeholder="Имя"
          onChange={changeFirstName} />
        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={surname}
          placeholder="Фамилия"
          onChange={changeLastName} />


        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={phone}
          placeholder="Телефон"
          onChange={changePhone} />

        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={companyname}
          placeholder="Имя компании"
          onChange={changeCompanyName} />

          
        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
    );
}