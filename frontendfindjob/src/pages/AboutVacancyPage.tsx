import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { IApplicant, IEmployer, IRewiews, IVacancyAbout } from "../models";
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
import { useApplicantId } from "../hooks/applicantid";




export function AboutVacancyPage() {
  
  const [rewiew, setCommentText] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();
  const [checkrole, setCheckRole] = useState(false);
  const [checkroleapp, setCheckRoleApp] = useState(false);

  const [errorValidation, setErrorValidation] = useState(false);
  const [errorValidationText, setErrorValidationText] = useState("");
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorRequestText, setErrorRequestText] = useState("");
  const [rewiews, setRewiews] = useState([])
  const [vacancies, setVacancy] = useState([])
 
  const { openVacancy, closeVacancy, modalVacancy } =
    useContext(ModalContextVacancy);
    const message: string = id !== undefined ? id : '';
    var {applicantid, applicant} = useApplicantId()
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
        setCheckRoleApp(true)
        
        return;
      }
      else
      {
        console.log("Status: ", response.status);
        setCheckRoleApp(false)
      }
  };
  async function checkRoles(id : number) {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch('https://localhost:7186/Vacancy/checkprivs/' + id, {
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
    async function delRewiew (id: number) {
        console.log("ffff")

        const response =  await axios.get('https://localhost:7186/Rewiew/delRewiew/' + id)
        console.log(response.data)
        fetchRewiewData();
    }
    async function delVacancy (id: number) {
        

        const response =  await axios.get('https://localhost:7186/Vacancy/delVacancy/' + id)
        console.log(response.data)
        navigation("/")
    }
    const fetchRewiewData = () => {

            axios.get('https://localhost:7186/Rewiew/loadRewiew/' + id)
                .then((res) => {
                    setRewiews(res.data)
                })
    }
    const fetchVacancyData = () => {

         axios.get('https://localhost:7186/Vacancy/loadsVacancy/' + id)
            .then((res) => {
                setVacancy(res.data)
            })
    }
    const formdata = new FormData()
    formdata.append("vacancyid", message )
    formdata.append("applicantid", applicantid.toString() )
    formdata.append("rewiew", rewiew)
    const postComment = async () =>
    {
      if(rewiew === "")
      return

        await axios.post('https://localhost:7186/Rewiew/addRewiew', formdata)
    }


    

  const handleCommentPost = () => {
    
    postComment().then((res) => {
      setCommentText("");
      fetchRewiewData();
      
    });
  };

  useEffect(() => {
   
    fetchRewiewData();
    
  }, [vacancies]);

  useEffect(() => {
   
    fetchVacancyData();
    checkApplicant();
    checkRoles(Number(id));
    
  }, []);
  



  return (
    <>
      {" "}
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Grid container spacing={1} alignItems="flex-start">
       
        <div>
        {vacancies.map((vac: IVacancyAbout) => {
            return(
                <div key = {vac.id}>
          <Grid item xs={12} >
            <Typography variant="h3" color="textPrimary" gutterBottom>
              {vac.nameVacancy}
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
              Требования: {vac.skills}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Зарплата: {vac.salary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Почта работодателя: {vac.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Номер работодателя: {vac.phone}
            </Typography>
          </Grid>
          {checkrole && (
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={openVacancy}
          >
            Изменить
          </button>
        )}
          {modalVacancy && (
          <ModalReg title="Изменение вакансии" onClose={closeVacancy}>
            <UpdateVacancy vacancyId={Number(id)} onUpdate={closeVacancy} />
          </ModalReg>
        )}
        {checkrole && (
          <button
            className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
            onClick={()=> delVacancy(vac.id)}
          >
            Удалить
          </button>
        )}
          </div>
            );
        })}
          </div>

          {checkroleapp && <Grid item xs={12}>
            <Box sx={{ paddingTop: 8 }}>
              <Typography variant="h6">Комментарии:</Typography>
              <TextField
                label="Оставьте свой комментарий здесь..."
                multiline
                rows={4}
                fullWidth
                value={rewiew}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
              <Button className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
                
                onClick={handleCommentPost}
              >
                Отправить комментарий
              </Button>
            </Box>
          </Grid>}
          
          <Grid item xs={12}>
            {rewiews.map((comment: IRewiews) => {
                
              return (
                <Card sx={{ marginBlock: 1 }} key = {comment.id} >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        wordBreak: "break-all",
                        paddingBlock: 1,
                        paddingInline: 2,
                      }}
                    >
                      {comment.rewiews}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="primary"
                      sx={{ paddingBlock: 1, paddingInline: 2 }}
                      
                    >
                      {comment.email}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="primary"
                      sx={{ paddingBlock: 1, paddingInline: 2 }}
                      
                    >
                      {new Date(comment.dates).toLocaleDateString("en-US")}
                    </Typography>
                    {checkrole && <button className="mt-3 py-2 px-4 w-full flex-col border border-solid border-gray-300 rounded mr-8  bg-yellow-400 hover:bg-yellow-900"
                        onClick={()=> delRewiew(comment.id)}>
                    Удалить
                </button>}
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>
        
      
      </Container>
    </>
  );
}
