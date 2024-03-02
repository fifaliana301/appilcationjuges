"use client"
import React from "react";
import styles from './users.module.css'
import useStateToggleDark from '@/components/dark';
import withAuth from '@/components/withAuth';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '@/libs/reducers/slices';
import { withSwal } from 'react-sweetalert2';
import { addAdminsFetch, getAllComptes } from '@/libs/reducers';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/pagination/pagination';
import ModalCompetition from '@/components/modalCompetition/modalCompetition';
import { Label, TextInput } from 'flowbite-react';

function Users({ swal }: any) {
  const [openModal, setOpenModal] = React.useState(false);
  const searchParams = useSearchParams();
  const [dark, setDark] = useStateToggleDark();
  const dispatch = useDispatch();
  const allComptes = useSelector((state: any) => state.system?.allComptes)
  const systemStatus = useSelector((state: any) => state.system?.systemStatus)
  const router = useRouter();
  const pathname = usePathname();
  const [itemOffset, setItemOffset] = React.useState(0);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("ADMIN");

  const logout = () => {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        dispatch(resetState());
        router.push(`/`);
      }
    });

  }

  React.useEffect(() => {
    dispatch(getAllComptes())
  }, [])

  const handleSearch = useDebouncedCallback((term: any) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const [currentItems, setCurrentItems] = React.useState([])

  React.useEffect(() => {
    console.log({ itemOffset, cur: allComptes.slice(itemOffset, endOffset) })
    setCurrentItems(allComptes.slice(itemOffset, endOffset));
  }, [allComptes, itemOffset])


  const onSaveAdmin = () => {
    dispatch(addAdminsFetch({
      username,
      password,
      email,
      admins: {
        role
      }
    }))
  }


  const resetStateLocal = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  }


  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    if (systemStatus === 'success') {
      resetStateLocal()
      setOpenModal(false)
    }
  }, [systemStatus])


  return (
    <main className={styles.main}>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Users</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ height: 18 }}>
            <DarkModeSwitch
              style={{ marginBottom: '2rem' }}
              checked={!!dark}
              onChange={setDark}
              size={18}
            />
          </div>
          <i className="fa-solid fa-bell ml-1" style={{ fontSize: 18 }}></i>
          <i onClick={logout} className="fa-solid fa-sign-out ml-3" style={{ fontSize: 18 }}></i>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        <div className={styles.containerInputSearch}>
          <i className={`fas fa-search ${styles.iconInputSearch}`}></i>
          <input
            className={styles.inputSearch}
            placeholder="Search..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
        </div>
        <button
          className={styles.button}
          onClick={() => {
            setOpenModal(true)
          }}>
          New admin
        </button>
      </div>

      <ModalCompetition
        onClose={() => {
          resetStateLocal()
        }}
        accept="Save"
        onAccept={() => {
          onSaveAdmin()
        }}
        title="New admin"
        {...{ openModal, setOpenModal }}>
        {
          // <div>{competitionsRegisterError}</div>
        }
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" sizing="md" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" sizing="md" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" sizing="md" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            {role}
          </div>
        </div>
      </ModalCompetition>
      <div>
        <table>
          <thead>
            <tr>
              <th className="left">Photo</th>
              <th className="left">Name</th>
              <th className="left">Email</th>
              <th className="left">Role</th>
              <th>Status</th>
              {
                // <th>Options</th>
              }
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((allCompte: any, i: number) => {
              return <tr key={allCompte?.id}>
                <td>
                  <img className={styles.img_user} />
                </td>
                <td>
                  {allCompte.username || allCompte.login || allCompte.name}
                </td>
                <td>
                  {allCompte.email}
                </td>
                <td>
                  {allCompte.table_name == "Users" && allCompte.admins ? allCompte.admins?.role.toLowerCase() : allCompte.table_name}
                </td>
                <td>
                  <button className={i == 1 ? styles.button_status_inactive : styles.button_status_active}>{i == 1 ? "Inactive" : "Active"}</button>
                </td>
                {
                  // <td className={styles.td_center} style={{ width: 100 }}>
                  //   <i className={`fas fa-edit ${styles.icon}`}></i>
                  //   <i className={`fas fa-trash ${styles.icon}`}></i>
                  //   <i className={`fa-solid fa-calendar-days ${styles.icon}`}></i>
                  // </td>
                }
              </tr>
            })}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination {...{ itemOffset, setItemOffset, itemsPerPage, searchParams, router }} items={allComptes} />
        </div>
      </div>
    </main>
  )
}

export default withAuth(withSwal(Users));
