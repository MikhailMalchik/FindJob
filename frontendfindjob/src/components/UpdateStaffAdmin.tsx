import React, { useEffect, useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import axios, { AxiosError } from 'axios';
import { useVacancies } from '../hooks/vacancies';
import { useVacancyUpdate } from '../hooks/vacancyupdate';
import { Navigation, useNavigate} from 'react-router-dom';
import { useApplicantUpdate } from '../hooks/applicantupdate';
import { useEmployerUpdate } from '../hooks/employerupdate';
import { useStaffUpdate } from '../hooks/staffupdate';

interface UpdateVacancyProps
{
  employerId: number,
  onUpdate: () => void
}

export function UpdateStaffAdmin({ staffId}:any)
{
    const navigation = useNavigate()
   
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    var userid =  localStorage.getItem("user")
    
    var myNumber = Number(staffId)
    console.log(staffId + " und")

    var {staff, error8} = useStaffUpdate(myNumber);
    
    console.log(staff)

    useEffect(() => {
        UpdateField();
      }, [staff]);

      function UpdateField()
      {
          if(staff != null)
          
          {   
            
            setEmail(staff.id)
            console.log(staff.id)
             
              setName(staff.name);
              setSurname(staff.surname);
              setAdmin(staff.admin)
               
          }
      }

    
    // Для полей заполнения.
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [admin, setAdmin] = useState(false);
    
    
    const [email, setEmail] = useState(0);
    const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setName(event.target.value);
     }
     const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setSurname(event.target.value);
     }
     const changeAdmin = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setAdmin(prev =>!prev);
    }
   
 
    // Валидация введенных данных и попытка отправки запроса.
    const submitUpdate = async (event: React.FormEvent) =>
    {
     event.preventDefault();
     if(name === "" || surname === "" )
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
     if(admin)
        var admins = "true";
        else
        var admins = "false";
     formData.append("admin", admins )
     try
         {
             const response = await axios.post('https://localhost:7186/Staff/updateStaff', formData)
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
          
        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <><input type="checkbox" id="contactChoice9"
                name="checkAdmin" value="admin" onChange={changeAdmin} checked={admin} /><label className="text-black mr-3" htmlFor="contactChoice9">Is Admin</label></>
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

       

      </form>
    );
}