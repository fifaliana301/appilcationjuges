import React from "react"
import { View, StyleSheet, Text } from "react-native"

import {
  MyCompetitors,
  MyDialog,
  MyButton,
} from '@bboy-app/story';
import { useDispatch, useSelector } from "react-redux";
import { changeCompetitorsActive } from "../../reducers/slices";

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
    if (!competitorsActive && competitors?.length) {
      changeCompetitorsActiveLocal(competitors[0])
    }
  }, [competitors])

  const changeCompetitorsActiveLocal = (competitor: any) => {
    dispatch(changeCompetitorsActive(competitor))
  }

  const addSpace = (value: any) => {
    const ts = 3 - value.toString().length;
    return value.toString().padStart(ts, ' ')
  }


  React.useEffect(() => {
    if (actionsDatas && competitors && !Array.isArray(competitors[0]) && !Array.isArray(competitors[1])) {
      const left = actionsDatas.find((aD: any) => aD.competitors?.id === competitors[0]?.id)
      const right = actionsDatas.find((aD: any) => aD.competitors?.id === competitors[1]?.id)
      let leftValue = 0
      let rightValue = 0
      if (left) {
        leftValue += left.execution;
        leftValue += left.form;
        leftValue += left.form;
        leftValue += left.confidence;
        leftValue += left.spontaneity;
        leftValue += left.technique;
        leftValue += left.variete;
        leftValue += left.performativity;
        leftValue += left.musicality;
        leftValue += left.creativity;
        leftValue += left.personality;
        leftValue += left.repeat;
        leftValue += left.beat;
        leftValue += left.crash;
        leftValue += left.misbehavior;
      }
      if (right) {
        rightValue += right.execution;
        rightValue += right.form;
        rightValue += right.form;
        rightValue += right.confidence;
        rightValue += right.spontaneity;
        rightValue += right.technique;
        rightValue += right.variete;
        rightValue += right.performativity;
        rightValue += right.musicality;
        rightValue += right.creativity;
        rightValue += right.personality;
        rightValue += right.repeat;
        rightValue += right.beat;
        rightValue += right.crash;
        rightValue += right.misbehavior;
      }
      if (leftValue !== 0 || rightValue !== 0) {
        setLeftPercent(addSpace(parseInt((leftValue * 100) / (leftValue + rightValue))))
        setRightPercent(addSpace(parseInt((rightValue * 100) / (leftValue + rightValue))))
      } else {
        setLeftPercent(addSpace(50))
        setRightPercent(addSpace(50))
      }
    } else {
      setLeftPercent(addSpace(50))
      setRightPercent(addSpace(50))
    }

  }, [actionsDatas, competitors])

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <MyDialog isDark={isDark} visible={visible} handleCancel={handleCancel}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            [0, 1, 3, 4, 5, 6, 7, 8, 9].map((_, i: number) => {
              return <MyCompetitors
                key={i}
                isDark={isDark}
                style={{
                  contentView: {
                    marginLeft: 8,
                    marginBottom: 8,
                  },
                  containerImage: {
                    borderRadius: 8,
                  },
                  image: {
                    borderRadius: 8,
                  }
                }}
                name={competitors ? competitors[0]?.name : ""}
                isActive={competitors && competitorsActive?.id == competitors[0]?.id}
                onPress={() => {
                  showDialog(false)
                  changeCompetitorsActiveLocal(competitors[0])
                }}
              />
            })
          }
        </View>
        <MyButton
          text="Enregistrer"
          onPress={handleCancel}
          style={{
            contentView: {
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              marginTop: 16,
            },
            text: {
              fontSize: 10,
            }
          }}
          isDark={isDark}
        />
      </MyDialog>
      <View style={styles.competitors({ isDark })}>
        <MyCompetitors
          isDark={isDark}
          style={{
            containerImage: {
              borderRadius: 8,
            },
            image: {
              borderRadius: 8,
            }
          }}
          name={competitors ? competitors[0]?.name : ""}
          isActive={competitors && competitorsActive?.id == competitors[0]?.id}
          onPress={() => {
            // showDialog(true)
            changeCompetitorsActiveLocal(competitors[0])
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.competitorsText({ isDark }), { opacity: competitors && competitorsActive?.id == competitors[0]?.id ? 1 : 0.7 }]}>{leftPercent}%</Text>
          <Text style={styles.competitorsText({ isDark })}>vs</Text>
          <Text style={[styles.competitorsText({ isDark }), { opacity: competitors && competitorsActive?.id == competitors[1]?.id ? 1 : 0.7 }]}>{rightPercent}%</Text>
        </View>
        <MyCompetitors
          isDark={isDark}
          style={{
            containerImage: {
              borderRadius: 8,
            },
            image: {
              borderRadius: 8,
            }
          }}
          name={competitors ? competitors[1]?.name : ""}
          isActive={competitors && competitorsActive?.id == competitors[1]?.id}
          onPress={() => changeCompetitorsActiveLocal(competitors[1])}
        />

      </View>
    </>
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
