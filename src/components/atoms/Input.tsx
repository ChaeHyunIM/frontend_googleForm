import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useId } from 'react';

type InputProps = TextFieldProps & {
  inputSize?: 'big' | 'small';
  inputPadding?: string | number;
};

export default function Input({
  inputSize = 'small',
  inputPadding = '4px',
  variant = 'standard',
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = props?.id ?? generatedId;

  return (
    <FormControl>
      <TextField
        id={id}
        inputProps={{
          style: {
            padding: inputPadding,
            fontSize: inputSize === 'big' ? '32px' : '14px',
            ...props?.inputProps?.style,
          },
          ...props.inputProps,
        }}
        variant={variant}
        {...props}
      />
    </FormControl>
  );
}
