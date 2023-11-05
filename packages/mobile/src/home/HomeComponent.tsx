import React from "react"
import { View, StyleSheet, Text } from "react-native"
import SlidersComponent from './SlidersComponent';
import CenterComponent from "./CenterComponent";
import HeaderComponent from "./HeaderComponent";

import CompetitorsComponent from "./CompetitorsComponent";
import { useDispatch, useSelector } from "react-redux";
import { addActionRoundsFetch, addActionsFetch, addRoundsCalendarsBattlesFetch, addRoundsFetch, changeLatestActionFetch, changeRoundsActiveFetch, deleteActionRoundsFetch, deleteActionsFetch, deleteRoundsCalendarsBattlesFetch } from "../../reducers";

const HomeComponent: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch()
  const calendarsBattlesActive = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesActive)
  const judgesActive = useSelector((state: any) => state.judges?.judgesActive)
  const roundsActive = useSelector((state: any) => state.rounds?.roundsActive)
  const latestAction = useSelector((state: any) => state.actions?.latestAction)
  const rounds = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesActive?.rounds)
  const latestActionType = useSelector((state: any) => state.actions?.latestType)
  const latestActionPayload = useSelector((state: any) => state.actions?.latestPayload)
  const latestRoundType = useSelector((state: any) => state.rounds?.latestType)
  const latestRoundPayload = useSelector((state: any) => state.rounds?.latestPayload)
  const roundsDatas = useSelector((state: any) => state.rounds?.datas)
  const competitorsActive = useSelector((state: any) => state.competitors?.competitorsActive)
  const actionsDatas = useSelector((state: any) => state.actions?.datas)
  const [userActionsDatas, setUserActionsDatas] = React.useState([]);

  const isDark = useSelector((state: any) => state.system?.isDark)


  React.useEffect(() => {
    if (calendarsBattlesActive) {
      if (rounds && rounds?.lenght) {
        dispatch(changeRoundsActiveFetch(rounds[rounds.lenght - 1]))
      } else {
        const newRounds = {
          id: "1",
          name: "Round1",
          start_time: new Date().toString(),
          end_time: new Date().toString(),
          actions: [],
          calendarsBattles: calendarsBattlesActive
        }

        dispatch(addRoundsFetch(newRounds))
      }
    }
  }, [rounds])

  React.useEffect(() => {
    if (userActionsDatas.length) {
      dispatch(changeLatestActionFetch(userActionsDatas[0]))
    } else {
      dispatch(changeLatestActionFetch(null))
    }
  }, [userActionsDatas])

  const handleBack = () => {
    navigation?.goBack()
  }

  const handleRounds = () => {
  }

  const addAction = (actionName: string, value: number) => {
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
    }
    newAction[actionName] = value
    newAction['round'] = roundsActive
    newAction['judge'] = judgesActive
    newAction['competitor'] = competitorsActive
    newAction['latestAction'] = actionName
    dispatch(addActionsFetch(newAction))
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
      return dt.competitor?.id === competitorsActive?.id
    })
    setUserActionsDatas(newUserActionsDatas)
  }, [actionsDatas, competitorsActive])


  return (
    <View testID="home-page" style={styles.container({ isDark })}>
      <HeaderComponent
        {...{
          isDark,
          handleBack,
          handleRounds,
          roundsActive,
        }}
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
