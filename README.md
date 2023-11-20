## 별별연인(사주데이터를 통한 소개팅서비스) 
### [제작 사이트 바로가기] => (https://b3o2.vercel.app/) {:target="_blank"} https://b3o2.vercel.app/ </a>
💛 별별연인 - B3O2
Next.js를 이용한 사주기반 소개팅 어플

🖥 프로젝트 소개
점신을 참고하여 만든 소개팅 어플리케이션 입니다.

📆 개발기간
2023.10.09 - 2023.10.31

😎 멤버구성 <br>
홍석현 : 로그인, Database Script제작 <br>
김예솔 : 공지사항 & 자유게시판, 글쓰기 기능 구현 <br>
김주선 : 사용자의 오행을 기반으로 한 Matching list page 구현 <br>
민유빈 : 매칭된 상대방의 프로필 Detail Page & 연락처 공유 기능 구현 <br>
정훈영 : 사용자 운세 & 오행 확인 기능 구현

⚙ 개발환경 <br>
Framework : Next.js <br>
Database : MySQL

🚨 트러블슈팅 <br>
[API요청] <br>
이슈 : Bard Api로 사주 정보 데이터를 불러왔으나 너무 많은 요청을 하는 경우,
Bard측에서 Api요청을 막는 이슈 발생 <br>
해결 : Chat Gpt Api로 대체 <br>

[Server] <br>
이슈 : 클라이언트 사이드에서 요청시 수행이 안됨 <br>
해결 : Api폴더로 따로 분리해서 서버 사이드로 요청 수행 <br>

이슈 : 500error <br>
해결 : My sql에서 테이블 분리하고,명칭 변경
