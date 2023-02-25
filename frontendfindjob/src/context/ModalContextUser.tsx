import React, { createContext, useState } from 'react'

interface IModalContextUser {
    modalUser: boolean
    openUser: () => void
    closeUser: () => void
}

export const ModalContextUser = createContext<IModalContextUser>({
    modalUser: false,
    openUser: () => {},
    closeUser: () => {}
})

export const ModalStateUser = ({children}: {children: React.ReactNode}) => { 
    const [modalUser,setModal] = useState(false)
    const openUser = () => setModal(true)
    const closeUser = () => setModal(false)
    return ( 
        <ModalContextUser.Provider value={{modalUser,openUser,closeUser}}>
            {children}
        </ModalContextUser.Provider>
    )
}