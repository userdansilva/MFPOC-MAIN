import { Tabs } from "../components/Tabs";
import { SignOutButton } from "../components/SignOutButton";
import { UsersList } from "../components/UsersList";
import { Suspense } from "react";
import { Loading } from "../components/UsersList/loading";

const App = () => (
  <div className="space-y-10">
    <Tabs selected="PRIVATE" />

    <p>Bem vindo a tela autenticada</p>

    {/** console.log aqui */}
    <Suspense fallback={<Loading />}>
      <UsersList />
    </Suspense>

    <SignOutButton />
  </div>
)

export default App;
