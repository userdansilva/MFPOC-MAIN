import { getServerSession } from "next-auth";
import { Tabs } from "../components/Tabs";
import { SignOutButton } from "../components/SignOutButton";

const getData = async () => {
  const session = await getServerSession();

  return {
    session
  }
}

const App = async () => {
  const session = await getData();

  console.log(session);

  return (
    <div className="space-y-10">
      <Tabs selected="PRIVATE" />

      <p>
        {`Bem vindo a tela autenticada ${session.session?.user?.name}`}
      </p>

      <ul>
        <li>
          {`Nome: ${session.session?.user?.name}`}
        </li>

        <li>
          {`E-mail: ${session.session?.user?.email}`}
        </li>
      </ul>

      <SignOutButton />
    </div>
  )
}

export default App;
