import Input from '../../Input';
import { Checkbox, Radio, FormGroup, FormControlLabel, Button, Stack, RadioGroup } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { FormFieldState, editFormField } from '../../../features/form/formSlice';
import { generateNumberId } from '../../../utils/generateId';
import Drag from '../../Drag';
import Drop from '../../Drop';

export default function Content({ id }: { id: FormFieldState['id'] }) {
  const formFields = useAppSelector(state => state.formField);
  const field = formFields.find(field => field.id === id) ?? null;
  const isEtcOptionExist = field?.options?.some(option => option.id.includes('_기타'));
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
  const handleAddETCOption = () => {
    if (field && field.options) {
      dispatch(
        editFormField({
          ...field,
          options: [...field.options, { id: `${generateNumberId()}_기타`, label: '' }],
        })
      );
    }
  };

  const handleDeleteOption = (id: string) => {
    if (field && field.options) {
      dispatch(editFormField({ ...field, options: field.options.filter(option => option.id !== id), id: field.id }));
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(field?.options ?? []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    if (field) {
      dispatch(editFormField({ ...field, options: items }));
    }
  };

  const Control = ({ type, index }: { type: FormFieldState['type']; index: number }) => {
    if (type === '객관식 질문') return <Radio checked={false} />;
    if (type === '체크박스') return <Checkbox checked={false} />;
    if (type === '드롭다운') return <div>{`${index}.`}</div>;
    return null;
  };

  const OptionsGroup = ({
    type,
    options,
    handleDragEnd,
    handleOptionInputChange,
    handleDeleteOption,
  }: {
    type: FormFieldState['type'];
    options: FormFieldState['options'];
    handleDragEnd: (result: any) => void;
    handleOptionInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteOption: (id: string) => void;
  }) => {
    return (
      <Drop onDragEnd={handleDragEnd}>
        <FormGroup>
          {options?.map((option, index) => (
            <Drag id={option.id} index={index} key={option.id}>
              <FormControlLabel
                key={option.id}
                control={
                  <>
                    <Control type={type} index={index} />
                    {option.id.includes('_기타') ? (
                      <Input id={option.id} value={'기타...'} placeholder={'기타...'} />
                    ) : (
                      <Input id={option.id} value={option.label} onChange={handleOptionInputChange} />
                    )}
                    <ClearIcon onClick={() => handleDeleteOption(option.id)} />
                  </>
                }
                label={''}
              />
            </Drag>
          ))}
        </FormGroup>
        <Stack direction={'row'} gap="10px" sx={{ mt: '20px' }}>
          <Button variant="contained" sx={{ height: '40px' }} onClick={handleAddOption}>
            옵션추가
          </Button>
          {!isEtcOptionExist && (type === '체크박스' || type === '객관식 질문') && (
            <Button variant="outlined" sx={{ height: '40px' }} onClick={handleAddETCOption}>
              기타옵션추가
            </Button>
          )}
        </Stack>
      </Drop>
    );
  };

  // switch 문에서
  switch (field?.type) {
    case '단답형':
    case '장문형':
      return <Input inputProps={{ readOnly: true }} placeholder={`${field?.type} 텍스트`} />;
    case '객관식 질문':
    case '체크박스':
    case '드롭다운':
      return (
        <OptionsGroup
          type={field?.type}
          options={field?.options}
          handleDragEnd={handleDragEnd}
          handleOptionInputChange={handleOptionInputChange}
          handleDeleteOption={handleDeleteOption}
        />
      );
    default:
      return null;
  }
}
