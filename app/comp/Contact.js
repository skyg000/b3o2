"use client"
import React from 'react'
import contact from '../pages/contact/contact.module.scss'


function PickOne() {

    const onPick = () => {

    }
    return (
        <div className={contact.home}>

            <div className={contact.cardtitle}>매칭을 축하드립니다!<br/>
                공개된 연락처는 24시간 이후 삭제돼요.<br/>
                좋은 소식 기대할게요 (｡•̀ᴗ-)✧ </div>
            <div className={contact.card} onClick={onPick}>
                <div className={contact.row}>
                    <img src="../imges/main.png" />
                    <img src="../imges/main.png" />
                    <img src="../imges/main.png" />
                </div>
                <div className={contact.warning}>상대의 연락처</div>
                <button className={contact.matchs}>카카오톡 아이디</button>
            </div>



        </div>
    )
}

export default PickOne