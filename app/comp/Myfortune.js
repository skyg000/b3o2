"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChatGPTAPI } from "chatgpt";
import styles from "../style/myfortune.module.scss";

const Myfortune = function () {
  const [userId, setUserId] = useState([]);
  const [answer, setAnswer] = useState();
  const [fortuneData, setFortuneData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/member");
      setUserId(response.data);
    }

    fetchData();
  }, []);
  const sessionId = window.sessionStorage.getItem("id");

  const loginUser = userId.find((member) => member.id === sessionId);
  console.log(loginUser);

  useEffect(() => {
    if (!loginUser) return;

    axios(`/api/gptapi?username=${JSON.stringify(loginUser)}`).then((res) => {
      setAnswer(res.data);
    });
  }, [loginUser]);


  useEffect(() => {
    if (!loginUser) return;

    async function fetchFortune() {
      try {
        const res = await axios.get(
          `/api/fortune?id=${loginUser.id}&type=fortuneCheck`
        );
        setFortuneData(res.data[0]);
      } catch (error) {
        console.error("Error fetching fortune:", error);
      }
    }

    fetchFortune();
  }, [loginUser]);

  useEffect(() => {
    if (fortuneData?.fortune === null && answer) {
      async function updateFortune() {
        if (!answer) return;
        try {
          const response = await axios.put("/api/fortune", {
            id: loginUser.id,
            fortune: answer.response1,
            myelement: answer.response2,
            yourelement: answer.response3,
          });
          console.log("Fortune updated:", response.data);
        } catch (error) {
          console.error("Error updating fortune:", error);
        }
      }
      updateFortune();
    }
  }, [fortuneData, answer]);

  console.log(fortuneData?.fortune);
  return (
    <>
      {fortuneData && fortuneData?.fortune !== null ? (
        <div style={{ whiteSpace: "pre-line" }}>
          <p>{fortuneData?.fortune}</p>
          <p>{fortuneData?.myelement}</p>
          <p>{fortuneData?.yourelement}</p>
          <p>데이터가 있당게요</p>
        </div>
      ) : (
        answer && (
          <div style={{ whiteSpace: "pre-line" }}>
            <p>{answer.response1}</p>
            <p>{answer.response2}</p>
            <p>{answer.response3}</p>
            <p>데이터가 없었당게요</p>
          </div>
        )
      )}
    </>
  );
};

export default Myfortune;