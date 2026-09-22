interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  label?: string;
  disabled?: boolean;
}

export function CustomSwitch({ checked, onChange, id, label, disabled }: CustomSwitchProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center whitespace-nowrap p-2 pr-3 opacity-70 hover:opacity-100"
    >
      <input
        onChange={event => onChange(event.target.checked)}
        className="chk"
        type="checkbox"
        checked={checked}
        id={id}
        disabled={disabled}
      />
      <span className="switch">
        <span className="slider" />
      </span>
      {label && <span className="pl-1 text-xs align-middle">{label}</span>}
    </label>
  );
}
