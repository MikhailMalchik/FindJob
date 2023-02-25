import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../context/ModalContext'
import { Modal } from './ModalLogin'
import { ModalReg } from './ModalRegistration'
import { Registration } from './Registration'
import {Login} from './Login'
import { withCookies } from "react-cookie";
import { propTypes } from 'react-bootstrap/esm/Image'
import { ModalContextUser } from '../context/ModalContextUser'
import { ModalUser } from './ModalUser'
import { MoreUser } from './MoreUser'
export function Navigation(this: any){
    const {modal,open,close} = useContext(ModalContext)
    const {modalUser,openUser,closeUser} = useContext(ModalContextUser)
    const[checkcooks, setCooks] =useState(false)
    const[isadmin, setAdmin] = useState(false)
    const[users, setUsers]= useState("")
    const [loginorReg, setLoginorReg] = useState(true)

    async function checkAdmin() {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch('https://localhost:7186/Staff/checkstaff', {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + token  // передача токена в заголовке
          }
      });
      if (response.ok=== true) {
        const data = await response.json()
      if(data == true)
      {
      console.log(data) 
      setAdmin(true) 
      setCooks(true)

        return;
      }
      else
      {
        setCooks(true)
        setAdmin(false)
        console.log("Status: ", response.status);
        
      }
  };
}
    const handleClickReg= () => {
        setLoginorReg(false);
        console.log(loginorReg)
      };
   
      const handleClickLogin= () => {
        setLoginorReg(true);
        console.log(loginorReg)
      };
      useEffect(()=>{
        if(sessionStorage.getItem("accessToken")!= null){
      checkAdmin()
      setCooks(true)
        }
        else{
          setCooks(false)
        }
      
        },[])

     


     

  



   

    return(
        
        <nav 
        style={{
            backgroundColor: '#2F2FA2'
          }}
        className="h-[50px] flex justify-between px-5  text-white items-center  ">
            <span className="font-bold">Поиск работы</span>
            <span>
                <Link to="/" className="mr-5 hover:text-rose-500">Главная</Link>
                <Link to="/resumes" className="mr-5  hover:text-rose-500">Резюме</Link>
                {isadmin && <Link to="/admin" className="mr-5  hover:text-rose-500">Admin</Link>}
            </span>
            <span>
            {checkcooks && <button
               className="border-2 border-rose-500 mr-5 px-2 py-2 hover:text-rose-500" onClick={() => {openUser()}}> {sessionStorage.getItem("email")} </button>}
               {modalUser  && <ModalUser  onClose={() => closeUser()}>
            <MoreUser />
          </ModalUser>}
             {!checkcooks && <button
               className="border-2 border-rose-500 mr-5 px-2 py-2 hover:text-rose-500" onClick={() => {open(); handleClickLogin() } } >Вход </button>}
               {modal && loginorReg &&<Modal title="Вход" onClose={() => close()}>
            <Login />
            </Modal>}
            {!checkcooks && <button className="border-rose-500 border-2 px-2 py-2 mr-5  hover:text-rose-500 " onClick={() => {open(); handleClickReg() }}>Регистрация </button>}
             {modal && !loginorReg &&<Modal title="Регистрация" onClose={() => close()}>
            <Registration />
            </Modal>}
            </span>
        </nav>
    )
}