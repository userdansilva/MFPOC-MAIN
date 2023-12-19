import clsx from "clsx"
import Link from "next/link"

export const Tabs: React.FC<TabsProps> = ({ selected }) => (
  <ul className="inline-flex gap-10">
    <li className={clsx((selected === "PUBLIC") && "underline underline-offset-2")}>
      <Link href="/mar-aberto">
        Pública
      </Link>
    </li>

    <li className={clsx((selected === "PRIVATE") && "underline underline-offset-2")}>
      <Link href="/app">
        Autenticada
      </Link>
    </li>
  </ul>
)

/** types */
type TabsProps = {
  selected?: "PUBLIC" | "PRIVATE";
}
