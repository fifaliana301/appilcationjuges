"use client"
import React from 'react';
import { CardBattle } from '@/components/cardBattle/cardBattle';
import styles from './page.module.css'
import useStateToggleDark from '@/components/dark';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ModalCompetition from '@/components/modalCompetition/modalCompetition';
import { Button, Label, TextInput } from 'flowbite-react';
import { addCalendarsBattlesFetch, addTablesFetch, initTablesFetch, initInvitedJudgesFetch, initByCompetitionsFetch } from '@/libs/reducers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Rounds from '@/components/rounds';
import { set } from 'date-fns';
import { resetState } from '@/libs/reducers/slices';
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";

import { withSwal } from 'react-sweetalert2';
import withAuth from '@/components/withAuth';

const CalendarsBattles = withSwal(function({ swal, params: { id } }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dark, setDark] = useStateToggleDark();
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalBattle, setOpenModalBattle] = React.useState(false);
  // const [isAdmin, setIsAdmin] = React.useState(false);

  const invitedJudgesDatas = useSelector((state: any) => state.invitedJudges?.datas);
  const competitions = useSelector((state: any) => state.competitors?.competitions);
  const tablesStatus = useSelector((state: any) => state.tables?.tablesStatus)
  const tablesRegisterError = useSelector((state: any) => state.tables?.registerError?.message)

  const tablesDatas = useSelector((state: any) => state.tables?.datas)

  const [name, setName] = React.useState("table" + Date.now());

  const [description, setDescription] = React.useState("description" + Date.now());
  const [dates, setDates] = React.useState(new Date().toISOString().split("T")[0]);
  const [tables, setTables] = React.useState<any>(null);

  const calendarsBattlesStatus = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesStatus)
  const calendarsBattlesError = useSelector((state: any) => state.calendarsBattles?.registerError?.message)
  const [judgesOptions, setJudgesOptions] = React.useState([]);
  const [selectedJudgesOption, setSelectedJudgesOption] = React.useState<any>(null);

  const [competitorsOptions, setCompetitorsOptions] = React.useState([]);
  const [selectedCompetitorsOption, setSelectedCompetitorsOption] = React.useState<any>(null);

  const [idRound, setIdRound] = React.useState(false);
  const [userToken, setUserToken] = React.useState<any>();

  const firstUpdateJudges = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateJudges.current) {
      firstUpdateJudges.current = false;
      return;
    }
    const newJudgesDatas = invitedJudgesDatas.map((judge: any) => {
      return ({ value: judge.judges.id, label: judge.judges.login });
    })
    setJudgesOptions(newJudgesDatas);

  }, [invitedJudgesDatas])

  React.useEffect(() => {
    const value = localStorage.getItem('accessToken');
    if (value !== null) {
      const token = JSON.parse(value);
      const decoded = jwtDecode(token);
      setUserToken(decoded)
    }
  }, [])

  const firstUpdateCompetitions = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateCompetitions.current) {
      firstUpdateCompetitions.current = false;
      return;
    }
    const newCompetitions = competitions.map((competition: any) => {
      return ({ value: competition.id, label: competition.name });
    })
    setCompetitorsOptions(newCompetitions);
  }, [competitions])


  React.useEffect(() => {
    dispatch(initTablesFetch({ id }))
    dispatch(initInvitedJudgesFetch({ id }))
    dispatch(initByCompetitionsFetch({ id }))
  }, [id]);

  const saveTable = () => {
    dispatch(addTablesFetch({
      name: name,
      competitions: {
        id: id
      }
    }));
  }

  const saveBattle = () => {
    if (tables && selectedJudgesOption) {
      dispatch(addCalendarsBattlesFetch({
        dates: new Date(dates).toISOString(),
        description: description,
        tables: {
          id: tables?.id
        },
        judges: {
          ids: selectedJudgesOption?.map((e: any) => e.value)
        },
        competitors: {
          ids: selectedCompetitorsOption?.map((e: any) => e.value)
        }
      }));
    }
  }

  const firstUpdateReward = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateReward.current) {
      firstUpdateReward.current = false;
      return;
    }
    if (tablesStatus === 'success') {
      setOpenModal(false)
    }
  }, [tablesStatus])

  const firstUpdateCalendarsBattles = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateCalendarsBattles.current) {
      firstUpdateCalendarsBattles.current = false;
      return;
    }
    if (calendarsBattlesStatus === 'success') {
      setOpenModalBattle(false)
    }
  }, [calendarsBattlesStatus])

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
      <Rounds openModal={!!idRound || idRound === 0} idRound={idRound} setOpenModal={setIdRound} />
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.buttonGoBack}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <h1>Calandars Battle</h1>
        </div>
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
        <button className={styles.button} onClick={() => { setOpenModal(true) }}>
          New battle
        </button>
        <ModalCompetition
          key="table"
          accept="Save"
          onAccept={() => {
            saveTable();
          }}
          title="New table"
          {...{ openModal, setOpenModal }}>
          <div>{tablesRegisterError}</div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" sizing="md" />
            </div>
          </div>
        </ModalCompetition>
        <ModalCompetition
          key="calendars"
          accept="Save"
          cancel="Cancel"
          onAccept={() => {
            saveBattle();
          }}
          onCancel={() => {
            setTables(null);
            setOpenModalBattle(false);
          }}
          title="New calendars battles"
          openModal={openModalBattle}
          setOpenModal={setOpenModalBattle}>
          <div>{calendarsBattlesError}</div>
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
            <div>
              <div className="mb-2 block">
                <Label value="Competitors" />
              </div>
              <Select
                placeholder="Select an individual"
                options={competitorsOptions}
                isMulti
                noOptionsMessage={() => "competitors not found"}
                defaultValue={selectedCompetitorsOption}
                onChange={setSelectedCompetitorsOption}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tables" value="Table" />
              </div>
              <TextInput value={tables?.name || ""} id="tables" type="text" sizing="md" readOnly />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput value={description} onChange={(e) => setDescription(e.target.value)} id="description" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <TextInput value={dates} onChange={(e) => setDates(e.target.value)} id="date" type="date" sizing="md" />
            </div>
          </div>
        </ModalCompetition>
      </div>
      <div className={`${styles.table_listes} d-flex mt-5`}>
        {
          tablesDatas.map((tablesData: any) => {
            return <div key={tablesData.id} className={styles.table}>
              <div className={styles.table_header}>
                <div className="text-align-center">{tablesData.name}</div>
                {userToken?.type === "admins" &&
                  <div className="d-flex justify-content-between align-items-center gap-1">
                    <Button
                      onClick={() => {
                        setOpenModalBattle(true);
                        setTables(tablesData);
                      }}
                      style={{ width: 50 }}
                      size="xs"
                      className="max-w-full">
                      New
                    </Button>
                    <div style={{ margin: 4 }} />
                    <Button

                      style={{ width: 50 }}
                      onClick={() => { }}
                      color="failure"
                      size="xs"
                    >
                      Delete
                    </Button>
                  </div>
                }
              </div>

              <div>
                {
                  tablesData.calendarsBattles.map((calendarsBattles: any) => {
                    return <CardBattle
                      key={calendarsBattles.id}
                      data={calendarsBattles}
                      setIdRound={setIdRound}
                      isAdmin={["admins", "super_admin"].includes(userToken?.type)}
                    />
                  })
                }
              </div>
            </div>
          })
        }
      </div>
    </main>
  )
})

export default withAuth(CalendarsBattles);
