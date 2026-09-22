import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { allColorScales, type ColorMapName } from 'zarr-maps-colormap';

interface ColormapSelectProps {
  value: ColorMapName;
  onChange: (value: ColorMapName) => void;
  id?: string;
}

export function ColormapSelect({ value, onChange, id }: ColormapSelectProps) {
  return (
    <FormControl fullWidth size="small">
      <Select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value as ColorMapName)}
        className="clickable"
        sx={{
          height: 38,
          borderRadius: '8px',
          color: '#f1f1f1',
          backgroundColor: 'rgba(10, 10, 10, 0.45)',
          fontSize: '11px',
          fontWeight: 650,
          '.MuiSelect-select': { padding: '8px 12px' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.18)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212,149,17,.65)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d49511' },
          '.MuiSvgIcon-root': { color: '#aaa' }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.5,
              maxHeight: 300,
              border: '1px solid rgba(255,255,255,.18)',
              borderRadius: '10px',
              color: '#f1f1f1',
              backgroundColor: 'rgba(24,24,24,.98)',
              backgroundImage: 'none',
              boxShadow: '0 18px 45px rgba(0,0,0,.45)',
              '& .MuiMenuItem-root': { minHeight: 34, fontSize: '11px' },
              '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(255,255,255,.07)' },
              '& .Mui-selected': {
                color: '#efc35f',
                backgroundColor: 'rgba(212,149,17,.16) !important'
              }
            }
          }
        }}
      >
        {allColorScales.map(colormap => (
          <MenuItem key={colormap} value={colormap}>
            {colormap.charAt(0).toUpperCase() + colormap.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
