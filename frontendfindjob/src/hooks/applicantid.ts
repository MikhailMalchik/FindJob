import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IApplicant } from "../models"


export function useApplicantId()
{
    const [applicant, setApplicant] = useState<IApplicant>()
  const [applicantid, setApplicants] = useState(0)  
  async function fetchApplicants() {
    try {
       
        const token = sessionStorage.getItem("accessToken");

        const response = await fetch('https://localhost:7186/Applicant/getapplicantid', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token  // передача токена в заголовке
            }
        });
        if (response.ok=== true) {
           const data = await response.json()
           var nymber = Number(data)
           console.log(data)
           setApplicants(nymber)
           const response1 = await axios.get<IApplicant>('https://localhost:7186/Applicant/loadApplicant/' + nymber)
           setApplicant(response1.data)
           return;
        }

        else
        {
          console.log("Status: ", response.status);
          
        }
         
    } catch (e: unknown) {
      const error2 = e as AxiosError
      

      
    }
    
  }



  useEffect(() =>{
fetchApplicants()
  },[])

  return {applicantid, applicant}
}