import Stack from '@mui/material/Stack';
import Input from '../atoms/Input';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DropDown from '../atoms/Dropdown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import ShortAnswer from '../molecules/Question/ShortAnswer';
import LongAnswer from '../molecules/Question/LongAnswer';
import RadioField from '../molecules/Question/Radio';
import CheckBox from '../molecules/Question/Checkbox';
import Question from '../molecules/Question';

const FormBox = () => {
  const options = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운'];
  const [selectedOption, setSelectedOption] = useState('단답형');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  const fieldByType = (type: string) => {
    switch (type) {
      case '단답형':
        return <ShortAnswer />;
      case '장문형':
        return <LongAnswer />;
      case '객관식 질문':
        return <RadioField options={options} />;
      case '체크박스':
        return <CheckBox options={options} />;
      case '드롭다운':
        return <DropDown options={options} value={selectedOption} onChange={handleOptionChange} />;
      default:
        return <Input variant="filled" inputPadding="16px" sx={{ width: '200px' }} />;
    }
  };

  return (
    <div style={{ border: '1px solid red' }}>
      <Stack direction="row" spacing={2}>
        <Input variant="filled" inputPadding="16px" sx={{ width: '200px' }} />
        <DropDown options={options} value={selectedOption} onChange={handleOptionChange} />
      </Stack>
      <div>
        <Question type={selectedOption} options={options} />
      </div>
      <Stack direction={'row'} spacing={2} justifyContent={'end'} padding={'0px 40px'} alignItems={'center'}>
        <ContentCopyIcon />
        <DeleteOutlineIcon />
        <Divider orientation="vertical" flexItem />
        <Stack>
          <FormControlLabel control={<Switch defaultChecked />} label="필수" labelPlacement="start" />
        </Stack>
      </Stack>
    </div>
  );
};

export default FormBox;
