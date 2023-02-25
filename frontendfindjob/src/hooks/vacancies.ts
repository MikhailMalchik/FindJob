import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct, IVacancy } from "../models"

export function useVacancies()
{
    const [vacancy, setVacancy] = useState<IVacancy[]>([])
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState('')
  function addVacancy(vacancy: IVacancy){
    setVacancy(prev =>[...prev,vacancy])
  }
  async function fetchVacancies() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IVacancy[]>('https://localhost:7186/Vacancy/getVacancies')
      setVacancy(response.data)
      
      setLoading(false)      
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError (error.message)

      
    }
    
  }



  useEffect(() =>{
fetchVacancies()
  },[])

  return {vacancy, error, loading, addVacancy}
}