import React, { useEffect, useState } from 'react';

import { ErrorMessage } from './ErrorMessage';
import axios, { AxiosError } from 'axios';
import { useVacancies } from '../hooks/vacancies';
import { useVacancyUpdate } from '../hooks/vacancyupdate';
import { Navigation, useNavigate} from 'react-router-dom';

interface UpdateVacancyProps
{
  vacancyId: number,
  onUpdate: () => void
}

export function UpdateVacancy({ vacancyId, onUpdate }: UpdateVacancyProps)
{
    // Для валидации.
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const navigation = useNavigate()

    // Для отправки запроса.
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    
    var {vacancy, error4} = useVacancyUpdate(vacancyId);

    useEffect(() => {
        isError();
      }, [error4]);

    function isError()
    {
        if(error4 != null)
        {
            setErrorRequestText(error4);
            setErrorRequest(true);
        }
    }
    
    useEffect(() => {
        UpdateField();
      }, [vacancy]);

    function UpdateField()
    {
        if(vacancy != null)
        {
            setNameVacancy(vacancy.nameVacancy);
            setDescription(vacancy.description);
            setSkills(vacancy.skills);
            setExperience(vacancy.experience);
            setSalary(vacancy.salary);
        }
    }
    
    // Для полей заполнения.
    const [namevacancy, setNameVacancy] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");

    // События onChange полей для ввода.
    const changeNameVacancy = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setNameVacancy(event.target.value);
    }
    const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setDescription(event.target.value);
    }
    const changeSkills = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSkills(event.target.value);
    }
    const changeExperience = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setExperience(event.target.value);
    }
    const changeSalary = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSalary(event.target.value);
    }
  
    // Валидация введенных данных и попытка отправки запроса.
    const submitUpdate = async (event: React.FormEvent) =>
    {
        event.preventDefault();
        if(namevacancy === "" || description === "" || skills === "" || salary === "" || experience === "")
        {
          setErrorValidation(true)
          setErrorValidationText("Заполните все поля")
          return
        }
        const formData = new FormData();
        formData.append("id", vacancyId.toString());
        formData.append("namevacancy", namevacancy);
        formData.append("description", description);
        formData.append("skills", skills);
        formData.append("salary", salary);
        formData.append("experience", experience);
        try
        {
           await axios.post('https://localhost:7186/Vacancy/updateVacancy', formData).then(f => {onUpdate()});
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
          value={namevacancy}
          placeholder="Назавние вакансии"
          onChange={changeNameVacancy} />
        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={description}
          placeholder="Описание"
          onChange={changeDescription} />


        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={skills}
          placeholder="Требования"
          onChange={changeSkills} />

        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={experience}
          placeholder="Необходимый опыт"
          onChange={changeExperience} />

        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={salary}
          placeholder="Зарплата"
          onChange={changeSalary} />

        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
    );
}