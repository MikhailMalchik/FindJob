import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer, IResume, IRewiews, IVacancyAbout } from "../models";
import { ModalContext } from "../context/ModalContext";
import { useSignIn } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployer } from "../hooks/employers";
import { useEmployerUpdate } from "../hooks/employerupdate";
import { vacancy } from "../data/vacancy";
import { Vacancy } from "../components/Vacancies";
import { useVacancies } from "../hooks/vacancies";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useYourVacancy } from "../hooks/yourvacancy";
import { format } from 'date-fns'
import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UpdateVacancy } from "../components/UpdateVacancy";
import { ModalContextVacancy } from "../context/ModalContextVacancy";
import { ModalReg } from "../components/ModalRegistration";
import { useApplicant } from "../hooks/applicants";
import { useApplicantUpdate } from "../hooks/applicantupdate";
import { ModalContextResume } from "../context/ModalContextResume";
import { UpdateResume } from "../components/UpdateResume";




export function AboutResumePage() {
  
  
  const navigation = useNavigate();
  const { id } = useParams();
  const [checkrole, setCheckRole] = useState(false);
  const [checkroleapp, setCheckRoleApp] = useState(true);

  const [errorValidation, setErrorValidation] = useState(false);
  const [errorValidationText, setErrorValidationText] = useState("");
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorRequestText, setErrorRequestText] = useState("");
  
  const [resume, setResume] = useState([])
 
  const { openResume, closeResume, modalResume } =
    useContext(ModalContextResume);
    
    const message: string = id !== undefined ? id : '';
    const message2: string = localStorage.getItem("user")!;

    async function getData() {
      const token = sessionStorage.getItem("access_token");

      const response = await fetch('https://localhost:7186/Resume/getapplicantid/' + id, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + token  // передача токена в заголовке
          }
      });
      if (response.ok=== true) {
           
          setCheckRole(true)
      }
      else
      {
        setCheckRole(false)}
        console.log("Status: ", response.status);
  };
  async function checkRoles(id : number) {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch('https://localhost:7186/Staff/checkprivs/' + id, {
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

      setCheckRole(true)
      }
      else{
        setCheckRole(false)
      }

      
      return;
    }
    else
    {
      console.log("Status: ", response.status);
      setCheckRole(false)
    }
};

    async function delResume (id: number) {
        

        const response =  await axios.get('https://localhost:7186/Resume/delResume/' + id)
        console.log(response.data)
        navigation("/resumes")
    }
        const fetchResumeData = () => {

         axios.get('https://localhost:7186/Resume/loadsResume/' + id)
            .then((res) => {
                setResume(res.data)
            })
    }
    const formdata = new FormData()
    formdata.append("vacancyid", message )
    formdata.append("applicantid", message2 )

    

   


    

 

  useEffect(() => {
   
    
   
        getData()
        
  }, []);

  useEffect(() => {
   
    fetchResumeData();
    checkRoles(Number(id))
    
    
  }, []);
  



  return (
    <>
      {" "}
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Grid container spacing={1} alignItems="flex-start">
       
        <div>
        {resume.map((vac: IVacancyAbout) => {
            return(
                <div key = {vac.id}>
          <Grid item xs={12} >
            <Typography variant="h3" color="textPrimary" gutterBottom>
              {vac.email}
            </Typography>
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Описание: {vac.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Опыт работы: {vac.experience}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Скилы: {vac.skills}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Номер соискателя: {vac.phone}
            </Typography>
          </Grid>
          {checkrole && (
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={openResume}
          >
            Изменить
          </button>
        )}
          {modalResume && (
          <ModalReg title="Изменение резюме" onClose={closeResume}>
            <UpdateResume resumeId={Number(id)} onUpdate={closeResume} />
          </ModalReg>
        )}
        {checkrole && (
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={()=> delResume(vac.id)}
          >
            Удалить
          </button>
        )}
          </div>
            );
        })}
          </div>

         
            
          
        </Grid>
        
     
      </Container>
    </>
  );
}
