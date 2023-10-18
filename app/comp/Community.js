"use client"
import React, { useEffect, useState } from 'react';
import community from '../style/community.module.scss';

import axios from 'axios';



function Community() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]); // 여러 카테고리를 저장하는 배열
  const [pageSize, setPageSize] = useState(3); // 페이지당 표시할 게시물 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [isLiked, setIsLiked] = useState(false); // 이미지가 좋아요 상태인지 여부를 나타내는 상태

  
  const toggleLike = (e) => {
    setIsLiked(!isLiked);
    setCount(count + 1);
  };
  const getData = () => {
    axios.get('/api/community')
      .then(res => {
        setData(res.data);
      })
  }

  const handleButtonClick = (category) => {
    // 선택한 카테고리가 이미 activeCategories 배열에 있는지 확인
    const isCategoryActive = activeCategories.includes(category);
    if (isCategoryActive) {
      // 이미 선택된 카테고리인 경우, 배열에서 제거
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      // 선택되지 않은 카테고리인 경우, 배열에 추가
      setActiveCategories([...activeCategories, category]);
    }
  };


  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(data.length / pageSize);

  // 페이지 번호 목록 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <>
      <section className={community.community}>
        <section className={community.select}>
          <ul>
            {['#화', '#수', '#목', '#금', '#토', '#자유'].map((item) => (
              <li key={item}>
                <button
                  className={`${community.select_item} ${activeCategories.includes(item) ? community.active : ''}`}
                  onClick={() => handleButtonClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <ul className={community.ul2}>
          {currentData.map((obj) => {
            // 만약 선택한 카테고리가 없거나, 현재 아이템의 카테고리가 선택한 카테고리 중 하나와 일치하면 렌더링
            if (!activeCategories.length || activeCategories.includes(obj.category)) {
              return (
                <li key={obj.num}>
                  <p className={community.p_flex}>
                    <span><b>{obj.category}</b></span>
                    <p>{obj.title}</p>
                  </p>
                  <p>{obj.contents}</p>
                  <img src={obj.img}  style={{ width: '100px', height: '100px' }} />
                  <div className={community.div_flex}>
                  <p>2023.10.11</p>
                  <span>
                    <button onClick={toggleLike} className={isLiked ? community.active : ''} disabled={count > 0}>
                    <img className={community.displayyes} src = '../../../imges/icon_heart_black.png '/>
                    <img className={community.displaynone} src = '../../../imges/icon_heart.png '/>
                    </button>{count}+{obj.like}</span>
                  </div>
                </li>
              );
            }
            return null; // 일치하지 않으면 아이템을 숨김
          })}
        </ul>

        <div className={community.pagination}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => setCurrentPage(number)}>{number}</button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * pageSize >= data.length}>다음</button>
        </div>
      </section>
    </>
  )
}

export default Community