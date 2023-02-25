import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ModalState } from "./context/ModalContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { ModalStateCreate } from "./context/ModalCreateVacancyContext";
import { ModalStateUser } from "./context/ModalContextUser";
import { ModalStateVacancy } from "./context/ModalContextVacancy";
import { ModalStateResume } from "./context/ModalContextResume";
import { ModalStateApplicant } from "./context/ModalContextApplicant";
import { ModalStateEmployer } from "./context/ModalContextEmployer";
import { ModalStateStaff } from "./context/ModalContextStaff";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ModalStateCreate>
      <ModalStateUser>
        <ModalStateApplicant>
          <ModalStateEmployer>
            <ModalStateStaff>
              <ModalStateVacancy>
                <ModalStateResume>
                  <ModalState>
                    <App />
                  </ModalState>
                </ModalStateResume>
              </ModalStateVacancy>
            </ModalStateStaff>
          </ModalStateEmployer>
        </ModalStateApplicant>
      </ModalStateUser>
    </ModalStateCreate>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
