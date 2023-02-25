import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer, IVacancy} from "../models";
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
import { ModalContextCreate } from "../context/ModalCreateVacancyContext";
import { CreateVacancy } from "../components/CreateVacancy";
import { ModalReg } from "../components/ModalRegistration";
import { useEmployerId } from "../hooks/employerid";




export function EmployerPage() {
    const navigation = useNavigate()
    
    const {modalCreate,openCreate,closeCreate} = useContext(ModalContextCreate)
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
    var {employerid, employer} = useEmployerId()
    
    const {loading, error, vacancy, addVacancy} = useVacancies()



    async function checkEmployer() {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch('https://localhost:7186/Employer/checkemployer', {
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
   
      

      useEffect(() => {
        checkEmployer()
        
        UpdateField();
      }, [employer]);

    function UpdateField()
    {
        if(employer != null)
        {   setEmail(employer.id)
            setPhone(employer.phone);
            setName(employer.name);
            setSurname(employer.surname);
            setCompanyName(employer.companyName);

        }
    }
    const   createHandler =(vacancy :IVacancy) => {
      
      addVacancy(vacancy)
    }

   const [phone, setPhone] = useState("");
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [companyname, setCompanyName] = useState("");
   const [email, setEmail] = useState(0);
   const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setName(event.target.value);
    }
    const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSurname(event.target.value);
    }
    const changePhone = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setPhone(event.target.value);
    }
    const changeCompanyName = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setCompanyName(event.target.value);
    }

      
    
   const submitUpdate = async (event: React.FormEvent) =>
   {
    event.preventDefault();
    if(name === "" || surname === "" || phone === "" || companyname === "")
    {
      setErrorValidation(true)
      setErrorValidationText("Заполните все поля")
      return
    }
    else
    {
    const formData = new FormData();
    formData.append("email", email.toString())
    formData.append("name", name);  
    formData.append("surname", surname);
    formData.append("phone", phone);
    formData.append("companyname", companyname);
    try
        {
            const response = await axios.post('https://localhost:7186/Employer/updateEmployer', formData)
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
      <><form onSubmit={submitUpdate}>
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


        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={phone}
          placeholder="Телефон"
          onChange={changePhone} />

        <input type="text"
          className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
          value={companyname}
          placeholder="Имя компании"
          onChange={changeCompanyName} />

        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
      <div className="parent flex justify-center content-center items-center mt-5">
        
     

        <div  className=" w-full mr-4 ml-4 content-center">
        <p className="font-bold text-center mb-5 text-xl">Вакансии</p>
        

        {vacancy.filter((vacancy) => vacancy.employerId === employerid  ).map(vacancy => <Vacancy vacancy={vacancy} key={vacancy.id} />)}


          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
          <div className="w-full mx-0  mr-4 ">
        
        <button className="border-rose-500 border-2 px-2 py-2 mr-5 mb-5 hover:text-rose-500 " onClick={ openCreate }>Создать вакансию </button>
        {modalCreate  && <ModalReg title="Создание вакансии" onClose={() => closeCreate()}>
          <CreateVacancy onCreate={createHandler}/>
        </ModalReg>}
        
      </div>
        </div>
        
        </div>
        </>
        
    )

 }   

function SetError() {
    throw new Error("Ошибка входа");
}
function setErrMsg(arg0: string) {
    throw new Error("Function not implemented.");
}

