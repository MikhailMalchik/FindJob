import React, { createContext, useState } from 'react'

interface IModalContextApplicant {
    modalapplicant: boolean
    openApplicant :() => void
    closeApplicant: () => void
}

export const ModalContextApplicant = createContext<IModalContextApplicant>({
    modalapplicant: false,
    openApplicant: () => {},
    closeApplicant: () => {}
})

export const ModalStateApplicant = ({children}: {children: React.ReactNode}) => { 
    const [modalapplicant,setModal] = useState(false)
    const openApplicant = () => setModal(true)
    const closeApplicant = () => setModal(false)
    return ( 
        <ModalContextApplicant.Provider value={{modalapplicant,openApplicant,closeApplicant}}>
            {children}
        </ModalContextApplicant.Provider>
    )
}