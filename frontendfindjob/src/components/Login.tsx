import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer} from "../models";
import { ModalContext } from "../context/ModalContext";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";


export function Login({ }) {
   
    const [phone, setPhone] = useState("");
    const [checkemail, setCheckEmai] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setgender] = useState("");
    const [applicantoremployer, setApplicantorEmployer] = useState(false);
    const [companyname, setCompanyName] = useState("");
    const {modal,open,close} = useContext(ModalContext);
    const [checkStaff, setStaff] = useState(false)
    const [checkAdmin, setAdmin] = useState(false)
    const [errortext, setErrorText] = useState('')
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState('yes');
    const navigation = useNavigate()

    const handleChangeApplicantortoEmployer = (event: any) => {
        setApplicantorEmployer(false);
        setStaff(false)
        setSelected(event.target.value);
      };
      const handleChangeEmployertoApplicantor = (event: any) => {
        setApplicantorEmployer(true);
        setStaff(false)
        setSelected(event.target.value);
      };
      const handleChangeStaff = (event: any) => {
        setStaff(true);
        setSelected(event.target.value);
      };
      
      

   
   
  
    const loginUser = async (event: React.FormEvent)=> {
      
      event.preventDefault();
  
      if (password.trim() === "" || email.trim() === "") return;
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      var result = "";
      if(applicantoremployer === true && checkStaff === false)
      {
        
        
        const response = await fetch(
      "https://localhost:7186/Applicant/token", {
          method: "Post",
         
          body: formData
        }
          
        );
        if(response.ok == false)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else
        {
        console.log(response)
        var data = await response.json()
        result = data.access_token;
        
        if(result === undefined)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else{
          setError(false)
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("accessToken",result);
          close()
          navigation(0)
        }
        
       
      }
    }
      else if(applicantoremployer === false && checkStaff === false){ 
        const response = await fetch( "https://localhost:7186/Employer/token",{
          method: "Post",
         
          body: formData
        }
          
        );
        if(response.ok == false)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else
        {
        console.log(response)
        var data = await response.json()
        result = data.access_token;
        
        if(result === undefined)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else{
          setError(false)
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("accessToken",result);
          close()
          navigation(0)
        }
      }
      }
      else
      {
        if(checkAdmin){
        var admins = "true";
        }
        else{
        var admins = "false"
        }
        
        formData.append("admin", admins )
        
        const response = await fetch(
          "https://localhost:7186/Staff/token", {
          method: "Post",
         
          body: formData
        }
          
        );
        if(response.ok == false)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else
        {
        console.log(response)
        var data = await response.json()
        result = data.access_token;
        
        if(result === undefined)
        {
        setErrorText("Неуспешная попытка входа")
        setError(true)
        }
        else{
          console.log(result)
          setError(false)
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("accessToken",result);
          close()
          navigation(0)
        }
      }
    }
  
  
      
       
        
      
  
      
  
      
    }
  
    return (
      
          
          <Form className="mt-3 py-2 px-4 flex-col border border-solid border-gray-300 rounded mr-8 " onSubmit={loginUser}>
           
                <input type="radio" id="contactChoice1"
               name="contact" value="email"   onChange={ handleChangeApplicantortoEmployer } />
         
            <label className="text-black mr-3"  htmlFor="contactChoice1">Работодатель</label>
            <input type="radio" id="contactChoice2"
         name="contact" value="phone"  onChange={handleChangeEmployertoApplicantor}/>
         <label className="text-black mr-3" htmlFor="contactChoice2">Соискатель</label>
         <input type="radio" id="contactChoice3"
         name="contact" value="worker"  onChange={handleChangeStaff}/>
         <label className="text-black mr-3" htmlFor="contactChoice3">Работник</label>
        
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              type="password"
              value={password}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            {checkStaff && <><input type="checkbox" id="contactChoice7"
                name="checkAdmin" value="admin" onChange={()=> setAdmin(!checkAdmin)} checked={checkAdmin} /><label className="text-black mr-3" htmlFor="contactChoice7">Is Admin</label></>}
                   
            <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>
            {error && <h2 className=" text-red-600">{errortext}</h2>}
          </Form>

        
        
    )
}

function SetError() {
    throw new Error("Ошибка входа");
}
function setErrMsg(arg0: string) {
    throw new Error("Function not implemented.");
}

