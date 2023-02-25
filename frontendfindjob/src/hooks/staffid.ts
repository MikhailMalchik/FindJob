import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IApplicant, IEmployer, IStaff } from "../models";

export function useStaffId() {
  const [staff, setStaff] = useState<IStaff>();
  const [staffid, setStaffid] = useState(0);
  async function fetchStaffs() {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await fetch("https://localhost:7186/Staff/getstaffid", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token, // передача токена в заголовке
        },
      });
      if (response.ok === true) {
        const data = await response.json();
        var nymber = Number(data);
        console.log(data);
        setStaffid(nymber);
        const response1 = await axios.get<IStaff>(
          "https://localhost:7186/Staff/loadStaff/" + nymber
        );
        setStaff(response1.data);
        return;
      } else {
        console.log("Status: ", response.status);
      }
    } catch (e: unknown) {
      const error2 = e as AxiosError;
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  return { staff, staffid };
}
