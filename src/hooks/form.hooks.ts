import { ChangeEvent, useState } from 'react';

export function useInput(initialValue = '', callback?: Function) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    callback && callback(e.target.value); // invoke callback if provided
  };
  return { onChange, value };
}

export function useDynamicInput(initialValue = '', callback?: Function) {
  const [value, setValue] = useState(initialValue);
  // can be called dynamically, like: onChange('Hi')
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
    const newValue = typeof e === 'string' ? e : e.target.value;
    setValue(newValue);
    callback && callback(newValue); // invoke callback if provided
  };
  return { onChange, value };
}

export function useCheckbox(initialValue = false, callback?: Function) {
  const [checked, setChecked] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    callback && callback(e.target.checked); // invoke callback if provided
  };
  return { onChange, checked };
}
