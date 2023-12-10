import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { formFieldReducer, formHeaderReducer, formResponseReducer } from '../features/form/formSlice';

export const store = configureStore({
  reducer: {
    formField: formFieldReducer,
    formHeader: formHeaderReducer,
    formResponse: formResponseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
