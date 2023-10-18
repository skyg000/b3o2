"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import match from '../pages/matchlist/matchlisr.module.scss'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';

function Matchlist() {
	const [Mdata, setMData] = useState([]);
	const [Fdata, setFData] = useState([]);

	const getMData = () => {
		axios.get('/api/member')
			.then(res => {
				setMData(res.data);
			})
	}

	const getFData = () => {
		axios.get('/api/fortune')
			.then(res => {
				setFData(res.data)
			})
	}

	useEffect(() => {
		getMData();
		getFData();
	}, [])

	const currentUserID = window.sessionStorage.getItem('id');
	const currentUserGender = window.sessionStorage.getItem('gender');
	const filteredMdata = Mdata.filter((mobj) => mobj.id !== currentUserID);


	const genderFilteredMdata = filteredMdata.filter((mobj) => {
    if (currentUserGender === '남자') {
        // 현재 사용자가 남자인 경우 여자 회원만 필터링
        return mobj.gender === '여자';
    } else if (currentUserGender === '여자') {
        // 현재 사용자가 여자인 경우 남자 회원만 필터링
        return mobj.gender === '남자';
    } else {
        // 사용자 성별 정보가 없거나 다른 경우, 모든 회원 표시
        return true;
    }
	});

	
	const birth = (dateStr) => {
		const year = dateStr.slice(0, 4);
		const month = dateStr.slice(4, 6);
		const day = dateStr.slice(6, 8);
		return `${year}.${month}.${day}`;
	}

	const post = (e, mobj)=>{
		e.preventDefault();
		const now = new Date(); 
		const month = now.getMonth() + 1; //월을 가져오며 0부터 시작하므로 1을 더합니다.
		const day = now.getDate(); // 현재 일자를 가져옵니다.
		const hours = now.getHours(); // 현재 시간을 가져옵니다.
		const minutes = now.getMinutes(); // 현재 분을 가져옵니다.

		const fData = {
			id:currentUserID, 
			opntid:mobj.id, 
			m_status: 'no',
			y_status: 'no',
			date: `${month}.${day}.${hours}.${minutes}`
		}
		axios.post('/api/matchlist', fData)
	}


	
	return (
		<>
			<div className={match.matchlist}>
				<h2>
					이용자 님과 잘 맞는 회원님을 추천할게요! <br />
					대화 신청은 하루 3명만 가능합니다
				</h2>
				<Swiper
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={'auto'}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 200,
						modifier: 1.5,
						slideShadows: true,
					}}
					modules={[EffectCoverflow]}
					className={match.swiper}
				>
					{
							genderFilteredMdata.map((mobj) => {
							const matchingFdata = Fdata.find((fobj) => fobj.id === mobj.id);
							return (
								<SwiperSlide key={mobj.id} className={match.swiper_slide}>
									<div className={match.slide_content}>
										<figure>
											{mobj.gender === '남자' ? (
												<img src='../../../imges/gender_male.png' alt="남자" />
											) : (
												<img src='../../../imges/gender_female.png' alt="여자" />
											)}
										</figure>
										<h2>{mobj.name}</h2>
										<p>{mobj.gender} <span>( {birth(mobj.date || "N/A")} )</span></p>
										<p>{mobj.adderss} 거주</p>
										<p>{mobj.job}</p>
										<p>{mobj.self}</p>

										{matchingFdata && <p className={match.match_fortune}>{matchingFdata.myelement}</p>}
									</div>
									<div className={match.match_button}>
										<button>다음에 만날래요</button>
										<button onClick={(e)=>{post(e,mobj)}}>대화하고 싶어요</button>
									</div>
								</SwiperSlide>
							);
						})
					}
				</Swiper>
			</div>
		</>
	);
}

export default Matchlist