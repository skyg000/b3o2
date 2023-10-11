"use client"
import React from 'react'
import Link from 'next/link'
import'../style/Login.scss'
function Login() {
    return (
        <>
        
        <div className='home'>
        <header>
            
        </header>
            <p> ◆ ◆ <span className='line'></span> ◆ ◆ <span className='line'></span> ◆ ◆ </p>
            <img src='../imges/main.png' className='m-log'/>
            <div className='login'>
                <form>
                <p><input type='text' name='id' placeholder='아이디를 입력하세요' autocomplete='off'/></p>
                <p><input type='password' name='pw' placeholder='비밀번호를 입력하세요'/></p>
                <p><input type='submit' value='로그인' className='submit'/></p>
                <button> 회 원 가 입</button>
                </form>
            </div>
            <p> ◆ ◆ <span className='line'></span> ◆ ◆ <span className='line'></span> ◆ ◆ </p>
            <footer className='footer'>
                <Link href='./pages/myfortune'>운세보기</Link>
                <Link href='./pages/matchlist'>리스트보기</Link>
                <Link href='./pages/picklist'>리스트보기</Link>
                <Link href='./pages/bord'>게시판</Link>
            </footer>
            </div>
        </>
    )
}

export default Login