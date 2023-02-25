import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { IApplicant, IEmployer, IResume, IVacancy} from "../models";
import { ModalContext } from "../context/ModalContext";
import { ModalContextCreate } from "../context/ModalCreateVacancyContext";
import { useNavigate } from "react-router-dom";

interface CreateResumeProps {
  onCreate: (resume:IResume) => void
}
export function CreateResume({onCreate}:CreateResumeProps) {
    const navigation = useNavigate()
   
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [applicantid, setEmployerId] = useState("");
    const {modalCreate,openCreate,closeCreate} = useContext(ModalContextCreate);    
  
    const createRes = async (event: React.FormEvent)=> {
      event.preventDefault();
     
      
  
      if (skills.trim() === "" || description.trim() === ""|| experience.trim() === "") return;
      const formData = new FormData();

      

      
      formData.append("description", description);
      formData.append("skills", skills);
      formData.append("experience", experience);

      var result = false;
      const token = sessionStorage.getItem("accessToken");
      let config = {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token  // передача токена в заголовке
        }
      }

        const response = await axios.post(
          "https://localhost:7186/Resume/addResume",
          
          formData,
          config

        );
        result = response.data;
     
      
      console.log(formData);
      onCreate(response.data)
   
      closeCreate();
  
  
      console.log(result);
  
      if (result === false) {
        
      }
  
      navigation(0)
    }
  
    return (
      
          
          <Form className="mt-3 py-2 px-4 flex-col border border-solid border-gray-300 rounded mr-8 " onSubmit={createRes}>
        
            
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={description}
              placeholder="Описание"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={skills}
              placeholder="Скилы"
              onChange={(e) => setSkills(e.target.value)}
            />
            <Form.Control
              className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8 text-black"
              value={experience}
              placeholder="Опыт"
              onChange={(e) => setExperience(e.target.value)}
            />
           
           
            <button type="submit" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Подтвердить</button>
            <button type="reset" className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900">Отмена</button>
          </Form>

          
        
    )
}