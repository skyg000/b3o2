"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import loginSt from "../style/login.module.scss";
import axios from "axios";
function Login() {
  const router = useRouter();
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [user,setUser] = useState();
  const handleInputId = (e) => {
      setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
      setInputPw(e.target.value)
  }

  const onClickLogin = (e,k) => {
    e.preventDefault();
      axios.get(`/api/member?id=${inputId}&pw=${inputPw}&type=login`)
      .then(res => {
        setUser(res.data);
          if(res.data[0].id  !== inputId && res.data[0].password !== inputPw){
              // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
              console.log('======================','실패')
              alert('입력하신 id 가 일치하지 않습니다.')
          } else if(res.data[0].id === inputId) {
              // id, pw 모두 일치 userId = userId1, msg = undefined
              console.log('======================','로그인 성공')
              window.sessionStorage.setItem('id', inputId)
              window.sessionStorage.setItem('gender', res.data[0].gender)
              // 작업 완료 되면 페이지 이동
              router.push("../../pages/checkfortune");
          }
      })
      .catch(error => {
        // 오류 처리
        alert('입력하신 id 와 비밀번호를 확인해주세요.')
      });
  }
  return (
    <>
      <div className={loginSt.home}>
        <img src="../imges/main.png" className={loginSt.m_img} />
        <div className={loginSt.login}>
          <form>
            <p>
              <input type="text" name="id"placeholder="아이디를 입력하세요" autoComplete="off" value={inputId} onChange={handleInputId}/>
            </p>
            <p>
              <input type="password"  name="pw" placeholder="비밀번호를 입력하세요" value={inputPw} onChange={handleInputPw}/>
            </p>
            <p>
              <button onClick={onClickLogin}className={loginSt.submit}>로그인</button>
            </p>
            {/* <button onClick={nav}> 회 원 가 입</button> */}
          </form>
          <Link href="../../pages/join" className={loginSt.aa}>회원가입 </Link>
        </div>
      </div>
    </>
  );
}

export default Login;

/*  function(error,result,fields){
                    if(error)throw error;
                    if(result.length > 0){
                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.name = id;
                        req.session.save(function () {
                        res.redirect(`/`);
                    })
                }else{
                    res.send(`alert("실패")`);
                }
            } */
