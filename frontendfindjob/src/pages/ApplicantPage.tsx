import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer, IResume} from "../models";
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
import { Resume } from "../components/Resumes";
import { CreateResume } from "../components/CreateResume";
import { ModalContextResume } from "../context/ModalContextResume";
import { ModalReg } from "../components/ModalRegistration";
import da from "date-fns/esm/locale/da/index.js";
import { useApplicantId } from "../hooks/applicantid";




export function ApplicantPage() {
    const navigation = useNavigate()
    var userid = 0;
    const [errorValidation, setErrorValidation] = useState(false);
    const [errorValidationText, setErrorValidationText] = useState('');
    const [errorRequest, setErrorRequest] = useState(false);
    const [errorRequestText, setErrorRequestText] = useState('');
   
    
    var myNumber = Number(userid)
    const {loading5, error5, resume, addResume} = useResumes()
    var {applicantid, applicant} = useApplicantId()

    

    const { openResume, closeResume, modalResume } =
    useContext(ModalContextResume);

    async function checkApplicant() {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch('https://localhost:7186/Applicant/checkapplicant', {
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
  
    const   createHandler =(resume :IResume) => {
      
      addResume(resume)
    }

   
      

      useEffect(() => {
        checkApplicant()
        

        UpdateField();
      }, [applicant]);

    function UpdateField()
    {
        if(applicant != null)
        {   setEmail(applicant.id)
            setPhone(applicant.phone);
            setName(applicant.name);
            setSurname(applicant.surname);
            setAge(applicant.dateOfBirth);
            setGender(applicant.gender);

        }
    }

   const [phone, setPhone] = useState("");
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [age, setAge] = useState("");
   const [gender, setGender] = useState("");
   const [email, setEmail] = useState(0);
   const handleChangeGenderMale = () => {
    setGender("мужчина");
  };
  const handleChangeGenderFemale = () => {
    setGender("женщина");
  };
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
    const changeAge = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setAge(event.target.value);
    }
  

      
    
   const submitUpdate = async (event: React.FormEvent) =>
   {
    event.preventDefault();
    if(name === "" || surname === "" || phone === "" || age === "")
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
    formData.append("age", age);
    formData.append("gender", gender);
    try
        {
            const response = await axios.post('https://localhost:7186/Applicant/updateApplicant', formData)
            navigation(0);
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
          value={age}
          placeholder="Возраст"
          onChange={changeAge} />

          <><input type="radio" id="contactChoice3"
          name="gendertype" value="genderM"  onChange={handleChangeGenderMale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoice3">Мужчина</label></>
          <><input type="radio" id="contactChoice4"
          name="gendertype" value="genderF" onChange={handleChangeGenderFemale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoicer4">Женщина</label></>
        

        {errorValidation && <h2>{errorValidationText}</h2>}
        {errorRequest && <h2>{errorRequestText}</h2>}
        <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>

      </form>
      <div className="parent flex justify-center content-center items-center mt-5">
        
     

        <div  className=" w-full mr-4 ml-4 content-center">
        <p className="font-bold text-center mb-5 text-xl">Ваше резюме</p>
        

        {resume.filter((resume) => applicantid === resume.applicantId).map(resume => <Resume resume={resume} key={resume.id} />)}


          {loading5 && <Loader />}  
          {error5 && <ErrorMessage error={error5} />}
          
        </div>

        <button className="border-rose-500 border-2 px-2 py-2 mr-5  hover:text-rose-500 " onClick={ openResume}>Создать резюме </button>
          {modalResume && <ModalReg title="Создание резюме" onClose={() => closeResume()}>
            <CreateResume onCreate={createHandler}/>
          </ModalReg>}
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

