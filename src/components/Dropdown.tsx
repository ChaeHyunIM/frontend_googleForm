import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown = ({ label = '', options, value, onChange, placeholder = '선택하세요' }: DropdownProps) => {
  console.log('value', value);

  return (
    <FormControl>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select
        displayEmpty
        value={value}
        onChange={e => onChange(e.target.value as string)}
        renderValue={selected => {
          console.log('selected', selected);
          if (!selected || selected.length === 0 || !value) {
            return <em>{placeholder}</em>;
          }
          return selected;
        }}
      >
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
