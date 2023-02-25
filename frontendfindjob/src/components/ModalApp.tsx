import React from 'react'

interface ModalAppProps{
    children:React.ReactNode
    title: string
    onCloseApp: () => void 
}

export function ModalApp({children, title, onCloseApp}:ModalAppProps){
    return(
        <>
        <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0 z-30" onClick={onCloseApp}>

        </div>
        <div className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2 z-40">
            <h1 className="text-2xl text-center mb-2 text-black"> 
               {title} 
            </h1>
            {children}
        </div>
        </>
    )
}