import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IProduct, IStaff, IVacancy } from "../models"

export function useStaff()
{
    const [staff, setstaff] = useState<IStaff[]>([])
  const [loading3, setLoading] = useState(false) 
  const [error3, setError] = useState('')
  function addStaff(staff: IStaff){
    setstaff(prev =>[...prev,staff])
  }
  async function fetchStaffs() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IStaff[]>('https://localhost:7186/Staff/getStaff')
      setstaff(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error3 = e as AxiosError
      setLoading(false)
      setError (error3.message)

      
    }
    
  }



  useEffect(() =>{
fetchStaffs()
  },[])

  return {staff, error3, loading3, addStaff, fetchStaffs}
}