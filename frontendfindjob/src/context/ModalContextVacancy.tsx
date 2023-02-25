import React, { createContext, useState } from 'react'

interface IModalContextVacancy {
    modalVacancy: boolean
    openVacancy :() => void
    closeVacancy: () => void
}

export const ModalContextVacancy = createContext<IModalContextVacancy>({
    modalVacancy: false,
    openVacancy: () => {},
    closeVacancy: () => {}
})

export const ModalStateVacancy = ({children}: {children: React.ReactNode}) => { 
    const [modalVacancy,setModal] = useState(false)
    const openVacancy = () => setModal(true)
    const closeVacancy = () => setModal(false)
    return ( 
        <ModalContextVacancy.Provider value={{modalVacancy,openVacancy,closeVacancy}}>
            {children}
        </ModalContextVacancy.Provider>
    )
}