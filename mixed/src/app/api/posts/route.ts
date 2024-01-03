import { auth } from "@/auth";

export const GET = async () => {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" });
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return Response.json(data);
}
