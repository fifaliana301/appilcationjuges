import React from "react"
import { View, StyleSheet, Text } from "react-native"
import SlidersComponent from './SlidersComponent';
import CenterComponent from "./CenterComponent";
import HeaderComponent from "./HeaderComponent";

import CompetitorsComponent from "./CompetitorsComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addActionRoundsFetch,
  addActionsFetch,
  addRoundsCalendarsBattlesFetch,
  changeLatestActionFetch,
  deleteActionRoundsFetch,
  deleteActionsFetch,
  deleteRoundsCalendarsBattlesFetch,
  initActionsFetch,
  initRoundsFetch,
  changeRoundsActiveFetch,
} from "../../reducers";

const HomeComponent: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch()
  const calendarsBattlesActive = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesActive)
  const judgesActive = useSelector((state: any) => state.judges?.judgesActive)
  const roundsActive = useSelector((state: any) => state.rounds?.roundsActive)
  const latestAction = useSelector((state: any) => state.actions?.latestAction)
  // const rounds = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesActive?.rounds)
  const latestActionType = useSelector((state: any) => state.actions?.latestType)
  const latestActionPayload = useSelector((state: any) => state.actions?.latestPayload)
  const latestRoundType = useSelector((state: any) => state.rounds?.latestType)
  const latestRoundPayload = useSelector((state: any) => state.rounds?.latestPayload)
  const roundsDatas = useSelector((state: any) => state.rounds?.datas)
  const competitorsActive = useSelector((state: any) => state.competitors?.competitorsActive)
  const actionsDatas = useSelector((state: any) => state.actions?.datas)
  const [userActionsDatas, setUserActionsDatas] = React.useState([]);
  const loadingRound = useSelector((state: any) => state.rounds?.loadingRound)

  const isDark = useSelector((state: any) => state.system?.isDark)


  React.useEffect(() => {
    if (calendarsBattlesActive) {
      dispatch(initRoundsFetch({ id: calendarsBattlesActive.id }))
    }
  }, [calendarsBattlesActive])

  React.useEffect(() => {
    dispatch(initActionsFetch())
  }, [])

  React.useEffect(() => {
    if (userActionsDatas.length) {
      console.log(userActionsDatas.map(({ id, createdAt }) => {
        return { id, createdAt: createdAt.toString() }
      }))
      dispatch(changeLatestActionFetch(userActionsDatas[0]))
    } else {
      dispatch(changeLatestActionFetch(null))
    }
  }, [userActionsDatas])

  const handleBack = () => {
    navigation?.goBack()
  }

  const handleRounds = (round: any) => {
    dispatch(changeRoundsActiveFetch(round))
  }

  const reloadRounds = () => {
    if (calendarsBattlesActive) {
      dispatch(initRoundsFetch({ id: calendarsBattlesActive.id }))
    }
  }

  const addAction = (actionName: string, value: number) => {
    console.log("judgesActive", judgesActive);
    if (roundsActive && judgesActive && competitorsActive) {
      let newAction: any = {
        execution: 0,
        form: 0,
        confidence: 0,
        spontaneity: 0,

        technique: 0,
        variete: 0,
        performativity: 0,
        musicality: 0,
        creativity: 0,
        personality: 0,

        repeat: 0,
        beat: 0,

        crash: 0,
        misbehavior: 0,
      }
      if (latestAction) {
        newAction = { ...latestAction }
        delete (newAction.createdAt)
      }
      newAction[actionName] = value
      newAction['rounds'] = roundsActive
      newAction['judges'] = judgesActive
      newAction['competitors'] = competitorsActive
      newAction['latestAction'] = actionName
      console.log("dispatch addActionsFetch");
      dispatch(addActionsFetch(newAction));
    }
  }

  const setUndo = () => {
    if (latestAction) {
      dispatch(deleteActionsFetch(latestAction))
    }
  }

  React.useEffect(() => {
    if (latestActionType && latestActionPayload) {
      if (latestActionType === 'actions/add/fulfilled') {
        dispatch(addActionRoundsFetch(latestActionPayload))
      }
      if (latestActionType === 'actions/delete/fulfilled') {
        dispatch(deleteActionRoundsFetch(latestActionPayload))
      }
    }
  }, [userActionsDatas])

  React.useEffect(() => {
    if (calendarsBattlesActive && roundsDatas && roundsDatas?.length) {
      let newRoundsActive;
      roundsDatas.map(roundData => {
        if (roundData.active) {
          newRoundsActive = roundData
        }
      })
      if (newRoundsActive) {
        dispatch(changeRoundsActiveFetch(newRoundsActive))
      } else {
        dispatch(changeRoundsActiveFetch(roundsDatas[0]))
      }
    }

    if (latestRoundType && latestRoundPayload) {
      if (latestRoundType === 'rounds/add/fulfilled') {
        dispatch(addRoundsCalendarsBattlesFetch(latestRoundPayload))
      }
      if (latestRoundType === 'rounds/delete/fulfilled') {
        dispatch(deleteRoundsCalendarsBattlesFetch(latestRoundPayload))
      }
    }
  }, [roundsDatas])


  React.useEffect(() => {
    const newUserActionsDatas = actionsDatas.filter((dt: any) => {
      return dt.competitors?.id === competitorsActive?.id && dt.roundsId == roundsActive?.id
    })
    setUserActionsDatas(newUserActionsDatas)
  }, [actionsDatas, competitorsActive, roundsActive])


  return (
    <View testID="home-page" style={styles.container({ isDark })}>
      <HeaderComponent
        {...{
          isDark,
          handleBack,
          handleRounds,
          reloadRounds,
          roundsActive,
          loadingRound,
        }}
        rounds={roundsDatas}
      />
      <CompetitorsComponent
        isDark={isDark}
        competitorsActive={competitorsActive}
        actionsDatas={actionsDatas}
      />
      <CenterComponent
        execution={latestAction?.execution || 0}
        setExecution={(value: any) => addAction('execution', value)}
        form={latestAction?.form || 0}
        setForm={(value: any) => addAction('form', value)}
        confidence={latestAction?.confidence || 0}
        setConfidence={(value: any) => addAction('confidence', value)}
        spontaneity={latestAction?.spontaneity || 0}
        setSpontaneity={(value: any) => addAction('spontaneity', value)}
        crash={latestAction?.crash || 0}
        setCrash={(value: any) => addAction('crash', value)}
        misbehavior={latestAction?.misbehavior || 0}
        setMisbehavior={(value: any) => addAction('misbehavior', value)}

        repeat={latestAction?.repeat || 0}
        beat={latestAction?.beat || 0}
        setRepeat={(value: any) => addAction('repeat', value)}
        setBeat={(value: any) => addAction('beat', value)}
        actionsDatas={userActionsDatas}
        isDark={isDark}
        setUndo={setUndo}
        competitorsActive={competitorsActive}
      />
      <SlidersComponent
        technique={latestAction?.technique || 0}
        setTechnique={(value: any) => addAction('technique', value)}
        variete={latestAction?.variete || 0}
        setVariete={(value: any) => addAction('variete', value)}
        performativity={latestAction?.performativity || 0}
        setPerformativity={(value: any) => addAction('performativity', value)}
        musicality={latestAction?.musicality || 0}
        setMusicality={(value: any) => addAction('musicality', value)}
        creativity={latestAction?.creativity || 0}
        setCreativity={(value: any) => addAction('creativity', value)}
        personality={latestAction?.personality || 0}
        setPersonality={(value: any) => addAction('personality', value)}
        isDark={isDark}
      />
    </View>
  )
}

const styles = StyleSheet.create<any>({
  container: ({ isDark }) => ({
    backgroundColor: isDark ? '#22272C' : '#F4F4F4',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  }),
})

export default HomeComponent
