import React, { useState } from "react"

import { IProduct, IVacancy } from "../models"


interface VacanciesProps {
    vacancies: IVacancy
}

export function YourVacancies({vacancies}: VacanciesProps){

    const [details,setDetails] = useState(false)


    

  

    return (
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2 ">
             <h3 className="font-bold">Название</h3>
             
            <p>{vacancies.nameVacancy}</p>
            <h3 className="font-bold">Описание</h3>
            <p>{vacancies.description}</p>
            <h3 className="font-bold">Зарплата</h3>
            <p>{vacancies.salary}</p>
            
            <button  className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Изменить</button>
            <button  className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Удалить</button>
        </div>
    )
}