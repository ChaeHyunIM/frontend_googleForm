import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FormHeaderState {
  title: string;
  description?: string;
}

export interface FormFieldState {
  id: string;
  type: FormFieldType;
  label: string;
  isRequired: boolean;
  options?: option[];
}

export type FormFieldType = '단답형' | '장문형' | '객관식 질문' | '체크박스' | '드롭다운';

export interface option {
  id: string;
  label: string;
}

const initialFormHeaderState: FormHeaderState = {
  title: '제목 없는 설문지',
  description: '',
};

const initialFormFieldState: FormFieldState[] = [];

const formHeaderSlice = createSlice({
  name: 'formHeader',
  initialState: initialFormHeaderState,
  reducers: {
    editFormHeader: (state, action: PayloadAction<FormHeaderState>) => {
      const { title = '제목 없는 설문지', description = '' } = action.payload;
      state.title = title;
      state.description = description;
    },
  },
});

const formFieldsSlice = createSlice({
  name: 'formField',
  initialState: initialFormFieldState,
  reducers: {
    addFormField: (state, action: PayloadAction<FormFieldState>) => {
      state.push(action.payload);
    },
    editFormField: (state, action: PayloadAction<FormFieldState>) => {
      const { id, type, label, options, isRequired } = action.payload;
      const itemIndex = state.findIndex(item => item.id === id);

      if (itemIndex >= 0) {
        state[itemIndex] = { id, type, label, options, isRequired };
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

export const { editFormHeader } = formHeaderSlice.actions;

export const { addFormField, editFormField, deleteFormField, reorderFormField } = formFieldsSlice.actions;

export const selectFormFields = (state: RootState) => state.formField;

export const { reducer: formHeaderReducer } = formHeaderSlice;
export const { reducer: formFieldReducer } = formFieldsSlice;
