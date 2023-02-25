import React, { createContext, useState } from 'react'

interface IModalContextResume {
    modalResume: boolean
    openResume :() => void
    closeResume: () => void
}

export const ModalContextResume = createContext<IModalContextResume>({
    modalResume: false,
    openResume: () => {},
    closeResume: () => {}
})

export const ModalStateResume = ({children}: {children: React.ReactNode}) => { 
    const [modalResume,setModal] = useState(false)
    const openResume = () => setModal(true)
    const closeResume = () => setModal(false)
    return ( 
        <ModalContextResume.Provider value={{modalResume,openResume,closeResume}}>
            {children}
        </ModalContextResume.Provider>
    )
}