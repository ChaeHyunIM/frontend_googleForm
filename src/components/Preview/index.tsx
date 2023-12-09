import FormControlLabel from '@mui/material/FormControlLabel';
import { useAppSelector } from '../../app/hooks';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Input from '../Input';
import Dropdown from '../Dropdown';
import FormGroup from '@mui/material/FormGroup';
import { FormFieldsState } from 'features/counter/formSlice';

export default function Preview() {
  const formFields = useAppSelector(state => state.formField);
  console.log('formFields', formFields);
  const renderQuestionContent = (field: FormFieldsState) => {
    switch (field.type) {
      case '단답형':
      case '장문형':
        return <Input />;
      case '객관식 질문':
      case '체크박스':
        return (
          <Stack>
            {field.options?.map(option => (
              <FormControlLabel
                key={option.id}
                control={
                  <>
                    {field?.type === '객관식 질문' && <Radio />}
                    {field?.type === '체크박스' && <Checkbox />}
                  </>
                }
                label={option.label}
              />
            ))}
          </Stack>
        );
      case '드롭다운':
        return <Dropdown options={field?.options?.map(el => el.label) ?? []} />;
      default:
        return null;
    }
  };

  return (
    <FormGroup>
      <Stack spacing={4}>
        {formFields.map(field => {
          return (
            <Stack>
              {field.label}
              {renderQuestionContent(field)}
            </Stack>
          );
        })}
      </Stack>
    </FormGroup>
  );
}
