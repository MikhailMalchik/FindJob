import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { IApplicant, IEmployer} from "../models";
import { ModalContext } from "../context/ModalContext";

export function Registration({ }) {
    const [phone, setPhone] = useState("");
    const [checkemail, setCheckEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setgender] = useState("");
    const [applicantoremployer, setApplicantorEmployer] = useState(true);
    const [companyname, setCompanyName] = useState("");
    const {modal,open,close} = useContext(ModalContext);
    const [checkStaff, setStaff] = useState(false)
    const [checkAdmin, setAdmin] = useState(false)
    const [error, setError] = useState(false)
    const [errortext, setErrorText] = useState('')
    const handleChangeGenderMale = () => {
      setgender("мужчина");
    };
    const handleChangeGenderFemale = () => {
      setgender("женщина");
    };
    const handleChangeApplicantortoEmployer = () => {
      setApplicantorEmployer(false);
      setStaff(false);
    };
    const handleChangeEmployertoApplicantor = () => {
      setApplicantorEmployer(true);
      setStaff(false);
    };
    const handleChangeStaff = () => {
      setApplicantorEmployer(false);
      setStaff(true);
    };

    
   

    
  
    const regUser = async (event: React.FormEvent)=> {
      event.preventDefault();
  
      if (password.trim() === "" || email.trim() === "" || surname.trim() === ""  ) 
      {
        setErrorText("Введите все поля")
        setError(true)
        return;
      }
      const formData = new FormData();
      setError(false)
  
      formData.append("name", name);
      
      formData.append("surname", surname);
      formData.append("password", password);
      formData.append("email", email);
      var result = false
      if(applicantoremployer === true && checkStaff == false)
      {
        formData.append("phone", phone)
        formData.append("age", age)
        formData.append("gender", gender)
        const response = await axios.post(
          "https://localhost:7186/Applicant/addApplicant",
          formData
        );
        result = response.data;
      }
      else if (applicantoremployer === false && checkStaff == false){
        formData.append("phone", phone)
        formData.append("companyname",companyname)
        const response = await axios.post(
          "https://localhost:7186/Employer/addEmployer",
          formData
        );
        result = response.data;
      }
      else {
        if(checkAdmin)
        var admins = "true";
        else
        var admins = "false"
        formData.append("admin", admins )
        
        const response = await axios.post(
            "https://localhost:7186/Staff/addStaff",
           formData
          );
          result = response.data;
      }
      console.log(formData);
  
  
      console.log(result);
  
      if (result === false) {
        setErrorText("Неуспешная попытка регистрации, введите все поля")
        setError(true)
        return
      }

  
      localStorage.setItem("user", email);
      localStorage.setItem("admin","false");
  
      
    }
  
    return (
      
          
          <Form className="mt-3 py-2 px-4 flex-col border border-solid border-gray-300 rounded mr-8 " onSubmit={regUser}>
            <input type="radio" id="contactChoice1"
          name="contact" value="email" onChange={handleChangeApplicantortoEmployer} />
         <label className="text-black mr-3 mb-2" htmlFor="contactChoice1">Работодатель</label>

         <input type="radio" id="contactChoice2"
         name="contact" value="phone" onChange={handleChangeEmployertoApplicantor }/>
         <label  className="text-black mr-3 mb-2" htmlFor="contactChoice2">Соискатель</label>
         <input type="radio" id="contactChoice8"
         name="contact" value="phone" onChange={handleChangeStaff}/>
         <label className="text-black mr-3" htmlFor="contactChoice8">Работник</label>
          {!checkStaff && <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={phone}
              placeholder="Телефон"
              onChange={(e) => setPhone(e.target.value)}
            />}
            
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            {checkemail && <span>Такой e-mail уже зарегистрирован</span>}
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              type="password"
              value={password}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={name}
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={surname}
              placeholder="Фамилия"
              onChange={(e) => setSurname(e.target.value)}
            />
            {applicantoremployer && !checkStaff &&<Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={age}
              placeholder="Возраст"
              onChange={(e) => setAge(e.target.value)}
            />}
            {!applicantoremployer && !checkStaff &&<Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={companyname}
              placeholder="Название компании"
              onChange={(e) => setCompanyName(e.target.value)}
            />}

          {applicantoremployer && <><input type="radio" id="contactChoice3"
          name="gendertype" value="genderM" onChange={handleChangeGenderFemale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoice3">Мужчина</label></>}
          {applicantoremployer && <><input type="radio" id="contactChoice4"
          name="gendertype" value="genderF" onChange={handleChangeGenderMale} /><label className="text-black mr-3 mt-2" htmlFor="contactChoicer4">Женщина</label></>}
           {checkStaff && <><input type="checkbox" id="contactChoice9"
                name="checkAdmin" value="admin" onChange={()=> setAdmin(!checkAdmin)} checked={checkAdmin} /><label className="text-black mr-3" htmlFor="contactChoice9">Is Admin</label></>}
            <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>
            {error && <h2 className=" text-red-600">{errortext}</h2>}
          </Form>

          
        
    )
}