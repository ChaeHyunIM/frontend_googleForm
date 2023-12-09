import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Input from '../Input';
import { useState } from 'react';

export default function FormTitle() {
  const [title, setTitle] = useState('제목 없는 설문지');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div
      css={{
        position: 'relative',
        padding: '22px 0 24px 0',
        borderRadius: '8px',
        border: '1px solid rgb(218, 220, 224)',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '10px',
          position: 'absolute',
          top: '1px',
          backgroundColor: 'rgb(103, 58, 183)',
        }}
      >
        {' '}
      </div>
      <Stack spacing={1}>
        <Input inputSize="big" value={title} onChange={handleTitleChange} />
        <Input placeholder="설문지 설명" value={description} onChange={handleDescriptionChange} />
      </Stack>
    </div>
  );
}
