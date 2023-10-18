import { queryExecute } from "../Db";

export async function POST(req) {
  const { category,title, contents, img } = await req.json();
  const data = await queryExecute(
    `insert into community (category,title,contents,img) values(?,?,?,?)`,
    [ category,title, contents, img]
  );
  return Response.json(data);
}



export async function PUT(req) {
  const {  num, title, contents, img } = await req.json();
  const data = await queryExecute(
    `UPDATE fortune 
         SET title = ?, contents = ?, img = ? 
         WHERE num = ?`,
    [title,contents,img, num]
  );
  return Response.json(data);
}


export async function GET() {
  const data = await queryExecute(`SELECT * from community`);
  return Response.json(data );
}
