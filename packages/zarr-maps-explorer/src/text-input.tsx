import type { ChangeEvent } from 'react';

interface TextInputProps {
  id: string;
  label?: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function TextInput({
  id,
  label,
  value,
  name,
  onChange,
  placeholder,
  className = '',
  type = 'text'
}: TextInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="mb-1 block text-sm text-white">{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b border-white bg-transparent text-white placeholder-gray-300 transition duration-200 focus:border-yellow-400 focus:outline-none"
      />
    </div>
  );
}
