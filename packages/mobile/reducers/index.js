import { configureStore } from '@reduxjs/toolkit';
import {
  calendarsBattlesSlice,
  judgesSlice,
  actionsSlice,
  competitorsSlice,
  roundsSlice,
  competitionsSlice,
  systemSlice,
} from './slices';

export * from './actions';

export const store = configureStore({
  reducer: {
    calendarsBattles: calendarsBattlesSlice.reducer,
    judges: judgesSlice.reducer,
    actions: actionsSlice.reducer,
    competitors: competitorsSlice.reducer,
    rounds: roundsSlice.reducer,
    competitions: competitionsSlice.reducer,
    system: systemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// export type AppDispatch = typeof store.dispatch;
