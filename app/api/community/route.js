import { queryExecute } from "../Db";

export async function POST(req) {
  const { title, contents, img } = await req.json();

  const data = await queryExecute(
    `insert into community (title,contents,img) values(?,?,?)`,
    [title, contents, img]
  );

  return Response.json({ community: data });
}

export async function GET() {
  const data = await queryExecute(`SELECT * from community`);
  return Response.json({ community: data });
}
