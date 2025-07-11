import { useState, useEffect } from 'react';
import { type SelectOption } from './types';
import Select from './Select';

function App() {
  const options: SelectOption[] = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
    { label: 'Sixth', value: 6 }
  ]
  const [Value, setValue] = useState<SelectOption | null>(null);
  const [mulvalue, setmulValue] = useState<SelectOption[]>([]);
  const [initialize, setInitialize] = useState<boolean>(false);

  useEffect(() => {
    const savedstr = localStorage.getItem("Value") as string;
    const savedarr = localStorage.getItem("mulValue") as string;
    if (savedstr) {
      const savedValue = JSON.parse(savedstr) as SelectOption;
      setValue(savedValue);
    }
    if (savedarr) {
      const savedValues = JSON.parse(savedarr) as SelectOption[];
      setmulValue(savedValues);
    }
    setInitialize(true);
  }, []);

  useEffect(() => {
    if (!initialize) return;
    if (Value) {
      localStorage.setItem("Value", JSON.stringify(Value));
      return;
    }
    localStorage.removeItem("Value");
  }, [Value,initialize]);

  useEffect(() => {
    if (!initialize) return;
    if (mulvalue) {
      localStorage.setItem("mulValue", JSON.stringify(mulvalue));
    }
  }, [mulvalue,initialize]);


  return (
    <div className='p-2 font-mono flex flex-col gap-5 items-center'>
      <h1 className='text-3xl font-bold'>Typescript Custom Select Component</h1>
      <Select options={options} value={Value}
        onChange={(newValue: SelectOption | null) => setValue(newValue)}
      />
      <Select multiple={true} options={options} value={mulvalue}
        onChange={(newValue: SelectOption[]) => setmulValue(newValue)}
      />
    </div>
  )
}

export default App
