import React from "react"
import { View, StyleSheet, Text } from "react-native"

import {
  MyCompetitors,
} from '@bboy-app/story';
import { useDispatch, useSelector } from "react-redux";
import { changeCompetitorsActiveFetch } from "../../reducers/actions/competitors.action";

const CompetitorsComponent: React.FC<any> = ({
  isDark,
  competitorsActive,
  actionsDatas
}) => {
  const [leftPercent, setLeftPercent] = React.useState(50)
  const [rightPercent, setRightPercent] = React.useState(50)

  const dispatch = useDispatch()
  const competitors = useSelector((state: any) => state.calendarsBattles?.calendarsBattlesActive?.competitors)

  React.useEffect(() => {
    if (competitors) {
      dispatch(changeCompetitorsActiveFetch(competitors[0]))
    }
  }, [competitors])

  const changeCompetitorsActive = (competitor: any) => {
    dispatch(changeCompetitorsActiveFetch(competitor))
  }

  const addSpace = (value) => {
    const ts = 3 - value.toString().length;
    return value.toString().padStart(ts, ' ')

  }


  React.useEffect(() => {
    if (actionsDatas && competitors) {
      const left = actionsDatas.find((aD: any) => aD.competitor?.id === competitors[0]?.id)
      const right = actionsDatas.find((aD: any) => aD.competitor?.id === competitors[1]?.id)
      let leftValue = 0
      let rightValue = 0
      if (left) {
        Object.values(left).map((lf: any) => {
          if (typeof (lf) === 'number') {
            leftValue += Number(lf)
          }
        })
      }
      if (right) {
        Object.values(right).map((rg: any) => {
          if (typeof (rg) === 'number') {
            rightValue += Number(rg)
          }
        })
      }
      if (leftValue !== 0 || rightValue !== 0) {
        setLeftPercent(addSpace(parseInt((leftValue * 100) / (leftValue + rightValue))))
        setRightPercent(addSpace(parseInt((rightValue * 100) / (leftValue + rightValue))))
      } else {
        setLeftPercent(addSpace(0))
        setRightPercent(addSpace(0))
      }
    }
  }, [actionsDatas, competitors])

  return (
    <View style={styles.competitors({ isDark })}>
      <MyCompetitors
        isDark={isDark}
        style={{
          contentView: {
            borderRadius: 8,
          },
          image: {
            borderRadius: 8,
          }
        }}
        name={competitors ? competitors[0]?.name : ""}
        isActive={competitors && competitorsActive?.id == competitors[0]?.id}
        onPress={() => changeCompetitorsActive(competitors[0])}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.competitorsText({ isDark }), { opacity: competitors && competitorsActive?.id == competitors[0]?.id ? 1 : 0.7 }]}>{leftPercent}%</Text>
        <Text style={styles.competitorsText({ isDark })}>vs</Text>
        <Text style={[styles.competitorsText({ isDark }), { opacity: competitors && competitorsActive?.id == competitors[1]?.id ? 1 : 0.7 }]}>{rightPercent}%</Text>
      </View>
      <MyCompetitors
        isDark={isDark}
        style={{
          contentView: {
            borderRadius: 8,
          },
          image: {
            borderRadius: 8,
          }
        }}
        name={competitors ? competitors[1]?.name : ""}
        isActive={competitors && competitorsActive?.id == competitors[1]?.id}
        onPress={() => changeCompetitorsActive(competitors[1])}
      />
    </View>
  )
}

const styles = StyleSheet.create<any>({
  competitors: () => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  }),
  competitorsText: ({ isDark }) => ({
    color: !isDark ? '#22272C' : '#F4F4F4',
    marginHorizontal: 12
  })
})

export default CompetitorsComponent
