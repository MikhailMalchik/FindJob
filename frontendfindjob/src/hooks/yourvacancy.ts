import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IVacancy } from "../models"


export function useYourVacancy(id: any)
{
  const [vacancies, setVacancy] = useState<IVacancy>()
  const [loading3, setLoading] = useState(false) 
  const [error3, setError] = useState('')
  
  async function fetchEmployers() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IVacancy>('https://localhost:7186/Vacancy/getVacancy/' + id)
      if(response.data === undefined)
      return;
      setVacancy(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error2 = e as AxiosError
      setLoading(false)
      setError (error2.message)

      
    }
    
    
  }



  useEffect(() =>{
fetchEmployers()
  },[])

  return {vacancies, error3, loading3}
}