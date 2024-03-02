"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { navs } from './sidebar/sidebar';
import { jwtDecode } from "jwt-decode";


export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const pathname = usePathname();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const last_path = localStorage.getItem("last_path");
      if (accessToken) {
        const decoded: any = jwtDecode(accessToken);
        // nav.types?.includes(decoded?.type)
        const one_nav = navs.find(nav => nav.path == pathname);
        if (one_nav) {
          if (!one_nav?.types.includes(decoded.type)) {
            console.log("redirect to: ", last_path || "/")
            redirect(last_path || "/")
          }
        }
      } else {
        redirect("/")
      }
      localStorage.setItem("last_path", pathname);
      setLoading(false);
    }, [])

    if (loading) {
      return <div>Loading</div>
    }
    return <Component {...props} />
  }
}
