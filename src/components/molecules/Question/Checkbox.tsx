import { Checkbox as MUICheckbox, FormGroup, FormControlLabel } from '@mui/material';
import Input from '../../atoms/Input';

interface CheckboxProps {
  options: string[];
}

export default function Checkbox({ options }: CheckboxProps) {
  return (
    <FormGroup>
      {options.map(option => (
        <FormControlLabel
          key={option}
          control={
            <>
              <MUICheckbox />
              <Input />
            </>
          }
          label={''}
        />
      ))}
    </FormGroup>
  );
}
