import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IVacancy } from "../models"


export function useVacancyUpdate(id: number)
{
  const [vacancy, setVacancy] = useState<IVacancy>()
  const [loading4, setLoading] = useState(false) 
  const [error4, setError] = useState('')
  
  async function fetchvacancys() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IVacancy>('https://localhost:7186/Vacancy/loadVacancy/' + id)
      setVacancy(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error4 = e as AxiosError
      setLoading(false)
      setError (error4.message)

      
    }
    
  }



  useEffect(() =>{
fetchvacancys()
  },[])

  return {vacancy, error4, loading4}
}