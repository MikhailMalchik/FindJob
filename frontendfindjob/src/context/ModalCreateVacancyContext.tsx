import React, { createContext, useState } from 'react'

interface IModalContextCreate {
    modalCreate: boolean
    openCreate: () => void
    closeCreate: () => void
}

export const ModalContextCreate = createContext<IModalContextCreate>({
    modalCreate: false,
    openCreate: () => {},
    closeCreate: () => {}
})

export const ModalStateCreate = ({children}: {children: React.ReactNode}) => { 
    const [modalCreate,setModal] = useState(false)
    const openCreate = () => setModal(true)
    const closeCreate = () => setModal(false)
    return ( 
        <ModalContextCreate.Provider value={{modalCreate,openCreate,closeCreate}}>
            {children}
        </ModalContextCreate.Provider>
    )
}