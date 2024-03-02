"use client"
import React from 'react';
import Image from 'next/image'
import styles from './account.module.css'
import useStateToggleDark from '@/components/dark';
import { Button, Radio, Label, TextInput, Textarea, Dropdown } from 'flowbite-react';
import {
  HiMail,
  HiKey,
  HiUser,
  HiCalendar
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { resetState } from '@/libs/reducers/slices';
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode';
import { initJudgesActiveFetch, patchtAdminActiveFetch } from '@/libs/reducers';
import { withSwal } from 'react-sweetalert2';
import withAuth from '@/components/withAuth';

const Account = withSwal(function({ swal }: any) {
  const router = useRouter()
  const dispatch = useDispatch();
  const judgesStatus = useSelector((state: any) => state.judges?.judgesStatus)
  const adminActive = useSelector((state: any) => state.judges?.adminActive)
  const [typeProfile, setTypeProfile] = React.useState("dancers")
  const [dark, setDark] = useStateToggleDark();

  const [id, setId] = React.useState();
  const [email, setEmail] = React.useState("admin@unique.com");
  const [password, setPassword] = React.useState("");
  const [nPassword, setNPassword] = React.useState("");


  const [login, setLogin] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [specialty, setSpecialty] = React.useState("Breakdancing");
  const [history, setHistory] = React.useState("");

  const [date_berth, setDate_berth] = React.useState(new Date().toISOString().split('T')[0]);
  const [biography, setBiography] = React.useState("");
  const [file, setFile] = React.useState<any>();


  const onUpdate = (e: any) => {
    e.preventDefault();

    if (adminActive) {
      let data = {};
      if (typeProfile === "dancers") {
        data = {
          name: login,
          email: email,
          password: adminActive?.password,
          dancers: {
            id: adminActive?.dancers.id,
            firstname: firstname,
            lastname: lastname,
            date_berth: new Date(date_berth).toISOString(),
            biography: biography
          }
        };
      } else {
        data = {
          email: email,
          password: adminActive.password,
          login: login,
          firstname: firstname,
          lastname: lastname,
          specialty: specialty,
          history: history,
        };
      }
      dispatch(patchtAdminActiveFetch({ id: adminActive.id, datas: data, type: typeProfile, image: createFormData() }));
    }
  }

  React.useEffect(() => {
    dispatch(initJudgesActiveFetch())
    // console.log("setTypeProfile('dancers')");
    // const user = localStorage.getItem("accessToken");
    // if (user) {
    //   const userParse: any = jwtDecode(user);
    //   if (userParse.type == "judges") {
    //     setTypeProfile("judges");
    //   } else {
    //     setTypeProfile("dancers");
    //   }
    // }
  }, [])

  React.useEffect(() => {
    if (adminActive) {
      setEmail(adminActive.email);
      if (adminActive.dancers) {
        setTypeProfile("dancers");
        setLogin(adminActive.name);
        setFirstname(adminActive.dancers.firstname);
        setLastname(adminActive.dancers.lastname);
        setDate_berth(new Date(adminActive.dancers.date_berth).toISOString().split('T')[0]);
        setBiography(adminActive.dancers.biography);
      } else if (adminActive.admins) {
        setTypeProfile("admins");
        setLogin(adminActive.username);
      } else {
        setTypeProfile("judges");
        setLogin(adminActive.login);
        setFirstname(adminActive.firstname);
        setLastname(adminActive.lastname);
        if (adminActive.specialty) {
          setSpecialty(adminActive.specialty);
        }
        setHistory(adminActive.history);
      }
    }
  }, [adminActive])


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

  const createFormData = () => {
    if (!file) {
      return null;
    }

    let typeUser;
    switch (typeProfile) {
      case "dancers":
        typeUser = "competitors";
        break;
      case "teams":
        typeUser = "competitors";
        break;
      case "admins":
        typeUser = "users";
        break;
      default:
        typeUser = typeProfile
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append(typeUser, adminActive.id)
    return formData
  }

  const [previewUrl, setPreviewUrl] = React.useState();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Preview the image before uploading
    const reader: any = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };


  return (
    <div className={styles.main}>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Account</h1>
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
      <div className="flex mt-5 wrap">
        <div className={styles.container_img_user}>
          <img
            className={styles.img_user}
            src={
              previewUrl || (
                (adminActive?.photos.length && adminActive?.photos[adminActive?.photos.length - 1]?.name) ?
                  `http://localhost:4000/${adminActive?.photos[adminActive?.photos.length - 1]?.name}` :
                  "https://bgirlbboy.com/wp-content/uploads/2023/07/Bart-600x600.webp"
              )
            }
          />
          <input type="file" id="actual-btn" hidden onChange={handleFileChange} />
          <label htmlFor="actual-btn" className={styles.choose_file}>Choose File</label>
        </div>
        <div>
          <form className={`signing ${styles.form} flex max-w-screen-lg flex-col gap-4`} onSubmit={onUpdate}>
            {typeProfile === "judges" &&
              <div className="mt-2">
                <div className="mb-2 block">
                  <Label value="Specialty" />
                </div>
                <Dropdown label={specialty} size="lg">
                  <Dropdown.Item onClick={() => setSpecialty('Breakdancing')}>Breakdancing</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecialty('Locking and Popping')}>Locking and Popping</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecialty('Krump')}>Krump</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecialty('Stepping')}>Stepping</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecialty('Up Rock')}>Up Rock</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSpecialty('Funk')}>Funk</Dropdown.Item>
                </Dropdown>
              </div>
            }

            {typeProfile !== "admins" &&
              <div className="d-flex wrap">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastname1" value="Lastname" />
                  </div>
                  <TextInput
                    icon={HiUser}
                    id="lastname1"
                    type="text"
                    placeholder="example"
                    required
                    sizing="lg"
                    value={lastname}
                    onChange={(e: any) => setLastname(e.target.value)}
                  />
                </div>
                <div className="m-1"></div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="firstname1" value="Firstname" />
                  </div>
                  <TextInput
                    icon={HiUser}
                    id="firstname1"
                    type="text"
                    placeholder="example"
                    required
                    sizing="lg"
                    value={firstname}
                    onChange={(e: any) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
            }
            <div className="d-flex wrap">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="login1" value="Login" />
                </div>
                <TextInput
                  icon={HiUser}
                  id="login1"
                  type="text"
                  placeholder="example"
                  required
                  sizing="lg"
                  value={login}
                  onChange={(e: any) => setLogin(e.target.value)}
                />
              </div>

              <div className="m-1"></div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                  icon={HiMail}
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                  sizing="lg"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>

            </div>

            <div className="d-flex wrap">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Last password" />
                </div>
                <TextInput
                  icon={HiKey}
                  id="password1"
                  type="password"
                  sizing="lg"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <div className="m-1"></div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirm-password1" value="New password" />
                </div>
                <TextInput
                  icon={HiKey}
                  id="confirm-password1"
                  type="password"
                  sizing="lg"
                  value={nPassword}
                  onChange={(e: any) => setNPassword(e.target.value)}
                />
              </div>
            </div>


            <div className="d-flex wrap">


              {typeProfile === 'dancers' &&
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="biography1" value="Biography" />
                  </div>

                  <Textarea
                    rows={4}
                    id="biography1"
                    placeholder="example"
                    value={biography}
                    onChange={(e: any) => setBiography(e.target.value)}
                  />
                </div>
              }
              {typeProfile === 'judges' &&
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="history1" value="History" />
                  </div>

                  <Textarea
                    rows={4}
                    id="history1"
                    placeholder="example"
                    value={history}
                    onChange={(e: any) => setHistory(e.target.value)}
                  />
                </div>
              }
              <div className="m-1"></div>
              {typeProfile === 'dancers' &&
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="date_berth1" value="Date berth" />
                  </div>
                  <TextInput
                    icon={HiCalendar}
                    id="date_berth1"
                    type="date"
                    required
                    sizing="lg"
                    value={date_berth}
                    onChange={(e: any) => setDate_berth(e.target.value)}
                  />
                </div>
              }

            </div>

            <Button
              type="submit"
              className="mt-3"
              isProcessing={judgesStatus === "pending"}
              disabled={judgesStatus === "pending"}
              size="xl"
            >
              Modify account
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
})

export default withAuth(Account);
