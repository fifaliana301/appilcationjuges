'use client'
import { ThemeProvider } from 'next-themes'
import { SideBar } from './sidebar/sidebar'
import { redirect, usePathname } from 'next/navigation';
import styles from './providers.module.css';
import { Provider } from 'react-redux';

import { store } from '@/libs/reducers';
import { ToastContainer } from "react-toastify";
import React from 'react';

export function Providers({ children, ...props }: any) {
  const pathname = usePathname();
  const not_include: any = ["", "rulling"];
  // console.log(pathname.split("/")[1])

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Provider store={store}>
    <ThemeProvider>
      <div id="main">
        {
          !not_include.includes(pathname.split("/")[1]) && <SideBar {...props} />
        }
        <div className={!not_include.includes(pathname.split("/")[1]) ? styles.main_center : ''}>
          {children}
        </div>
      </div>
      <ToastContainer />
    </ThemeProvider>
  </Provider>
}
