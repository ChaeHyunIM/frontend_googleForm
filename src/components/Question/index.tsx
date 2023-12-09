import Input from '../Input';
import { Checkbox, Radio, FormGroup, FormControlLabel, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormFieldsState, editFormField } from '../../features/counter/formSlice';
import { generateNumberId } from '../../utils/generateId';

export default function Question({ id }: { id: FormFieldsState['id'] }) {
  const formFields = useAppSelector(state => state.formField);
  const field = formFields.find(field => field.id === id) ?? null;
  const dispatch = useAppDispatch();

  const handleOptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field) {
      const updatedOptions = field.options?.map(option => {
        if (option.id === e.target.id) {
          return { ...option, label: e.target.value };
        }
        return option;
      });

      dispatch(editFormField({ ...field, options: updatedOptions }));
    }
  };

  const handleAddOption = () => {
    if (field && field.options) {
      dispatch(
        editFormField({
          ...field,
          options: [...field.options, { id: generateNumberId(), label: `옵션 ${field.options.length + 1}` }],
        })
      );
    }
  };

  const handleDeleteOption = (id: string) => {
    if (field && field.options) {
      dispatch(editFormField({ ...field, options: field.options.filter(option => option.id !== id) }));
    }
  };

  switch (field?.type) {
    case '단답형':
    case '장문형':
      return <Input inputProps={{ readOnly: true }} placeholder={`${field?.type} 텍스트`} />;
    case '객관식 질문':
    case '체크박스':
    case '드롭다운':
      return (
        <FormGroup>
          {field?.options?.map((option, index) => (
            <FormControlLabel
              key={option.id}
              control={
                <>
                  {field?.type === '객관식 질문' && <Radio />}
                  {field?.type === '체크박스' && <Checkbox />}
                  {field?.type === '드롭다운' && <div>{index}</div>}
                  <Input id={option.id} value={option.label} onChange={handleOptionInputChange} />
                  <ClearIcon onClick={() => handleDeleteOption(option.id)} />
                </>
              }
              label={''}
            />
          ))}
          <Button sx={{ width: '200px', height: '40px' }} onClick={handleAddOption}>
            옵션추가
          </Button>
        </FormGroup>
      );
    default:
      return null;
  }
}
