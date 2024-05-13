'use client';
import React from 'react';
import styles from './page.module.css'
import {
  HiMail,
  HiKey,
  HiUser,
  HiCalendar
} from 'react-icons/hi';

import { Button, Radio, Label, TextInput, Textarea, Dropdown } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { changeAdminActiveFetch, createAdminActiveFetch } from '@/libs/reducers';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import { resetError } from '@/libs/reducers/slices';
import useStateToggleDark from '@/components/dark';


function Page() {
  const judgesStatus = useSelector((state: any) => state.judges?.judgesStatus)
  const adminActive = useSelector((state: any) => state.judges?.adminActive)

  const router = useRouter();

  const [typeProfile, setTypeProfile] = React.useState("dancers")

  const [email, setEmail] = React.useState("admin@unique.com");
  const [password, setPassword] = React.useState("password");
  const [cPassword, setCPassword] = React.useState("password");


  const [login, setLogin] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [specialty, setSpecialty] = React.useState("Breakdancing");
  const [history, setHistory] = React.useState("");

  const [date_berth, setDate_berth] = React.useState(new Date().toISOString().split('T')[0]);
  const [biography, setBiography] = React.useState("");

  const [isLogin, setIsLogin] = React.useState(true);

  const dispatch = useDispatch();

  const resetInput = () => {
    // setEmail("");
    // setPassword("");
    setCPassword("");
    setLogin("");
    setFirstname("");
    setLastname("");
    setSpecialty("Breakdancing");
    setHistory("");
    setDate_berth(new Date().toISOString().split('T')[0]);
    setBiography("");
  }

  React.useEffect(() => {
    resetInput();
  }, [isLogin])

  const onLogin = (e: any) => {
    e.preventDefault();
    dispatch(changeAdminActiveFetch({ email, password }));
  }

  const onSign = (e: any) => {
    e.preventDefault();
    let data = {};
    if (typeProfile === "dancers") {
      data = {
        name: login,
        email: email,
        password: password,
        dancers: {
          firstname: firstname,
          lastname: lastname,
          date_berth: new Date(date_berth).toISOString(),
          biography: biography
        }
      };
    } else {
      data = {
        email: email,
        password: password,
        login: login,
        firstname: firstname,
        lastname: lastname,
        specialty: specialty,
        history: history,
      };
    }
    dispatch(createAdminActiveFetch({ datas: data, type: typeProfile }));
  }


  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    // console.log({ judgesStatus })
    if (judgesStatus === 'success') {
      dispatch(resetError())
      if (isLogin && accessToken) {
        if (adminActive?.admins) {
          router.push(`/competitions_admin`)
        } else {
          router.push(`/competitions`)
        }
      } else {
        const userParse: any = user ? JSON.parse(user) : null;
        router.push(`/validation/${userParse?.id}`)
      }
    }
  }, [judgesStatus])


  return (
    <div className={styles.main}>
      {isLogin ?
        <form className={`login ${styles.form} flex max-w-screen-lg flex-col gap-4`} onSubmit={onLogin}>
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              icon={HiKey}
              id="password1"
              type="password"
              required
              sizing="lg"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="mt-3"
            isProcessing={judgesStatus === "pending"}
            disabled={judgesStatus === "pending"}
            size="xl"
          >
            Submit
          </Button>
          <p className={`${styles.signing} mt-3`} onClick={() => setIsLogin(false)}>
            Create account
          </p>
        </form>
        :
        <form className={`signing ${styles.form} flex max-w-screen-lg flex-col gap-4`} onSubmit={onSign}>
          <fieldset className="flex max-w-md flex-row gap-4">
            <legend className="mb-4">Choose type profile</legend>
            <div className="flex items-center gap-2">
              <Radio id="dancers" name="type-profile" value="dancers" defaultChecked onChange={(e) => { setTypeProfile(e.target.value) }} />
              <Label htmlFor="united-state">Dancers</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="judges" name="type-profile" value="judges" onChange={(e) => { setTypeProfile(e.target.value) }} />
              <Label htmlFor="germany">Judges</Label>
            </div>
          </fieldset>

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
                <Label htmlFor="password1" value="Password" />
              </div>
              <TextInput
                icon={HiKey}
                id="password1"
                type="password"
                required
                sizing="lg"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className="m-1"></div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirm-password1" value="Confirm password" />
              </div>
              <TextInput
                icon={HiKey}
                id="confirm-password1"
                type="password"
                required
                sizing="lg"
                value={cPassword}
                onChange={(e: any) => setCPassword(e.target.value)}
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
            Create account
          </Button>
          <p className={`${styles.signing} mt-3`} onClick={() => setIsLogin(true)}>
            Alredy have account
          </p>
        </form>
      }
    </div>
  );
}

export default Page;
