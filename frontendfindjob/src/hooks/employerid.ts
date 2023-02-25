import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IApplicant, IEmployer } from "../models"


export function useEmployerId()
{
    const [employer, setEmployer] = useState<IEmployer>()
  const [employerid, setEmployerid] = useState(0)  
  async function fetchEmployers() {
    try {
       
        const token = sessionStorage.getItem("accessToken");

        const response = await fetch('https://localhost:7186/Employer/getemployerid', {
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
           setEmployerid(nymber)
           const response1 = await axios.get<IEmployer>('https://localhost:7186/Employer/loadEmployer/' + nymber)
           setEmployer(response1.data)
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
fetchEmployers()
  },[])

  return {employer, employerid}
}