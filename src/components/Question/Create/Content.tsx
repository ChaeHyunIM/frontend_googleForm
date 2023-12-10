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

  switch (field?.type) {
    case '단답형':
    case '장문형':
      return <Input inputProps={{ readOnly: true }} placeholder={`${field?.type} 텍스트`} />;
    case '객관식 질문':
      return (
        <Drop onDragEnd={handleDragEnd}>
          <RadioGroup>
            {field?.options?.map((option, index) => (
              <Drag id={option.id} index={index} key={option.id}>
                <FormControlLabel
                  key={option.id}
                  control={
                    <>
                      {field?.type === '객관식 질문' && <Radio checked={false} />}
                      {option.id.includes('_기타') ? (
                        <Input id={option.id} value={''} inputProps={{ readOnly: true }} placeholder={'기타...'} />
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
          </RadioGroup>
          <Button sx={{ width: '200px', height: '40px' }} onClick={handleAddOption}>
            옵션추가
          </Button>
          {!isEtcOptionExist && (
            <Button sx={{ width: '200px', height: '40px' }} onClick={handleAddETCOption}>
              기타옵션추가
            </Button>
          )}
        </Drop>
      );
    case '체크박스':
    case '드롭다운':
      return (
        <Drop onDragEnd={handleDragEnd}>
          <FormGroup>
            {field?.options?.map((option, index) => {
              return (
                <Drag id={option.id} index={index} key={option.id}>
                  <FormControlLabel
                    key={option.id}
                    control={
                      <>
                        {field?.type === '체크박스' && <Checkbox checked={false} />}
                        {field?.type === '드롭다운' && <div>{index}</div>}
                        {field?.type === '체크박스' && option.id.includes('_기타') ? (
                          <Input id={option.id} value={''} inputProps={{ readOnly: true }} placeholder={'기타...'} />
                        ) : (
                          <Input id={option.id} value={option.label} onChange={handleOptionInputChange} />
                        )}
                        <ClearIcon onClick={() => handleDeleteOption(option.id)} />
                      </>
                    }
                    label={''}
                  />
                </Drag>
              );
            })}
          </FormGroup>
          <Button sx={{ width: '200px', height: '40px' }} onClick={handleAddOption}>
            옵션추가
          </Button>
          {!isEtcOptionExist && field?.type === '체크박스' && (
            <Button sx={{ width: '200px', height: '40px' }} onClick={handleAddETCOption}>
              기타옵션추가
            </Button>
          )}
        </Drop>
      );
    default:
      return null;
  }
}
