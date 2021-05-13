import React from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  },
    [value, delay]
  );
  return debouncedValue;
};

interface VisibleProps {
  value: boolean;
  onChange: (b: boolean) => void;
  onClick: () => void;
}

export const useSwitch = (initialState: boolean = false): VisibleProps => {
  const [visible, setVisible] = React.useState(initialState);
  const onChange = (b: boolean = !visible) => { setVisible(b); };
  const onClick = () => { setVisible(!visible); };
  return {
      value: visible,
      onChange: onChange,
      onClick: onClick
  };
};

export const usePrevious = <T extends {}>(value?: T) => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
      ref.current = value;
  });
  return ref.current;
};