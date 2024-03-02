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
  MyBlock,
  MySwitch,
  MyAvatar,
} from '@bboy-app/story';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeCalendarsBattlesActive } from '../reducers/actions/calendarsBattles.action';
import { useDispatch, useSelector } from 'react-redux';
import { initCompetitionsFetch } from '../reducers/actions/competitions.action';
import { setIsDark } from '../reducers/slices';


const CalendarsComponent: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch()
  const competitionsDatas = useSelector((state: any) => state.competitions?.datas)
  const isDark = useSelector((state: any) => state.system?.isDark)


  const handleCalendars = (battle: any) => {
    dispatch(changeCalendarsBattlesActive(battle))
    navigation?.navigate('Home')
  };

  React.useEffect(() => {
    dispatch(initCompetitionsFetch())
  }, [])

  const storeData = async (value: any) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('isDark', jsonValue);
    return value;
  };

  const setDark = () => {
    storeData(!isDark)
      .then((isDarkStorage) => {
        dispatch(setIsDark(isDarkStorage))
      })
  }


  return (
    <View testID="login-page" style={styles.container({ isDark })}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title({ isDark })}>Calendars Battles</Text>
        <View style={styles.headerRight({ isDark })}>
          <MySwitch
            value={isDark}
            setValue={setDark}
          />
          <MyAvatar
            isDark={isDark}
            style={{
              contentView: {
                marginLeft: 16,
                borderRadius: 8,
              },
              image: {
                borderRadius: 8,
              }
            }}
          />
        </View>
      </View>
      <ScrollView>
        {competitionsDatas?.map((competitionsData: any) => {
          return <View key={competitionsData?.id}>
            <Text style={styles.titleCompetitionsData({ isDark })}>{competitionsData?.name}</Text>
            {
              competitionsData.tables?.map((table: any) => {
                return <View key={table.id}>
                  <Text style={{ ...styles.titleCompetitionsData({ isDark }), marginLeft: 8 }}>{table.name}</Text>
                  {
                    table.calendarsBattles?.map((calendarBattle: any) => {
                      return <TouchableOpacity
                        key={calendarBattle.id}
                        onPress={() => {
                          if (calendarBattle?.rounds?.length && calendarBattle?.competitors?.length === 2) {
                            handleCalendars(calendarBattle)
                          }
                        }}
                        style={{ opacity: calendarBattle?.rounds?.length && calendarBattle?.competitors?.length === 2 ? 1 : 0.2 }}
                      >
                        <MyBlock
                          isDark={isDark}
                          style={styles.competitors({ isDark })}
                        >
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
                            isActive
                            size={32}
                          />
                          <Text style={styles.competitorsText({ isDark })}>vs</Text>
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
                            isActive
                            size={32}
                          />
                          <View style={styles.description({ isDark })}>
                            <Text style={[styles.descriptionText({ isDark }), { fontSize: 10 }]}>{calendarBattle.dates}</Text>
                            <Text style={[styles.descriptionText({ isDark }), { fontSize: 12 }]}>{calendarBattle.description}</Text>
                          </View>
                        </MyBlock>
                      </TouchableOpacity>
                    })
                  }
                </View>
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
    flex: 1,
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
      marginHorizontal: 8
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
  headerRight: ({ isDark }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  }),
})

export default CalendarsComponent;
