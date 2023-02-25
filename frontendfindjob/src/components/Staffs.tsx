import axios from "axios";
import React, { useContext, useState } from "react"
import { useNavigate, useNavigation } from "react-router-dom";
import { ModalContextStaff } from "../context/ModalContextStaff";
import { useStaff } from "../hooks/staffs";

import { IProduct, IStaff } from "../models"
import { ModalApp } from "./ModalApp";
import { UpdateStaffAdmin } from "./UpdateStaffAdmin";


interface StaffsProps {
    staffd: IStaff
}

export function Staff({staffd}: StaffsProps){

    const [details,setDetails] = useState(false)
    const navigation = useNavigate()
    const {loading3, error3,staff, addStaff, fetchStaffs} = useStaff()
    const { openStaff, closeStaff, modalStaff} =
    useContext(ModalContextStaff);
    async function delStaff (id: any) {
        console.log("ffff")

        const response =  await axios.get('https://localhost:7186/Staff/delStaff/' + id)
        console.log(response.data)
        navigation(0)
    }

    const buttonDetailsColor = details ? 'bg-yellow-400' : 'bg-blue-400'

    const buttonStyles = ['py-2 px-4 border', buttonDetailsColor]

    return (
        
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2 bg-blue-200">
            <h2 className="font-bold">Почта</h2>
            <p>{staffd.email}</p>
            <h3 className="font-bold">Имя</h3>
            <p >{staffd.name}</p>
            
            <button className={buttonStyles.join(' ')} onClick={() => setDetails(prev =>!prev)}>
               {details ? 'Hide details' : 'Show details'}</button>
                {details && 
                <div>
                    <h3 className="font-bold">Фамилия</h3>
                    <p>{staffd.surname}</p>
                    {staffd.admin && <h3 className="font-bold">Является админом</h3>}
                    <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={openStaff}
          >
            Изменить
          </button>
        
          {modalStaff && (
          <ModalApp title="Изменение работника" onCloseApp={closeStaff}>
            <UpdateStaffAdmin staffId ={staffd.id} onUpdate={closeStaff} />
          </ModalApp>
        )}
        
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={()=> delStaff(staffd.id)}
          >
            Удалить
          </button>               
                    
                    

                </div>}
                
    
        </div>
    )
}