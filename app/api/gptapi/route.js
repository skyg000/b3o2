import { BardAI } from "bard";

export async function GET(req, res) {
  const bard = new BardAI();
  try {
    const { username } = Object.fromEntries(req.nextUrl.searchParams);
    const { gender, date, calendartype, time } = JSON.parse(username);

    const firstQuestion = `${calendartype} ${date} ${time} 출생 ${gender}의 만세력을 바탕으로 운세를 알려줘.`;
    const firstResponse = await bard.question({ ask: firstQuestion });

    const secondQuestion = `${calendartype} ${date} ${time} 출생 ${gender}인   나의 오행기운을 오행기운: 금(金):n개 목(木):n개  수(水):n개  화(火):n개  토(土):n개 이런식으로 아무 대답도 설명도 하지말고 갯수만 적어줘. 0개인 경우도 적어줘.형식에 변화는 주지말고 저 오행단어는 그대로 써줘 `;
    const secondResponse = await bard.question({ ask: secondQuestion });

    const thirdQuestion = `${calendartype} ${date} ${time} 출생 ${gender}인   나의 인연 오행기운을 오행기운: 금(金):n개 목(木):n개  수(水):n개  화(火):n개  토(土):n개 이런식으로 아무 대답도 설명도 하지말고 갯수만 적어줘. 0개인 경우도 적어줘.형식에 변화는 주지말고 저 오행단어는 그대로 써줘 `;
    const thirdResponse = await bard.question({ ask: thirdQuestion });
    const cleanFirstResponse = firstResponse.content.replace(/\*/g, "");
    const cleanSecondResponse = secondResponse.content.replace(/\*/g, "");
    const cleanThirdResponse = thirdResponse.content.replace(/\*/g, "");

    function formatFiveElements(response) {
      const fiveElementsPattern =
        /오행기운:\s*금\(金\):\s*(\d+)개\s*목\(木\):\s*(\d+)개\s*수\(水\):\s*(\d+)개\s*화\(火\):\s*(\d+)개\s*토\(土\):\s*(\d+)개/;
      const match = response.match(fiveElementsPattern);
      if (match) {
        return `오행기운:\n금(金): ${match[1]}개\n목(木): ${match[2]}개\n수(水): ${match[3]}개\n화(火): ${match[4]}개\n토(土): ${match[5]}개`;
      }
      return "No match found";
    }

    let formattedResponse2 = formatFiveElements(cleanSecondResponse);
    let formattedResponse3 = formatFiveElements(cleanThirdResponse);
    console.log(cleanFirstResponse);
    return Response.json({
      response1: cleanFirstResponse,
      response2: formattedResponse2,
      response3: formattedResponse3,
    });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
