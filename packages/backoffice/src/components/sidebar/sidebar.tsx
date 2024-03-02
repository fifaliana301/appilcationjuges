"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.css'
import Image from 'next/image'
import { jwtDecode } from "jwt-decode";

export const navs: any[] = [
  {
    name: "Dashboard",
    path: "/home",
    icon: "gauge",
    types: ["super_admin", "admin"]
  },
  {
    name: "Users",
    path: "/users",
    icon: "users",
    types: ["super_admin"]
  },
  {
    name: "Competitions",
    path: "/competitions_admin",
    icon: "calendar",
    types: ["super_admin", "admin"]
  },
  {
    name: "Competitions",
    path: "/competitions",
    icon: "calendar",
    types: ["judges", "competitors"]
  },
  // {
  //   name: "Documents",
  //   path: "/documents",
  //   icon: "file",
  //   types: []
  // }
]

export const SideBar = () => {
  const pathname = usePathname();



  let decoded: any = "";
  try {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      decoded = jwtDecode(accessToken);
    }
  } catch (error) { }

  return (
    <nav className={styles.nav}>
      <h1>Bboy</h1>
      <ul>
        {
          navs?.map((nav: any, i: number) => {
            if (!nav.types?.length) {
              return <li key={i} className={styles.li}>
                <Link href={nav.path} legacyBehavior>
                  <a className={pathname == nav.path ? styles.active : styles.not_active}>
                    <i className={`fa-solid fa-${nav.icon}`}></i>
                    <span className={styles.nav_text}>{nav.name}</span>
                  </a>
                </Link>
              </li>
            }
            if (nav.types?.includes(decoded?.type)) {
              return (<li key={i} className={styles.li} suppressHydrationWarning>
                <Link href={nav.path} legacyBehavior>
                  <a className={pathname == nav.path ? styles.active : styles.not_active}>
                    <i className={`fa-solid fa-${nav.icon}`}></i>
                    <span className={styles.nav_text}>{nav.name}</span>
                  </a>
                </Link>
              </li>
              )
            }
            return <li key={i} />
          })
        }
        <hr className={styles.ligne} />
        <li className={styles.li}>
          <Link href="/settings" legacyBehavior>
            <a className={styles.active}>
              <i className={`fa-solid fa-cog`}></i>
              <span className={styles.nav_text}>Settings</span>
            </a>
          </Link>
        </li>
      </ul>
      <div>
        <hr className={styles.ligne} />

        <Link href="/account" legacyBehavior>
          <a className={styles.user_container}>
            <div className={styles.user_image}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
                width={38}
                height={38}
                alt="Picture of the author"
              />
            </div>
            <div>
              <div className={styles.user_name}>Max-R</div>
              <div className={styles.user_email}>example@gmail.com</div>
            </div>
          </a>
        </Link>
      </div>
    </nav >
  )
}
