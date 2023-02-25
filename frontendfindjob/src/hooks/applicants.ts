import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct, IApplicant, IVacancy } from "../models"

export function useApplicant()
{
    const [applicant, setApplicant] = useState<IApplicant[]>([])
  const [loading1, setLoading] = useState(false) 
  const [error1, setError] = useState('')
  function addApplicant(Applicant: IApplicant){
    setApplicant(prev =>[...prev,Applicant])
  }
  async function fetchApplicants() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IApplicant[]>('https://localhost:7186/Applicant/getApplicant')
      setApplicant(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error1 = e as AxiosError
      setLoading(false)
      setError (error1.message)

      
    }
    
  }



  useEffect(() =>{
fetchApplicants()
  },[])

  return {applicant, error1, loading1, addApplicant}
}