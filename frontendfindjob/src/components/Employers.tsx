import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ModalContextEmployer } from "../context/ModalContextEmployer"

import { IProduct, IEmployer } from "../models"
import { ModalApp } from "./ModalApp"
import { UpdateEmployerAdmin } from "./UpdateEmployerAdmin"


interface EmployersProps {
    employer: IEmployer
}

export function Employer({employer}: EmployersProps){

    const [details,setDetails] = useState(false)
    const { openEmployer, closeEmployer, modalEmployer} =
    useContext(ModalContextEmployer);
    const navigation = useNavigate()

    const buttonDetailsColor = details ? 'bg-yellow-400' : 'bg-blue-400'

    const buttonStyles = ['py-2 px-4 border', buttonDetailsColor]
    async function delEmployer (id: any) {
        console.log("ffff")

        const response =  await axios.get('https://localhost:7186/Employer/delEmployer/' + id)
        console.log(response.data)
        navigation(0)
    }

    return (
        
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2 bg-blue-200">
            <h2 className="font-bold">Почта</h2>
            <p>{employer.email}</p>
            <h3 className="font-bold">Имя</h3>
            <p >{employer.name}</p>
            
            <button className={buttonStyles.join(' ')} onClick={() => setDetails(prev =>!prev)}>
               {details ? 'Hide details' : 'Show details'}</button>
                {details && 
                <div>
                    <h3 className="font-bold">Фамилия</h3>
                    <p>{employer.surname}</p>
                    <h3 className="font-bold">Номер телефона</h3>
                    <p>{employer.phone}</p>
                    <h3 className="font-bold">Имя компании</h3>
                    <p>{employer.companyName}</p>
                    <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={openEmployer}
          >
            Изменить
          </button>
        
          {modalEmployer && (
          <ModalApp title="Изменение работодателя" onCloseApp={closeEmployer}>
            <UpdateEmployerAdmin employerId={employer.id} onUpdate={closeEmployer} />
          </ModalApp>
        )}
        
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={()=> delEmployer(employer.id)}
          >
            Удалить
          </button>

                </div>}
              
        </div>
    )
}