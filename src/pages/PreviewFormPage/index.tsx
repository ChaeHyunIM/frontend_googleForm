import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { initializeResponse } from '../../features/form/formSlice';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TitleBox from '../../components/FormTitle/TitleBox';
import PreviewQuestion from '../../components/Question/Preview';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function PreviewFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formFields = useAppSelector(state => state.formField);
  const formHeader = useAppSelector(state => state.formHeader);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item sm={10} md={6}>
        <TitleBox>
          <Stack spacing={1} sx={{ px: '20px' }}>
            <Typography sx={{ fontSize: '36px', fontWeight: 500 }}>{formHeader.title}</Typography>
            {formHeader.description && <Typography sx={{ fontSize: '16px' }}>{formHeader.description}</Typography>}
            <Typography sx={{ color: 'red' }}>* 표시는 필수 질문임</Typography>
          </Stack>
        </TitleBox>
        <Stack spacing={4}>
          {formFields.map(field => {
            return <PreviewQuestion id={field.id} key={field.id} />;
          })}
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: '24px' }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/result');
            }}
          >
            제출
          </Button>
          <Button variant="outlined" onClick={() => dispatch(initializeResponse())}>
            양식 지우기
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
