import React, { useEffect, useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import axios, { AxiosError } from 'axios';
import { useVacancies } from '../hooks/vacancies';
import { useVacancyUpdate } from '../hooks/vacancyupdate';
import { Navigation, useNavigate} from 'react-router-dom';
import { useResumeUpdate } from '../hooks/resumeupdate';

interface UpdateResumeProps
{
  resumeId: number,
  onUpdate: () => void
}

export function UpdateResume({ resumeId, onUpdate }: UpdateResumeProps)
{
    // Для валидации.
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const navigation = useNavigate()

    // Для отправки запроса.
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');

    var {resume, error7} = useResumeUpdate(resumeId);

    useEffect(() => {
        isError();
      }, [error7]);

    function isError()
    {
        if(error7 != null)
        {
            setErrorRequestText(error7);
            setErrorRequest(true);
        }
    }
    
    useEffect(() => {
        UpdateField();
      }, [resume]);

    function UpdateField()
    {
        if(resume != null)
        {
            setDescription(resume.description);
            setExperience(resume.experience);
            setSkills(resume.skills);
           
        }
    }
    
    // Для полей заполнения.
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");

    // События onChange полей для ввода.
    const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setDescription(event.target.value);
    }
    const changeExperience = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setExperience(event.target.value);
    }
    const changeSkills = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSkills(event.target.value);
    }
  
    // Валидация введенных данных и попытка отправки запроса.
    const submitUpdate = async (event: React.FormEvent) =>
    {
        event.preventDefault();
        if(description === "" || skills === "" ||  experience === "")
        {
          setErrorValidation(true)
          setErrorValidationText("Заполните все поля")
          return
        }
        const formData = new FormData();
        formData.append("id", resumeId.toString());
       
        formData.append("description", description);
        formData.append("skills", skills);
        formData.append("experience", experience);
        try
        {
            const response = await axios.post('https://localhost:7186/Resume/updateResume', formData);
            //onUpdate();
            navigation(0)
        }
        catch(e: unknown)
        {
            const error = e as AxiosError;
            setErrorRequestText(error.message);
            setErrorRequest(true);
        }

    }

    return(
        <form onSubmit={submitUpdate}>
        
        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={description}
          placeholder="Описание"
          onChange={changeDescription} />


        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={skills}
          placeholder="Скилы"
          onChange={changeSkills} />

        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={experience}
          placeholder="Опыт"
          onChange={changeExperience} />


        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
    );
}