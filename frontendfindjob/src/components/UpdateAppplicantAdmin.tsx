import React, { useEffect, useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import axios, { AxiosError } from 'axios';
import { useVacancies } from '../hooks/vacancies';
import { useVacancyUpdate } from '../hooks/vacancyupdate';
import { Navigation, useNavigate} from 'react-router-dom';
import { useApplicantUpdate } from '../hooks/applicantupdate';

interface UpdateVacancyProps
{
  applicantId: number,
  onUpdate: () => void
}

export function UpdateApplicantAdmin({ applicantId}:any)
{
    const navigation = useNavigate()
   
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    var userid =  localStorage.getItem("user")
    
    var myNumber = Number(applicantId)
    console.log(applicantId)

    var {applicant, error6} = useApplicantUpdate(myNumber);
    
    console.log(applicant)

    useEffect(() => {
        UpdateField();
      }, [applicant]);

      function UpdateField()
      {
          if(applicant != null)
          
          {   
            console.log(applicant.phone)
            setEmail(applicant.id)
              setPhone(applicant.phone);
              setName(applicant.name);
              setSurname(applicant.surname);
              setAge(applicant.dateOfBirth);
              setGender(applicant.gender);
  
          }
      }

    
    // Для полей заполнения.
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState(0);
    const handleChangeGenderMale = () => {
     setGender("мужчина");
   };
   const handleChangeGenderFemale = () => {
     setGender("женщина");
   };
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
     const changeAge = (event: React.ChangeEvent<HTMLInputElement>) =>
     {
         setAge(event.target.value);
     }
   
 
    // Валидация введенных данных и попытка отправки запроса.
    const submitUpdate = async (event: React.FormEvent) =>
    {
     event.preventDefault();
     if(name === "" || surname === "" || phone === "" || age === "")
     {
       setErrorValidation(true)
       setErrorValidationText("Заполните все поля")
       return
     }
     else
     {
     const formData = new FormData();
     formData.append("email", email.toString())
     formData.append("name", name);  
     formData.append("surname", surname);
     formData.append("phone", phone);
     formData.append("age", age);
     formData.append("gender", gender);
     try
         {
             const response = await axios.post('https://localhost:7186/Applicant/updateApplicant', formData)
             navigation(0);
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
          value={age}
          placeholder="Возраст"
          onChange={changeAge} />

          <><input type="radio" id="contactChoice3"
          name="gendertype" value="genderM"  onChange={handleChangeGenderMale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoice3">Мужчина</label></>
          <><input type="radio" id="contactChoice4"
          name="gendertype" value="genderF" onChange={handleChangeGenderFemale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoicer4">Женщина</label></>
        

        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
    );
}