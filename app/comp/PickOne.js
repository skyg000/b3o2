"use client"
import pickone from '../style/pickone.module.scss'
import React, { useEffect, useState } from 'react'
import axios from "axios";


function PickOne() {
    const [pickList, setPickList] = useState([]);
    useEffect(() => {
        const id = window.sessionStorage.getItem("id")
        // myPick이 true : 내가 찜한 애
        // myPick이 false : 나를 찜한 애
        axios.get(`/api/matchlist?myPick=false&id=${id}`)
            .then((res) => {
                setPickList(res.data);
            });
    }, []);
    
    return (
        <div className={pickone.home}>

            <div className={pickone.cardtitle}>이런 이용자 님은 어떠세요? </div>
            <div className={pickone.card} >
                <img src="../imges/main.png" />
                <div>이름 (나이)</div>
                <div>서울대학교 애견미용학과 중퇴</div>
                <div>서울 작동구 거주</div>
                <div>웹퍼블리셔 재직 2년차</div>
                <div>모험을 즐기는 사업가 ESTP</div>
                <div>눈웃음이 매력적이라는 이야기를 들어요!</div>
                <button className={pickone.match}>매칭할래요!</button>
                <div className={pickone.warning}>매칭은 하루에 한 번만 가능하며, 취소가 불가합니다.</div>
            </div>



        </div>
    )
}

export default PickOne