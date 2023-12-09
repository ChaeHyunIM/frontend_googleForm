import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ label = '', options, value, onChange }: DropdownProps) => {
  return (
    <FormControl>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select value={value} onChange={e => onChange(e.target.value as string)}>
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
