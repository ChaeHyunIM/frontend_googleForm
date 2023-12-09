import Stack from '@mui/material/Stack';
import Input from '../atoms/Input';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DropDown from '../atoms/Dropdown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
// import ShortAnswer from '../molecules/Question/ShortAnswer';
// import LongAnswer from '../molecules/Question/LongAnswer';
// import RadioField from '../molecules/Question/Radio';
// import CheckBox from '../molecules/Question/Checkbox';
import Question from '../molecules/Question';
import { FormFieldsState, addFormField, deleteFormField, editFormField } from '../../features/counter/formSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateNumberId, generateStringId } from '../../utils/generateId';
import IconButton from '@mui/material/IconButton';

const questionTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운'];

const FormBox = ({ id }: { id: FormFieldsState['id'] }) => {
  const formFields = useAppSelector(state => state.formField);
  const dispatch = useAppDispatch();
  const field = formFields.find(field => field.id === id) ?? null;

  const handleFieldLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!field) return;
    dispatch(editFormField({ ...field, label: e.target.value }));
  };

  const handleFieldTypeChange = (value: FormFieldsState['type']) => {
    if (!field) return;
    if (value === '단답형' || value === '장문형') {
      dispatch(editFormField({ ...field, type: value, options: [] }));
    } else {
      const options = field.options?.length ? [...field.options] : [{ id: generateNumberId(), label: '옵션 1' }];
      dispatch(
        editFormField({
          ...field,
          type: value,
          options,
        })
      );
    }
  };
  const duplicateField = () => {
    if (!field) return;
    dispatch(
      addFormField({
        ...field,
        id: generateStringId(),
      })
    );
  };

  const deleteField = () => {
    if (!field) return;
    dispatch(deleteFormField(field.id));
  };
  // const fieldByType = (type: string) => {
  //   switch (type) {
  //     case '단답형':
  //       return <ShortAnswer />;
  //     case '장문형':
  //       return <LongAnswer />;
  //     case '객관식 질문':
  //       return <RadioField options={options} />;
  //     case '체크박스':
  //       return <CheckBox options={options} />;
  //     case '드롭다운':
  //       return <DropDown options={options} value={selectedOption} onChange={handleOptionChange} />;
  //     default:
  //       return <Input variant="filled" inputPadding="16px" sx={{ width: '200px' }} />;
  //   }
  // };

  return (
    <div style={{ border: '1px solid red' }}>
      <Stack direction="row" spacing={2}>
        <Input
          variant="filled"
          inputPadding="16px"
          sx={{ width: '200px' }}
          value={field?.label}
          onChange={handleFieldLabelChange}
        />
        <DropDown
          options={questionTypes}
          value={field?.type || '단답형'}
          onChange={(value: string) => {
            handleFieldTypeChange(value as FormFieldsState['type']);
          }}
        />
      </Stack>
      <div>
        <Question id={id} />
      </div>
      <Stack direction={'row'} spacing={2} justifyContent={'end'} padding={'0px 40px'} alignItems={'center'}>
        <IconButton onClick={duplicateField}>
          <ContentCopyIcon />
        </IconButton>
        <IconButton onClick={deleteField}>
          <DeleteOutlineIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <Stack>
          <FormControlLabel control={<Switch defaultChecked />} label="필수" labelPlacement="start" />
        </Stack>
      </Stack>
    </div>
  );
};

export default FormBox;
