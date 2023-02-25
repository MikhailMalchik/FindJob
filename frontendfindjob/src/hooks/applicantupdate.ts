import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IApplicant } from "../models"


export function useApplicantUpdate(id: number)
{
  const [applicant, setApplicant] = useState<IApplicant>()
  const [loading6, setLoading] = useState(false) 
  const [error6, setError] = useState('')
  
  
  async function fetchApplicants() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IApplicant>('https://localhost:7186/Applicant/loadApplicant/' + id)
      setApplicant(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error2 = e as AxiosError
      setLoading(false)
      setError (error2.message)

      
    }
    
  }



  useEffect(() =>{
fetchApplicants()
  },[])

  return {applicant, error6, loading6}
}