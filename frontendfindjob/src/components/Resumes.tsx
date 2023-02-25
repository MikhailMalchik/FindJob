import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ModalContextResume } from "../context/ModalContextResume"
import { ModalContextVacancy } from "../context/ModalContextVacancy"

import { IApplicant, IProduct, IResume, IVacancy } from "../models"
import { Modal } from "./ModalLogin"
import { UpdateResume } from "./UpdateResume"
import { UpdateVacancy } from "./UpdateVacancy"


interface ResumesProps {
    resume: IResume,
    
}

export function Resume({resume}: ResumesProps){

    const [checkresume,setResume] = useState(false)
    const [checkrole, setCheckRole] = useState(false)
    const {openResume,closeResume,modalResume} = useContext(ModalContextResume)

    useEffect(() => {
     
       
      }, []);


  

    return (
        <Link to={"/resume/"+ resume.id} >
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2 hover:bg-cyan-500">

            <h1 className=" font-bold">Описание</h1>
           
            <p className="">{resume.description} </p>

            <h1 className=" font-bold">Опыт работы</h1>

            <p className="">{resume.experience} </p>

            <h1 className=" font-bold">Навыки</h1>

            <p className="">{resume.skills} </p>


                

              

                

               
           
        </div>
        </Link>
    )
}