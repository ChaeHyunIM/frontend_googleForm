import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FormFieldsState {
  id: string;
  type: FormFieldType;
  label: string;
  options?: option[];
}

export type FormFieldType = '단답형' | '장문형' | '객관식 질문' | '체크박스' | '드롭다운';

export interface option {
  id: string;
  label: string;
}

const initialState: FormFieldsState[] = [];

const formFieldsSlice = createSlice({
  name: 'formField',
  initialState,
  reducers: {
    addFormField: (state, action: PayloadAction<FormFieldsState>) => {
      state.push(action.payload);
    },
    editFormField: (state, action: PayloadAction<FormFieldsState>) => {
      const { id, type, label, options } = action.payload;
      const itemIndex = state.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        state[itemIndex] = { id, type, label, options };
      }
    },
    deleteFormField: (state, action: PayloadAction<string>) => {
      const itemIndex = state.findIndex(item => item.id === action.payload);

      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      }
    },
    reorderFormField: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, removed);
    },
  },
});

export const { addFormField, editFormField, deleteFormField, reorderFormField } = formFieldsSlice.actions;

export const selectFormFields = (state: RootState) => state.formField;

export default formFieldsSlice.reducer;
