"use client";
import React from 'react';
import styles from './page.module.css'
import useStateToggleDark from '@/components/dark';
import Image from 'next/image'

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useRouter } from 'next/navigation'



import { useDispatch, useSelector } from 'react-redux';
import { addCompetitorsToCompetitions, initCompetitionsFetch, initJudgesFetch } from '@/libs/reducers';
import { formatDate } from '@/libs/utils/utils';
import { withSwal } from 'react-sweetalert2';
import { resetState } from '@/libs/reducers/slices';
import withAuth from '@/components/withAuth';

const Competitions = withSwal(function({ swal }: any) {
  const dispatch = useDispatch();
  const competitionsDatas = useSelector((state: any) => state.competitions?.datas);

  // const competitionsStatus = useSelector((state: any) => state.competitions?.competitionsStatus);

  const router = useRouter()
  const [dark, setDark] = useStateToggleDark();
  const [isShownHover, setIsShownHover] = React.useState(false);
  const [userConnected, setUserConnected] = React.useState();

  React.useEffect(() => {
    dispatch(initCompetitionsFetch())
  }, [])

  React.useEffect(() => {
    dispatch(initJudgesFetch())
  }, [])

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userParse = JSON.parse(user);
      setUserConnected(userParse);
    }
  }, [])


  const clickCalendar = (id: any) => {
    router.push(`/calandarsBattle/${id}`)
  }

  const addCompetitorToCompetition = (idCompetitions: string) => {
    if (userConnected) {
      const idUser = userConnected?.id;
      swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, subscribe it!"
      }).then((result: any) => {
        if (result.isConfirmed) {
          console.log("isConfirmed")
          dispatch(addCompetitorsToCompetitions({
            idCompetitions: idCompetitions,
            idCompetitors: idUser
          }))
        }
      });
    }
  }


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
      <div className="container-input-search d-flex justify-content-between align-items-center mt-5">
        <div className={styles.containerInputSearch}>
          <i className={`fas fa-search ${styles.iconInputSearch}`}></i>
          <input
            className={styles.inputSearch}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className={styles.list_competion}>
        {competitionsDatas?.map((competitionData: any, i: any) => {
          const alreadySubscribe = competitionData.competitors.find((competitor: any) => competitor?.id == userConnected?.id)
          // const competitors = getCompetitors(competitionData);
          // console.log(competitors)
          const judges = competitionData.invitedJudges?.map((e: any) => e.judges);
          return <div
            key={competitionData?.id}
            className={styles.main_card}
            style={{
              backgroundImage:
                `url(${i % 2 === 0 ?
                  'https://lesmureaux.info/wp-content/uploads/2022/09/breakdanse-Mureaux.png' :
                  'https://i0.wp.com/www.justedanceclamart.com/wp-content/uploads/2019/08/Affiche_BATTLE_2019.png?fit=724%2C1024&ssl=1'
                })`,
              backgroundSize: 'cover',
            }}
            onMouseEnter={() => setIsShownHover(i)}
            onMouseLeave={() => setIsShownHover(null)}
          >
            {isShownHover === i &&
              <div className={styles.details}>
                <div className={styles.card_title}>{competitionData?.name}</div>
                judges:
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      display: 'flex',
                      // width: (judges?.length * 26) - (8 * (judges?.length - 1)),
                      // marginLeft: 10,
                    }}>
                    {
                      judges?.map((judge: any, j: number) => {
                        return <Image
                          key={j}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
                          width={24}
                          height={24}
                          alt="Picture of the author"
                          style={{
                            borderRadius: '50%',
                            position: 'relative',
                            transform: `translateX(${j * 4}px)`,
                            border: '1px solid #22272C99'
                          }}
                        />
                      })
                    }
                  </div>
                </div>
                <div
                  className="page_card_date center"
                  style={{ width: 100, fontWeight: 'bold', marginTop: 18 }}>
                  {formatDate(competitionData?.dates)}
                </div>
                <div className="page_card_location"><i className="fa-solid fa-location-dot"></i> {competitionData?.location}</div>
                <div className="page_card_rules">{competitionData?.rules}</div>
                {alreadySubscribe ?
                  < button
                    className={styles.button}
                    onClick={() => clickCalendar(competitionData?.id)}
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      width: 150,
                      right: 10,
                      background: '#dc0d79',
                    }}
                  >Your battles</button> :
                  <button
                    className={styles.button}
                    onClick={() => addCompetitorToCompetition(competitionData?.id)}
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      width: 100,
                      right: 10,
                      background: '#dc0d79',
                    }}
                  >Subscribe</button>
                }
              </div>
            }
          </div>
        })}
      </div>
    </main >
  )
})

export default withAuth(Competitions);
