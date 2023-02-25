import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IResume, IVacancy } from "../models"


export function useResumeUpdate(id: number)
{
  const [resume, setResume] = useState<IResume>()
  const [loading7, setLoading] = useState(false) 
  const [error7, setError] = useState('')
  
  async function fetchResumes() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IResume>('https://localhost:7186/Resume/loadResume/' + id)
      setResume(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error4 = e as AxiosError
      setLoading(false)
      setError (error4.message)

      
    }
    
  }



  useEffect(() =>{
fetchResumes()
  },[])

  return {resume, error7, loading7}
}