import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer} from "../models";
import { ModalContext } from "../context/ModalContext";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useEmployer } from "../hooks/employers";
import { useEmployerUpdate } from "../hooks/employerupdate";
import { vacancy } from "../data/vacancy";
import { Vacancy } from "../components/Vacancies";
import { useVacancies } from "../hooks/vacancies";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useResumes } from "../hooks/resumes";
import { useApplicantUpdate } from "../hooks/applicantupdate";
import { useStaffUpdate } from "../hooks/staffupdate";
import { useStaffId } from "../hooks/staffid";




export function StaffPage() {
    const navigation = useNavigate()
   
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    async function checkStaff() {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch('https://localhost:7186/Staff/checkstaff', {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + token  // передача токена в заголовке
          }
      });
      if (response.ok=== true) {
        
        
        return;
      }
      else
      {
        console.log("Status: ", response.status);
        navigation("/")
      }
  };


    var {staff, staffid} = useStaffId()

   
      

      useEffect(() => {
        checkStaff()

        UpdateField();
      }, [staff]);

    function UpdateField()
    {
        if(staff != null)
        {   setEmail(staff.id.toString())
            setName(staff.name);
            setSurname(staff.surname);
            
            setAdmin(staff.admin);

        }
    }

   const [admin, setAdmin] = useState(false);
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [email, setEmail] = useState("");
   const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setName(event.target.value);
    }
    const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSurname(event.target.value);
    }
    
    const changeAdmin = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setAdmin(prev =>!prev);
    }
  

      
    
   const submitUpdate = async (event: React.FormEvent) =>
   {
    event.preventDefault();
    if(name === "" || surname === "")
    {
      setErrorValidation(true)
      setErrorValidationText("Заполните все поля")
      return
    }
    else
    {
    const formData = new FormData();
    formData.append("email", email)
    formData.append("name", name);  
    formData.append("surname", surname);
    if(staff?.admin)
        var admins = "true";
        else
        var admins = "false"
        formData.append("admin", admins )
    try
        {
            const response = await axios.post('https://localhost:7186/Staff/updateStaff', formData)
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
      
       
        
  
    return (
      <form onSubmit={submitUpdate}>
        <p className=" font-bold ml-4 mt-3 mb-3">Почта: {staff?.email}</p>
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
        

        

        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <><input type="checkbox" id="contactChoice9"
                name="checkAdmin" value="admin" onChange={changeAdmin} checked={admin} /><label className="text-black mr-3" htmlFor="contactChoice9">Is Admin</label></>
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
    
        
       
        
    )

 }   

function SetError() {
    throw new Error("Ошибка входа");
}
function setErrMsg(arg0: string) {
    throw new Error("Function not implemented.");
}

