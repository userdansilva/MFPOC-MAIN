import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("refresh route colled");

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" }); // Method Not Allowed
    return;
  }

  // Quando o getServerSession é chamado e o token estiver desatualizado
  // então ele vai atualizar o token e disponibilizar na sessão para os MFs
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" }); // Unauthorized
    return;
  }

  console.log(session.accessToken);

  res.status(200).json({ accessToken: session.accessToken });
}
