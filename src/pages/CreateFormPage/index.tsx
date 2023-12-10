import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addFormField, reorderFormField } from '../../features/form/formSlice';
import FormTitle from '../../components/FormTitle';
import Button from '@mui/material/Button';
import { generateStringId } from '../../utils/generateId';
import Question from '../../components/Question/Create';
import Drag from '../../components/Drag';
import Drop from '../../components/Drop';
import { useNavigate } from 'react-router-dom';

export default function CreateFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formFields = useAppSelector(state => state.formField);
  const formFieldAddHandler = () => {
    dispatch(
      addFormField({
        id: generateStringId(),
        type: '단답형',
        label: '',
        isRequired: false,
      })
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const {
      source: { index: startIndex },
      destination: { index: endIndex },
    } = result;
    dispatch(reorderFormField({ startIndex, endIndex }));
  };

  return (
    <div>
      <FormTitle />
      <Drop onDragEnd={handleDragEnd}>
        {formFields.map((formField, index) => (
          <Drag id={formField.id} key={formField.id} index={index}>
            <Question key={formField.id} id={formField.id} />
          </Drag>
        ))}
      </Drop>
      <Button onClick={formFieldAddHandler}>필드추가</Button>
      <Button
        onClick={() => {
          navigate('/preview');
        }}
      >
        미리보기
      </Button>
    </div>
  );
}
