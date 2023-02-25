import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { IApplicant, IEmployer, IVacancy} from "../models";
import { ModalContext } from "../context/ModalContext";
import { ModalContextCreate } from "../context/ModalCreateVacancyContext";
import { useNavigate } from "react-router-dom";

interface CreateVacancyProps {
  onCreate: (vacancy:IVacancy) => void
}
export function CreateVacancy({onCreate}:CreateVacancyProps) {
    const navigation = useNavigate()
    const [nameVac, setameVac] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");
    const [employerid, setEmployerId] = useState("");
    const [gender, setgender] = useState("");
    const [applicantoremployer, setApplicantorEmployer] = useState(true);
    const [companyname, setCompanyName] = useState("");
    const {modalCreate,openCreate,closeCreate} = useContext(ModalContextCreate);
    const [checkStaff, setStaff] = useState(false)
    const [checkAdmin, setAdmin] = useState(false)
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
    
   

    
  
    const createVac = async (event: React.FormEvent)=> {
      event.preventDefault();
      
  
      if (nameVac.trim() === "" || description.trim() === "") return;
      const formData = new FormData();

      formData.append("namevacancy", nameVac);

      
      formData.append("description", description);
      formData.append("skills", skills);
      formData.append("experience", experience);
      formData.append("salary", salary);
      const token = sessionStorage.getItem("accessToken");
      let config = {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token  // передача токена в заголовке
        }
      }
      var result = false;
      
        const response = await axios.post(
          "https://localhost:7186/Vacancy/addVacancy",
          formData,
          config
        );
        result = response.data;
     
      
      console.log(formData);
      onCreate(response.data)
   
      
  
  
      console.log(result);
  
      if (result === false) {
        
      }
   
  
      
    }
  
    return (
      
          
          <Form className="mt-3 py-2 px-4 flex-col border border-solid border-gray-300 rounded mr-8 " onSubmit={createVac}>
          
          {!checkStaff && <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={nameVac}
              placeholder="Название вакансии"
              onChange={(e) => setameVac(e.target.value)}
            />}
            
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={description}
              placeholder="Описание"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={skills}
              placeholder="Требования"
              onChange={(e) => setSkills(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={experience}
              placeholder="Необходимый опыт"
              onChange={(e) => setExperience(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={salary}
              placeholder="Зарплата"
              onChange={(e) => setSalary(e.target.value)}
            />
           
            <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>
            <button onClick={() => closeCreate()} className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Отмена</button>
          </Form>

          
        
    )
}