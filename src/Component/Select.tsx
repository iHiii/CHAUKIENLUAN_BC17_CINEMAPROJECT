import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CommonSelect } from "../DTO/Global";

interface SelectProps {
  value?: string;
  setValue(value: string): void;
  id: string;
  label: string;
  options: CommonSelect[];
}

export const BasicSelect: React.FC<SelectProps> = ({
  value,
  setValue,
  id,
  label,
  options,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          id={label}
          value={value}
          label={label}
          onChange={handleChange}
          key={label}
        >
          {options.map((item) => (
            <MenuItem value={item.value}>{item.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
