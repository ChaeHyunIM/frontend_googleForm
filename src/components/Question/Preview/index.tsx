import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { answerQuestion } from '../../../features/counter/formSlice';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Input from '../../Input';
import Dropdown from '../../Dropdown';
import FormGroup from '@mui/material/FormGroup';
import { FormFieldState } from 'features/counter/formSlice';
import RadioGroup from '@mui/material/RadioGroup';

export default function PreviewQuestion({ id }: { id: FormFieldState['id'] }) {
  const dispatch = useAppDispatch();
  const formFields = useAppSelector(state => state.formField);
  const formResponse = useAppSelector(state => state.formResponse);
  const field = formFields.find(field => field.id === id) ?? null;

  const handleAnswerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(answerQuestion({ id: e.target.id, response: e.target.value }));
  };

  const handleRadioQuestion = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch(answerQuestion({ id, response: e.target.value }));
  };

  const handleCheckBoxQuestion = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let response = formResponse[id] ? (formResponse[id] as string[]) : [];
    if (e.target.checked) {
      response = [...response, e.target.value];
    } else {
      response = response.filter(el => el !== e.target.value);
    }
    dispatch(answerQuestion({ id, response }));
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
                  <Radio
                    id={option.id}
                    value={option.label}
                    checked={(formResponse[field.id] ?? []).includes(option.label)}
                  />
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
                    <Checkbox
                      id={option.id}
                      value={option.label}
                      onChange={e => handleCheckBoxQuestion(e, field.id)}
                      checked={(formResponse[field.id] ?? []).includes(option.label)}
                    />
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
      {field.label}
      {renderQuestionContent(field)}
    </Stack>
  );
}
