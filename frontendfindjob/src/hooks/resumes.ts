import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct, IResume } from "../models"

export function useResumes()
{
    const [resume, setResume] = useState<IResume[]>([])
  const [loading5, setLoading] = useState(false) 
  const [error5, setError] = useState('')
  function addResume(resume: IResume){
    setResume(prev =>[...prev,resume])
  }
  async function fetchVacancies() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IResume[]>('https://localhost:7186/Resume/getResumes')
      setResume(response.data)
      
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

  return {resume, error5, loading5, addResume}
}