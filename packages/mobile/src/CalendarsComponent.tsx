import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  MyCompetitors,
  MyBlock
} from '@bboy-app/story';
import { changeCalendarsBattlesActive } from '../reducers/actions/calendarsBattles.action';
import { useDispatch, useSelector } from 'react-redux';


const CalendarsComponent: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch()
  const competitionsDatas = useSelector((state: any) => state.competitions?.datas)
  const isDark = useSelector((state: any) => state.system?.isDark)


  const handleCalendars = (battle: any) => {
    dispatch(changeCalendarsBattlesActive(battle))
    navigation?.navigate('Home')
  };


  return (
    <View testID="login-page" style={styles.container({ isDark })}>
      <Text style={styles.title({ isDark })}>Calendars Battles</Text>
      <ScrollView>
        {competitionsDatas?.map((competitionsData: any, i: number) => {
          return <View>
            <Text style={styles.titleCompetitionsData({ isDark })}>{competitionsData.name}</Text>
            {
              competitionsData.calendarsBattles.map((calendarBattle: any) => {
                return <TouchableOpacity
                  key={calendarBattle.id}
                  onPress={() => handleCalendars(calendarBattle)}
                >
                  <MyBlock
                    isDark={isDark}
                    style={styles.competitors({ isDark })}
                  >
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
                      isActive
                      size={32}
                    />
                    <Text style={styles.competitorsText({ isDark })}>vs</Text>
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
                      isActive
                      size={32}
                    />
                    <View style={styles.description({ isDark })}>
                      <Text style={[styles.descriptionText({ isDark }), { fontSize: 10 }]}>{calendarBattle.date}</Text>
                      <Text style={[styles.descriptionText({ isDark }), { fontSize: 12 }]}>{calendarBattle.description}</Text>
                    </View>
                  </MyBlock>
                </TouchableOpacity>
              })
            }
          </View>
        })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create<any>({
  container: ({ isDark }) => ({
    backgroundColor: isDark ? '#22272C' : '#F4F4F4',
    flex: 1,
    padding: 8,
  }),
  title: ({ isDark }) => ({
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: !isDark ? '#22272C99' : '#F4F4F499',
  }),
  titleCompetitionsData: ({ isDark }) => ({
    fontSize: 12,
    color: !isDark ? '#22272C77' : '#F4F4F477',
  }),
  competitors: () => ({
    contentView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      width: 'auto',
      height: 48,
    }
  }),
  competitorsText: ({ isDark }) => ({
    color: !isDark ? '#22272C' : '#F4F4F4',
    marginHorizontal: 12,
  }),
  description: ({ isDark }) => ({
    marginHorizontal: 16,
  }),
  descriptionText: ({ isDark }) => ({
    color: !isDark ? '#22272Caa' : '#F4F4F4aa',
  }),
})

export default CalendarsComponent;
