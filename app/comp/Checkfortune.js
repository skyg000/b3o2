"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";
import styles from "../pages/checkfortune/checkfortune.module.scss";
import { useRouter } from "next/navigation";

function Checkfortune() {
  const [memberData, setMemberData] = useState([]);
  const router = useRouter();

  const sajuCheck = (e) => {
    e.preventDefault();
    router.push("../pages/myfortune");
  };

  useEffect(() => {
    axios.get("/api/member").then((res) => {
      setMemberData(res.data);
    });
  }, []);
  if(!window){
    const sessionId = window.sessionStorage.getItem("id");
    loginUser = memberData.find((member) => member.id === sessionId);
  }


  return (
    <div className={styles.container}>
      {loginUser && (
        <>
          <div className={styles.row}>
            <p className={styles.nameInput}>{loginUser.name}</p>

            <p
              className={
                loginUser.gender === "남자" ? styles.active : styles.inactive
              }
            >
              남자
            </p>
            <p
              className={
                loginUser.gender === "여자" ? styles.active : styles.inactive
              }
            >
              여자
            </p>
          </div>

          <div className={styles.row}>
            {loginUser.time !== "모름" ? (
              <>
                <p className={styles.timeInput}>{loginUser.time}</p>
                <p className={styles.inactive}>모름</p>
              </>
            ) : (
              <>
                <p className={styles.timeInput}>태어난 날</p>
                <p className={styles.active}>모름</p>
              </>
            )}
          </div>

          <div className={styles.row}>
            <p
              className={
                loginUser.calendartype === "양력"
                  ? styles.active
                  : styles.inactive
              }
            >
              양력
            </p>
            <p
              className={
                loginUser.calendartype === "음력"
                  ? styles.active
                  : styles.inactive
              }
            >
              음력
            </p>
            <p
              className={
                loginUser.calendartype === "음력(윤달)"
                  ? styles.active
                  : styles.inactive
              }
            >
              음력(윤달)
            </p>
          </div>

          <div className={styles.row}>
            <button onClick={sajuCheck} className={styles.submitButton}>
              내 사주 확인하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkfortune;
