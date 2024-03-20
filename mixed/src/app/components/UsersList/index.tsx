import { auth } from "@/auth";
import axios from "axios";

const sleep = (ms: number) => new Promise((res) => setTimeout(() => res("ok"), ms))

const api = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
});

const getUsers = async () => {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" });
  }

  console.log("users-list", session.accessToken);

  const users = await api.get<UsersResponse>("/users")
    .then(({ data }) => data);

  await sleep(1500);

  return {
    users, token: session.accessToken,
  }
}

export const UsersList = async () => {
  const data = await getUsers() as unknown as UsersResponse;
  const users = data.users;
  const token = data.token.slice(-20);

  return (
    <div className="space-y-4">
      <p>Server Component</p>

      <p>{`Used token: ${token}`}</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  )
}

/** types */
type User = {
  id: number;
  name: string;
  email: string;
}

type UsersResponse = {
  users: User[]
  token: string;
}
