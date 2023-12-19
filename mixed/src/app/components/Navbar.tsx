import Link from "next/link";

export const Navbar: React.FC = () => (
  <ul className="inline-flex gap-10">
    <li>
      <a href={process.env.NEXT_PUBLIC_MAIN_MF_URL}>
        Home (Public Only)
      </a>
    </li>

    <li>
      <a href={`${process.env.NEXT_PUBLIC_MAIN_MF_URL}/auth-only`}>
        Auth Only
      </a>
    </li>

    <li className="underline underline-offset-2">
      <Link href={`${process.env.NEXT_PUBLIC_MAIN_MF_URL}/mixed`}>
        Mixed (Public + Auth)
      </Link>
    </li>
  </ul>
)
