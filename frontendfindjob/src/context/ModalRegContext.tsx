import React, { createContext, useState } from 'react'

interface IModalRegContext {
    modalReg: boolean
    openReg: () => void
    closeReg: () => void
}

export const ModalRegContext = createContext<IModalRegContext>({
    modalReg: false,
    openReg: () => {},
    closeReg: () => {}
})

export const ModalRegState = ({children}: {children: React.ReactNode}) => { 
    const [modalReg,setRegModal] = useState(false)
    const openReg = () => setRegModal(true)
    const closeReg = () => setRegModal(false)
    return ( 
        <ModalRegContext.Provider value={{modalReg,openReg,closeReg}}>
            {children}
        </ModalRegContext.Provider>
    )
}