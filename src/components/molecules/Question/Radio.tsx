import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '../../atoms/Input';

export default function RadioField({ options }: { options: string[] }) {
  return (
    <FormControl>
      <RadioGroup aria-labelledby="field-radio-buttons-group-label" defaultValue="옵션" name="radio-buttons-group">
        {options.map(option => {
          return (
            <FormControlLabel
              value={option}
              control={
                <>
                  <Radio />
                  <Input />
                </>
              }
              label={''}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
