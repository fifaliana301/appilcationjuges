"use client"
import React from 'react';
import styles from './page.module.css'
import useStateToggleDark from '@/components/dark';
import ModalCompetition from '@/components/modalCompetition/modalCompetition';
import Image from 'next/image'
import config from '@/config';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useRouter } from 'next/navigation'

import userProfile from './images/user.png'

import { useDispatch, useSelector } from 'react-redux';
import {
  addCompetitionsFetch,
  deleteCompetitionsFetch,
  initCompetitionsFetch,
  initJudgesFetch,
  putCompetitionsFetch,
} from '@/libs/reducers';
import { formatDate } from '@/libs/utils/utils';
import { Label, TextInput, Checkbox } from 'flowbite-react';
import { withSwal } from 'react-sweetalert2';
import { resetState } from '@/libs/reducers/slices';

// import Creatable from 'react-select/creatable';
import Select from 'react-select';
import withAuth from '@/components/withAuth';

const Competitions = withSwal(function({ swal }: any) {
  const dispatch = useDispatch();
  const adminActive = useSelector((state: any) => state.judges?.adminActive)
  const competitionsDatas = useSelector((state: any) => state.competitions?.datas)
  const judgesDatas = useSelector((state: any) => state.judges?.datas)

  const competitionsStatus = useSelector((state: any) => state.competitions?.competitionsStatus)
  const competitionsRegisterError = useSelector((state: any) => state.competitions?.registerError)

  const router = useRouter()
  const [dark, setDark] = useStateToggleDark();
  const [openModal, setOpenModal] = React.useState(false);

  const [name, setName] = React.useState("competion" + Date.now());
  const [dates, setDates] = React.useState(new Date().toJSON().slice(0, 10));
  const [rules, setRules] = React.useState("rules" + Date.now());
  const [location, setLocation] = React.useState("location" + Date.now());
  const [validation, setValidation] = React.useState(false);
  const [selectedJudgesOption, setSelectedJudgesOption] = React.useState<any>(null);
  const [idEdit, setIdEdit] = React.useState(null);

  const [judgesOptions, setJudgesOptions] = React.useState([]);

  const clickCalendar = (id: any) => {
    router.push(`/calandarsBattle/${id}`)
  }

  React.useEffect(() => {
    console.log("initCompetitionsFetch");
    dispatch(initCompetitionsFetch())
  }, [])

  React.useEffect(() => {
    console.log("initJudgesFetch");
    dispatch(initJudgesFetch())
  }, [])


  const firstUpdateJudges = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateJudges.current) {
      firstUpdateJudges.current = false;
      return;
    }
    const newJudgesDatas = judgesDatas?.map((judge: any) => {
      return ({ value: judge.id, label: judge.login });
    })

    if (newJudgesDatas?.length) {
      setJudgesOptions(newJudgesDatas)
    }
  }, [judgesDatas])

  const getCompetitors = (data: any) => {
    const competitors: any[] = [];
    const competitorsId: any[] = [];

    data?.calendarsBattles?.find((calendarBattle: any) => {
      calendarBattle?.competitors?.find((competitor: any) => {
        if (!competitorsId.includes(competitor.id)) {
          competitorsId.push(competitor.id)
          competitors.push(competitor);
          if (competitors.length >= 5) {
            return true;
          }
        }
      })
      if (competitors?.length >= 5) {
        return true;
      }
    })
    return competitors
  }

  const resetStateLocal = () => {
    setIdEdit(null);
    setName("");
    setDates(new Date().toJSON().slice(0, 10));
    setRules("");
    setLocation("");
    setValidation(false);
    setSelectedJudgesOption([]);
  }

  const onSaveCompetion = () => {
    console.log("onSaveCompetion()");
    let adminId = adminActive?.admins?.id || localStorage.getItem('user');
    if (adminId) {
      // console.log("onSaveCompetion: ", {
      //   name,
      //   dates: new Date(dates).toISOString(),
      //   rules,
      //   location,
      //   admins: { id: adminActive?.admins?.id },
      //   validation,
      //   judges: selectedJudgesOption?.map((e:any) => e.value)
      // })
      if (idEdit) {
        dispatch(putCompetitionsFetch({
          id: idEdit,
          name,
          dates: new Date(dates).toISOString(),
          rules,
          location,
          admins: { id: adminId },
          validation,
          judges: selectedJudgesOption?.map((e: any) => e.value)
        }))
      } else {
        dispatch(addCompetitionsFetch({
          name,
          dates: new Date(dates).toISOString(),
          rules,
          location,
          admins: { id: adminId },
          validation,
          judges: selectedJudgesOption?.map((e: any) => e.value)
        }))
      }
    }
  }

  const onDeleteOne = (id: string) => {
    swal.fire({
      title: "Do you want to delete this competition?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      icon: 'question',
    }).then((e: any) => {
      if (e.isConfirmed) {
        console.log("delete: " + id)
        dispatch(deleteCompetitionsFetch(id))
      }
    }).catch(() => {
      // when promise rejected...
    });
  }

  const onEditOne = (competions: any) => {
    setIdEdit(competions.id);
    setName(competions.name);
    setDates(new Date(competions.dates).toJSON().slice(0, 10));
    setRules(competions.rules);
    setLocation(competions.location);
    setValidation(competions.validation);
    setSelectedJudgesOption(competions.invitedJudges.map(({ judges }: any) => ({ value: judges.id, label: judges.login })));
    setOpenModal(true)
  }


  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    if (competitionsStatus === 'success') {
      setOpenModal(false)
    }
  }, [competitionsStatus])

  // React.useEffect(() => {
  //   swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Your work has been saved",
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  //
  // }, [])

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

  return (
    <main className={styles.main}>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Competitions</h1>
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
          />
        </div>
        <button
          className={styles.button}
          onClick={() => {
            setOpenModal(true)
          }}>
          New competion
        </button>
        <ModalCompetition
          onClose={() => { resetStateLocal() }}
          accept="Save"
          onAccept={() => {
            onSaveCompetion()
          }}
          title="New competition"
          {...{ openModal, setOpenModal }}>
          <div>{competitionsRegisterError}</div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label value="Judges" />
              </div>
              <Select
                placeholder="Select an individual"
                options={judgesOptions}
                isMulti
                noOptionsMessage={() => "judge not found"}
                defaultValue={selectedJudgesOption}
                onChange={setSelectedJudgesOption}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={validation}
                onChange={(e: any) => {
                  setValidation(e.target.checked);
                }}
              />
              <Label htmlFor="remember">Wait for validation from the judges.</Label>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="location" />
              </div>
              <TextInput value={location} onChange={(e) => setLocation(e.target.value)} id="location" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dates" value="Date" />
              </div>
              <TextInput value={dates} onChange={(e) => setDates(e.target.value)} id="dates" type="date" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rules" value="Rules" />
              </div>
              <TextInput value={rules} onChange={(e) => setRules(e.target.value)} id="rules" type="text" sizing="lg" />
            </div>

          </div>
        </ModalCompetition>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="left">Name</th>
              <th>Date</th>
              <th className="left">Location</th>
              <th className="left">Rules</th>
              <th>Judges</th>
              <th>Participants</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {competitionsDatas?.map((competitionData: any) => {
              const competitors = getCompetitors(competitionData);
              const judges = competitionData.invitedJudges?.map((e: any) => e.judges);
              return <tr key={competitionData?.id}>
                <td>{competitionData?.name}</td>
                <td className="center" style={{ width: 100, fontWeight: 'bold' }}>{formatDate(competitionData?.dates)}</td>
                <td>{competitionData?.location}</td>
                <td>{competitionData?.rules}</td>
                <td style={{ position: 'relative' }}>
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: (judges?.length * 24) - (8 * (judges?.length - 1)),
                    }}>
                    {
                      judges?.map((judge: any, i: number) => {
                        const src = (judge.photos.length && `${config.API_HOST}/${judge.photos[judge.photos.length - 1].name}`)
                          || userProfile;
                        return <Image
                          key={i}
                          src={src}
                          width={24}
                          height={24}
                          alt="Picture of the author"
                          style={{
                            borderRadius: '50%',
                            position: 'relative',
                            transform: `translateX(-${i * 8}px)`,
                            border: '1px solid #22272C99'
                          }}
                        />
                      })
                    }
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      position: 'relative',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: (competitors.length * 24) - (8 * (competitors.length - 1)),
                    }}>
                    {
                      competitors.map(({ photos }, i) => {
                        const src = (photos.length && `${config.API_HOST}/${photos[0].name}`)
                          || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU";
                        return <Image
                          key={i}
                          loader={() => src}
                          src={src}
                          width={24}
                          height={24}
                          alt="Picture of the author"
                          style={{
                            borderRadius: '50%',
                            position: 'relative',
                            transform: `translateX(-${i * 8}px)`,
                            border: '1px solid #22272C99'
                          }}
                        />
                      })
                    }
                  </div>
                </td>
                <td className={styles.td_center} style={{ width: 100 }}>
                  <i className={`fas fa-edit ${styles.icon}`} onClick={() => onEditOne(competitionData)}></i>
                  <i className={`fas fa-trash ${styles.icon}`} onClick={() => onDeleteOne(competitionData.id)}></i>
                  <i className={`fa-solid fa-calendar-days ${styles.icon}`} onClick={() => clickCalendar(competitionData.id)}></i>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
})

export default withAuth(Competitions);
