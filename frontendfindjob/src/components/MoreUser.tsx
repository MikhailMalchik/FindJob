import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { IApplicant, IEmployer } from "../models";
import { ModalContext } from "../context/ModalContext";
import { ModalContextCreate } from "../context/ModalCreateVacancyContext";
import { useNavigate } from "react-router-dom";

export function MoreUser({}) {
  const [nameVac, setameVac] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setgender] = useState("");
  const [applicantoremployer, setApplicantorEmployer] = useState(true);
  const [companyname, setCompanyName] = useState("");
  const { modalCreate, openCreate, closeCreate } =
    useContext(ModalContextCreate);
  const [checkStaff, setStaff] = useState(false);
  const [checkAdmin, setAdmin] = useState(false);
  const navigation = useNavigate();
  const handleClickExit = () => {
    sessionStorage.clear();
    navigation("/");
    navigation(0);
  };
  async function checkApplicant() {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch(
      "https://localhost:7186/Applicant/checkapplicant",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token, // передача токена в заголовке
        },
      }
    );
    if (response.ok === true) {
      navigation("/applicant");
      return;
    } else {
      const response = await fetch(
        "https://localhost:7186/Employer/checkemployer",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token, // передача токена в заголовке
          },
        }
      );
      if (response.ok === true) {
        navigation("/employer");
        return;
      } else {
        const response = await fetch("https://localhost:7186/Staff/checkstaff", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token, // передача токена в заголовке
          },
        });
        if (response.ok === true) {
          navigation("/staff");
          return;
        }
      }
    }
  }
  const handleClickProfile = () => {
    checkApplicant();
  };
  const handleChangeEmployertoApplicantor = () => {
    setApplicantorEmployer(true);
    setStaff(false);
  };
  const handleChangeStaff = () => {
    setApplicantorEmployer(false);
    setStaff(true);
  };

  return (
    <>
      <div className=" py-1     w-full">
        <button
          onClick={handleClickProfile}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
        >
          Профиль
        </button>
      </div>
      <div className=" py-1  w-full">
        <button
          onClick={handleClickExit}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Выйти
        </button>
      </div>
    </>
  );
}
