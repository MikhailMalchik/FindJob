import React, { createContext, useState } from 'react'

interface IModalContextEmployer {
    modalEmployer: boolean
    openEmployer :() => void
    closeEmployer: () => void
}

export const ModalContextEmployer = createContext<IModalContextEmployer>({
    modalEmployer: false,
    openEmployer: () => {},
    closeEmployer: () => {}
})

export const ModalStateEmployer = ({children}: {children: React.ReactNode}) => { 
    const [modalEmployer,setModal] = useState(false)
    const openEmployer = () => setModal(true)
    const closeEmployer = () => setModal(false)
    return ( 
        <ModalContextEmployer.Provider value={{modalEmployer,openEmployer,closeEmployer}}>
            {children}
        </ModalContextEmployer.Provider>
    )
}