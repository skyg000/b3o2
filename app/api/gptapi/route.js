import { ChatGPTAPI } from "chatgpt";

export async function GET(req) {
  const { username } = Object.fromEntries(req.nextUrl.searchParams);
  const { gender, date, calendartype, time } = JSON.parse(username);

  const api = new ChatGPTAPI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    completionParams: {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      top_p: 0.8,
    },
  });

  let response1 = await api.sendMessage(
    `${calendartype} ${date} ${time} 출생 ${gender}의 만세력을 바탕한 천간, 지지를 이용해서 초년운,중년운,말년운,형제운,자식운,부부운,직업운을 조금 자세히 알려줘. 정확하지 않아도 되니까 그냥 알려줘.필요에 따라 양력을 한국식 음력으로 바꿔도 되는데 참고로 양력 1992년 5월 29일의 음력은 4월 27일이야.`
  );

  // 첫 번째 응답을 기반으로 두 번째 질문을 합니다.
  let response2 = await api.sendMessage(
    "저 사주를 바탕으로 나의 오행 갯수를 화(火): 0개 수(水): 0개 목(木): 0개  금(金): 0개 토(土): 0개 이런식으로 띄어쓰기와 설명없이 그냥 갯수를 말해줘.",
    {
      parentMessageId: response1.id,
    }
  );
  let response3 = await api.sendMessage(
    "저 사주를 바탕으로 나와 어울리는 상대의 오행 갯수를 화(火): 0개 수(水): 0개 목(木): 0개  금(金): 0개 토(土): 0개 이런식으로 띄어쓰기와 설명없이 그냥 갯수를 말해줘.",
    {
      parentMessageId: response1.id,
    }
  );

  return Response.json({
    response1: response1.text,
    response2: response2.text,
    response3: response3.text,
  });
}
