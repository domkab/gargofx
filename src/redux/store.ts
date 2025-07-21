import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import postFormReducer from './slices/postFormSlice';
import featuredPostReducer from './slices/featuredPostSlice';
import homePageLayoutReducer from './slices/homePageSlice';

export const store = configureStore({
  reducer: {
    postForm: postFormReducer,
    featuredPost: featuredPostReducer,
    homePage: homePageLayoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;