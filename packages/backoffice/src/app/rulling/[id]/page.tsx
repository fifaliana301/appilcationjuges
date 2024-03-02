"use client"
import React from 'react'
import Image from 'next/image'
import styles from './rulling.module.css'
import { changeRullingActiveFetch } from '@/libs/reducers/actions/calendarsBattles.action'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import withAuth from '@/components/withAuth'

const socket = io('http://localhost:4001');

const getTotalNumber = (obj: any) => {
  const values = [
    "execution",
    "form",
    "confidence",
    "spontaneity",
    "technique",
    "variete",
    "performativity",
    "musicality",
    "creativity",
    "personality",
    "repeat",
    "beat",
    "crash",
    "misbehavior"
  ]
  let response = 0
  values.map((value:any) => {
    response += obj[value] 
  })
  return response;
}
function Rullings({ params: { id } }: any) {
  const rullingDatas = useSelector((state: any) => state.calendarsBattles.rullingDatas)
  const dispatch = useDispatch()
  const [rullingValue, setRullingValue] = React.useState({})
  const [maxRullingValue, setMaxRullingValue] = React.useState(0);

  React.useEffect(() => {
    socket.on('saveAllMobile', (message) => {
      console.log("saveAllMobile: ")
      dispatch(changeRullingActiveFetch({ id }))
    });
    return () => {
      socket.off('message');
    };
  }, []);

  React.useEffect(() => {
    dispatch(changeRullingActiveFetch({ id }))
  }, [id])

  const refreshDatas = () => {
    console.log('=================================================')
    // console.log("arrive ici rounds: ", rullingDatas?.rounds)
    // console.log("arrive ici judges: ", rullingDatas?.judges)
    let rullingValueLocal = {};
    rullingDatas?.rounds.map((round: any) => {
      let numberWin1 = 0
      let numberWin2 = 0
      rullingDatas?.judges?.map((judge: any) => {
        let last_action1 = null
        let last_action2 = null
        round.actions.map((action: any) => {
          if (action?.judgesId == judge.id) {
            if (action?.competitorsId === rullingDatas?.competitors[0].id) {
              last_action1 = action
            }
            if (action?.competitorsId === rullingDatas?.competitors[1].id) {
              last_action2 = action
            }
          }
        })
        if (last_action1 && last_action2) {
          const res = getTotalNumber(last_action1) > getTotalNumber(last_action2);
          if (res) {
            numberWin1 += 1
          } else {
            numberWin2 += 1
          }
        }
      })
      if (numberWin1 != numberWin2) {
        const verdict = numberWin1 > numberWin2
        const newValue = (rullingValueLocal[rullingDatas.competitors[verdict ? 0 : 1].id] || 0) + 1;
        if (newValue > maxRullingValue) {
          setMaxRullingValue(newValue);
        }
        rullingValueLocal = {
          ...rullingValueLocal,
          [rullingDatas.competitors[verdict ? 0 : 1].id]: newValue
        }
      }
    })
    setRullingValue(rullingValueLocal)
  }

  const firstUpdateRulling = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdateRulling.current) {
      firstUpdateRulling.current = false;
      return;
    }
    refreshDatas();
  }, [rullingDatas])

  return (
    <main className={styles.main}>
      <div className={styles.competitor}>
        <div className={styles.competitor1}>
          <img />
          <h1>{rullingDatas?.competitors[0].name}</h1>
        </div>
        <div className={styles.rullings}>
          <div
            className={styles.rulling1}
            style={{
              height: ((((rullingValue[rullingDatas?.competitors[0].id] || 0) * 380) / maxRullingValue) || 0) || 55
            }}
          >
            {rullingValue[rullingDatas?.competitors[0].id] || 0}
          </div>
          <h1 className={styles.vs}>VS</h1>
          <div
            className={styles.rulling2}

            style={{
              height: ((((rullingValue[rullingDatas?.competitors[1].id] || 0) * 380) / maxRullingValue) || 0) || 55
            }}
          >
            {rullingValue[rullingDatas?.competitors[1].id] || 0}
          </div>
        </div>

        <div className={styles.competitor2}>
          <img />
          <h1>{rullingDatas?.competitors[1].name}</h1>
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              {
                rullingDatas?.judges.map((judge: any) => {
                  return <th key={judge.id} className={styles.judge}>{judge.login}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              rullingDatas?.rounds?.map((round: any) => {
                return <tr key={round.id} className={styles.tr}>
                  <td>{round.name}</td>
                  {
                    rullingDatas?.judges?.map((judge: any) => {
                      let last_action1 = null
                      let last_action2 = null
                      round.actions.map((action: any) => {
                        if (action?.judgesId == judge.id) {
                          if (action?.competitorsId === rullingDatas?.competitors[0].id) {
                            last_action1 = action
                          }
                          if (action?.competitorsId === rullingDatas?.competitors[1].id) {
                            last_action2 = action
                          }
                        }
                      })
                      if (last_action1 && last_action2) {
                        const res = getTotalNumber(last_action1) > getTotalNumber(last_action2);
                        // console.log(rullingDatas.competitors[res ? 0 : 1].id, (rullingValue[rullingDatas.competitors[res?0:1].id] || 0) + 1)
                        // const newRullingValue = {
                        //   ...rullingValue,
                        //   [rullingDatas.competitors[res ? 0 : 1].id]: (rullingValue[rullingDatas.competitors[res ? 0 : 1].id] || 0) + 1
                        // }
                        return <td key={judge.id} className={styles[res ? 'res1' : 'res2']}><div /></td>
                      }
                      return <td key={judge.id} />
                    })
                  }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default withAuth(Rullings);
