import React from 'react'

interface ModalUserProps{
    children:React.ReactNode
    onClose: () => void 
}

export function ModalUser({children, onClose}:ModalUserProps){
    return(
        <>
        <div className="fixed bg-black/10 top-0 right-0 left-0 bottom-0 z-30" onClick={onClose}>

        </div>
        <div className=" p-5 rounded bg-indigo-300 absolute h-25 w-25 z-40">
            
            {children}
        </div>
        </>
    )
}