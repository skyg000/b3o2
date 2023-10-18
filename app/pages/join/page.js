"use client"
import React, { useEffect } from 'react'
import Join from '../../comp/Join'
import pageSt from '../../page.module.css'
function page() {
  useEffect(()=>{
    const footerSt = document.getElementsByClassName('link')
    footerSt[0].classList.add(pageSt.hidden)
})
  return (
    <Join/>
  )
}

export default page