import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { formFieldReducer, formHeaderReducer } from '../features/counter/formSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    formField: formFieldReducer,
    formHeader: formHeaderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
