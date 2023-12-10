import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { answerQuestion, option } from '../../../features/form/formSlice';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Input from '../../Input';
import Dropdown from '../../Dropdown';
import FormGroup from '@mui/material/FormGroup';
import { FormFieldState } from 'features/form/formSlice';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';

export default function PreviewQuestion({ id }: { id: FormFieldState['id'] }) {
  const dispatch = useAppDispatch();
  const formFields = useAppSelector(state => state.formField);
  const formResponse = useAppSelector(state => state.formResponse);
  const field = formFields.find(field => field.id === id) ?? null;
  const [etcValue, setEtcValue] = useState('');

  console.log('formResponse', formResponse);

  const handleAnswerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(answerQuestion({ id: e.target.id, response: e.target.value }));
  };

  const handleRadioQuestion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: option['id']) => {
    const isEtc = e.target.id.includes('_기타');
    if (isEtc) {
      return dispatch(answerQuestion({ id, response: etcValue }));
    }
    return dispatch(answerQuestion({ id, response: e.target.value }));
  };

  const handleCheckBoxQuestion = (e: React.ChangeEvent<HTMLInputElement>, id: option['id']) => {
    let response = formResponse[id] ? (formResponse[id] as string[]) : [];
    const isEtc = e.target.id.includes('_기타');
    if (e.target.checked) {
      response = [...response, isEtc ? etcValue : e.target.value];
    } else {
      response = response.filter(el => el !== (isEtc ? etcValue : e.target.value));
    }
    return dispatch(answerQuestion({ id, response }));
  };

  const handleDropdownQuestion = (value: string, id: string) => {
    dispatch(answerQuestion({ id, response: value }));
  };

  const renderQuestionContent = (field: FormFieldState) => {
    switch (field.type) {
      case '단답형':
      case '장문형':
        return <Input id={field.id} onChange={handleAnswerQuestion} value={formResponse[field.id] ?? ''} />;
      case '객관식 질문':
        return (
          <RadioGroup id={field.id} onChange={e => handleRadioQuestion(e, field.id)}>
            {field.options?.map(option => (
              <FormControlLabel
                key={option.id}
                control={
                  <>
                    <Radio id={option.id} value={option.label} />
                    {option.id.includes('_기타') && (
                      <Input onChange={e => setEtcValue(e.target.value)} value={etcValue} placeholder="기타" />
                    )}
                  </>
                }
                label={option.label}
              />
            ))}
          </RadioGroup>
        );
      case '체크박스':
        return (
          <Stack>
            <FormGroup>
              {field.options?.map(option => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <>
                      <Checkbox
                        id={option.id}
                        value={option.label}
                        onChange={e => handleCheckBoxQuestion(e, field.id)}
                        checked={(formResponse[field.id] ?? []).includes(option.label || etcValue)}
                      />
                      {option.id.includes('_기타') && (
                        <Input onChange={e => setEtcValue(e.target.value)} placeholder="기타" value={etcValue} />
                      )}
                    </>
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </Stack>
        );
      case '드롭다운':
        return (
          <Dropdown
            options={field?.options?.map(el => el.label) ?? []}
            value={(formResponse[field.id] as string) ?? ''}
            onChange={value => handleDropdownQuestion(value, field.id)}
          />
        );
      default:
        return null;
    }
  };
  if (!field) return null;

  return (
    <Stack>
      <div>
        <span>{field.label}</span>
        <span style={{ color: 'red', marginLeft: '2px' }}>{field.isRequired ? '*' : ''}</span>
      </div>
      {renderQuestionContent(field)}
    </Stack>
  );
}
