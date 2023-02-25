import React from 'react'

interface ModalRegProps{
    children:React.ReactNode
    title: string
    onClose: () => void 
}

export function ModalReg({children, title, onClose}:ModalRegProps){
    return(
        <>
        <div className="fixed  top-0 right-0 left-0 bottom-0" onClick={onClose}>

        </div>
        <div className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2">
            <h1 className="text-2xl text-center mb-2"> 
               {title} 
            </h1>
            {children}
        </div>
        </>
    )
}