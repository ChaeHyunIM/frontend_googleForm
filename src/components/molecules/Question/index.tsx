import Input from '../../atoms/Input';
import { Checkbox, Radio, FormGroup, FormControlLabel } from '@mui/material';

export default function Question({ type, options }: { type: string; options: string[] }) {
  switch (type) {
    case '단답형':
    case '장문형':
      return <Input inputProps={{ readOnly: true }} placeholder={`${type} 텍스트`} />;
    case '객관식 질문':
    case '체크박스':
    case '드롭다운':
      return (
        <FormGroup>
          {options.map((option, index) => (
            <FormControlLabel
              key={option}
              control={
                <>
                  {type === '객관식 질문' && <Radio />}
                  {type === '체크박스' && <Checkbox />}
                  {type === '드롭다운' && <div>{index}</div>}
                  <Input />
                </>
              }
              label={''}
            />
          ))}
        </FormGroup>
      );
  }
}
