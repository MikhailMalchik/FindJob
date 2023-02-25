import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "../context/ModalContext"
import { ModalContextApplicant } from "../context/ModalContextApplicant"

import { IProduct, IApplicant } from "../models"
import { ModalApp } from "./ModalApp"
import { Modal } from "./ModalLogin"
import { ModalReg } from "./ModalRegistration"
import { Update } from "./Update"
import { UpdateApplicant } from "./UpdateApplicant"
import { UpdateApplicantAdmin } from "./UpdateAppplicantAdmin"


interface ApplicantsProps {
    applicant: IApplicant
}

export function Applicant({applicant}: ApplicantsProps){

    const navigation = useNavigate()

    const [details,setDetails] = useState(false)
    
    const { openApplicant, closeApplicant, modalapplicant } =
    useContext(ModalContextApplicant);

    const buttonDetailsColor = details ? 'bg-yellow-400' : 'bg-blue-400'

    const buttonStyles = ['py-2 px-4 border', buttonDetailsColor]
    async function delApplicant (id: any) {
        console.log("ffff")

        const response =  await axios.get('https://localhost:7186/Applicant/delApplicant/' + id)
        console.log(response.data)
        navigation(0)
    }

    return (
        
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2 bg-blue-200">
            <h2 className="font-bold">Почта</h2>
            <p>{applicant.email}</p>
            <h3 className="font-bold">Имя</h3>
            <p >{applicant.name}</p>
            
            <button className={buttonStyles.join(' ')} onClick={() => setDetails(prev =>!prev)}>
               {details ? 'Hide details' : 'Show details'}</button>
                {details && 
                <div>
                    <h3 className="font-bold">Фамилия</h3>
                    <p>{applicant.surname}</p>
                    <h3 className="font-bold">Телефон</h3>
                    <p>{applicant.phone}</p>
                    <h3 className="font-bold">Пол</h3>
                    <p>{applicant.gender}</p>
                    <h3 className="font-bold">Возраст</h3>
                    <p>{applicant.dateOfBirth}</p>
                    <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={openApplicant}
          >
            Изменить
          </button>
        
          {modalapplicant && (
          <ModalApp title="Изменение соискателя" onCloseApp={closeApplicant}>
            <UpdateApplicantAdmin applicantId={applicant.id} onUpdate={closeApplicant} />
          </ModalApp>
        )}
        
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={()=> delApplicant(applicant.id)}
          >
            Удалить
          </button>

                </div>}
              
       
        </div>
    )
}