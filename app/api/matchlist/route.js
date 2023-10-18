import { queryExecute } from "../Db";

export async function POST(req) {
  const { id, opntid, m_status, y_status, date } = await req.json();

  const data = await queryExecute(
    `insert into matchlist(id, opntid, m_status, y_status, date) values(?,?,?,?,?)`,[id, opntid, m_status, y_status, date]
  );

  return Response.json({done:'성공!!'});
}