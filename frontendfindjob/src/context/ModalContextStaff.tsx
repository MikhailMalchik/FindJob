import React, { createContext, useState } from 'react'

interface IModalContextStaff {
    modalStaff: boolean
    openStaff :() => void
    closeStaff: () => void
}

export const ModalContextStaff = createContext<IModalContextStaff>({
    modalStaff: false,
    openStaff: () => {},
    closeStaff: () => {}
})

export const ModalStateStaff = ({children}: {children: React.ReactNode}) => { 
    const [modalStaff,setModal] = useState(false)
    const openStaff = () => setModal(true)
    const closeStaff = () => setModal(false)
    return ( 
        <ModalContextStaff.Provider value={{modalStaff,openStaff,closeStaff}}>
            {children}
        </ModalContextStaff.Provider>
    )
}