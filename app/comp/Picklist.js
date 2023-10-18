"use client"
import React, { useEffect, useState } from 'react'
import PicklistStyle from '../pages/picklist/picklist.module.scss'
import PickOne from './PickOne'
import Contact from './Contact'
import axios from "axios";

function Picklist() {
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
        <>
            <div className={PicklistStyle.home}>

                <div className={PicklistStyle.cardtitle}>김예솔 공주님을 기다리는 사람들입니다. </div>
                <div className={PicklistStyle.cardalign}>
                    {pickList.map((pick, idx) => (
                        // <Link to="/picklist">
                            <div className={PicklistStyle.card}>
                                <img src="../imges/main.png" />
                                <div>{pick.id}</div>
                                <div>{pick.date}</div>
                            </div>
                        // </Link>
                    ))}
                    
                </div>
                <div className={PicklistStyle.loading}>
                    <img src='../imges/loading.gif'/>
                </div>
            </div>
            <PickOne/>
            <Contact/>
        </>
    )
}

export default Picklist