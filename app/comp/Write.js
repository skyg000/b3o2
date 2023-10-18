"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react';
import write from '../style/write.module.scss'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Write() {
    const [imgView, setImgView] = useState();
    const [data, setData] = useState([]);
    const navigation = useRouter();
    const [activeIndex, setActiveIndex] = useState(null);
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const insertWrite = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const contents = formData.get('contents');
        const imgFile = formData.get('img'); // 이미지 파일을 가져옴
        const category = formData.get('category');
        if (imgFile instanceof Blob) { // 이미지 파일인지 확인
            const fr = new FileReader(); // FileReader 객체 생성
            fr.readAsDataURL(imgFile); // 이미지 파일 읽기
            fr.addEventListener('load', () => {
                const imgDataUrl = fr.result; // 이미지의 Data URL
                axios.post('/api/community', {
                    title,
                    contents,
                    img: imgDataUrl, // 이미지 데이터 URL을 전송
                    category,
                })
                    .then(() => {
                        navigation.push('./bord');
                    })
            });
        }
    }

    const getFile = async () => {
        const d = await axios.get('/api/community');
        const setD = d.data.map(obj => {
            obj.img = b64toBlob(obj.img);
            return obj;
        })
        setData(setD)
    }
    function b64toBlob(b64Data, contentType = '') {
        if (b64Data) {
            const image_data = atob(b64Data.split(',')[1]);
            const arraybuffer = new ArrayBuffer(image_data.length);
            const view = new Uint8Array(arraybuffer);

            for (let i = 0; i < image_data.length; i++) {
                view[i] = image_data.charCodeAt(i) & 0xff;
            }
            const blob = new Blob([arraybuffer], { type: contentType });
            return URL.createObjectURL(blob);
        }
        return null; // 빈 값에 대한 처리 추가
    }

    useEffect(() => {
        getFile();
    }, [])

    return (
        <div className={write.write_main}>
            <section className={write.img}>
                <img src="../../imges/icon_pencil.png" />
            </section>

            <div className={write.div1}>
                <div className={write.div2}>
                    <p>말머리를 선택해주세요!</p>
                </div>
                <form className={write.form} onSubmit={insertWrite} method='post' encType='multipart/form-data' >
                    <section className={write.select}>
                        <ul>
                            {['#화', '#수', '#목', '#금', '#토', '#자유'].map((item, index) => (
                                <li className={write.five_buttons} key={index}>
                                    <label className={`${write.select_item}  ${activeIndex === index ? write.active : ''}`}>
                                        <input 
                                            className={write.select_input}
                                            type="radio"
                                            name="category" // 라디오 버튼 그룹의 이름
                                            value={item}
                                            checked={activeIndex === index}
                                            onChange={() => handleButtonClick(index)}
                                        />
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <input className={write.title} type='text' name='title' placeholder='제목' />
                    <textarea placeholder='내용을 입력해주세요' name='contents'></textarea>
                    <input className={write.file} type='file' name='img' onChange={(e) => {
                        const file = e.target.files[0];
                        file && setImgView(URL.createObjectURL(file))
                    }} />
                    <img src={imgView} />
                    <button type='submit'>
                        <img src="../../imges/icon_submit_update.png" />
                    </button>
                </form>
            </div>
        </div>
    )

}
export default Write