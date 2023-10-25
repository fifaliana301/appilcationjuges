import { configureStore } from '@reduxjs/toolkit';
import { 
  articlesSlice,
} from './slices';

export * from './actions';

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
  }
})

// export type AppDispatch = typeof store.dispatch;
