import Stack from '@mui/material/Stack';
import Input from '../../Input';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DropDown from '../../Dropdown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Content from './Content';
import { FormFieldState, addFormField, deleteFormField, editFormField } from '../../../features/counter/formSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateNumberId, generateStringId } from '../../../utils/generateId';
import IconButton from '@mui/material/IconButton';

const questionTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운'];

export default function Question({ id }: { id: FormFieldState['id'] }) {
  const formFields = useAppSelector(state => state.formField);
  const dispatch = useAppDispatch();
  const field = formFields.find(field => field.id === id) ?? null;

  const handleFieldLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!field) return;
    dispatch(editFormField({ ...field, label: e.target.value }));
  };

  const handleFieldTypeChange = (value: FormFieldState['type']) => {
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

  const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!field) return;
    dispatch(editFormField({ ...field, isRequired: e.target.checked }));
  };

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
            handleFieldTypeChange(value as FormFieldState['type']);
          }}
        />
      </Stack>
      <div>
        <Content id={id} />
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
          <FormControlLabel
            control={<Switch onChange={handleIsRequiredChange} />}
            label="필수"
            labelPlacement="start"
          />
        </Stack>
      </Stack>
    </div>
  );
}
