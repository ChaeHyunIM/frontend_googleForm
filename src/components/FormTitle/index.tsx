import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Input from '../Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editFormHeader } from '../../features/form/formSlice';
import TitleBox from './TitleBox';

export default function FormTitle() {
  const dispatch = useAppDispatch();
  const formHeader = useAppSelector(state => state.formHeader);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editFormHeader({ ...formHeader, title: e.target.value }));
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editFormHeader({
        title: formHeader.title,
        description: e.target.value,
      })
    );
  };

  return (
    <TitleBox>
      <Stack spacing={1} sx={{ px: '20px' }}>
        <Input inputSize="big" value={formHeader.title} onChange={handleTitleChange} />
        <Input placeholder="설문지 설명" value={formHeader.description} onChange={handleDescriptionChange} />
      </Stack>
    </TitleBox>
  );
}
