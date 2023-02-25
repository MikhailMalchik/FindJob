import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ModalContextVacancy } from "../context/ModalContextVacancy"

import { IProduct, IVacancy } from "../models"
import { Modal } from "./ModalLogin"
import { UpdateVacancy } from "./UpdateVacancy"


interface VacanciesProps {
    vacancy: IVacancy
}

export function Vacancy({vacancy}: VacanciesProps){

    const [details,setDetails] = useState(false)
    const [checkrole, setCheckRole] = useState(false)
    const {openVacancy,closeVacancy,modalVacancy} = useContext(ModalContextVacancy)
    const buttonDetailsColor = details ? 'bg-yellow-400' : 'bg-blue-400'

    const buttonStyles = ['py-2 px-4 border', buttonDetailsColor]
    useEffect(() => {
       if(localStorage.getItem("type") === "staff")
       setCheckRole(true)
       else
       setCheckRole(false)
       
      }, []);


  

    return (
        <Link to={"/vacancy/"+ vacancy.id} >
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2 hover:bg-cyan-500" >
            <h1 className=" font-bold">Название вакансии</h1>
           
            <p className="" >{vacancy.nameVacancy} </p>

            <h1 className=" font-bold">Описание</h1>

            <p className="">{vacancy.description} </p>

            <h1 className=" font-bold">Зарплата</h1>

            <p className="">{vacancy.salary} </p>

            
          

               

              

                

               
            
        </div>
        </Link>
    )
}