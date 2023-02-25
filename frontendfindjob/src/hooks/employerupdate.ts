import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IEmployer, IProduct, IVacancy } from "../models"


export function useEmployerUpdate(Id: number)
{
  const [employer, setEmployer] = useState<IEmployer>()
  const [loading2, setLoading] = useState(false) 
  const [error2, setError] = useState('')
  
  async function fetchEmployers() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IEmployer>('https://localhost:7186/Employer/loadEmployer/' + Id)
      setEmployer(response.data)
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

  return {employer, error2, loading2}
}