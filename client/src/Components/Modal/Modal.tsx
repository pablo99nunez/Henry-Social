import React, { useRef } from 'react'
import styles from './Modal.module.scss'

export default function Modal({children,isOpen=true,setIsOpen}:any) {
    const modal=useRef<HTMLDivElement>(null)
  return (
    isOpen && <div className={styles.Modal_wrap} onClick={(e)=>{
    console.log(e.target, modal.current)
        if(e.target==modal.current){
            setIsOpen(false)
            }
        }}
        ref={modal}
        >

        
        <div className={styles.Modal} >

            <h1>Modal</h1>
            
            {children}
        </div>
    </div>
  )
}
