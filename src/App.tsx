import { Select,SelectOption } from './Select'
import { useState } from 'react'

const options = [
  {label:"One",value:1},
  {label:"Two",value:2},
  {label:"Three",value:3},
  {label:"Four",value:4},
]

function App() {
  
  const [value1,setValue1] = useState<SelectOption[]>([options[0]])
  
  const [value2,setValue2] = useState<SelectOption | undefined>(options[0])
  
  return (
    <>
    <Select 
    multiple
    value={value1} 
    options={options}
    onChange={v=>setValue1(v)}
    />
    <br />
    <Select 
    value={value2} 
    options={options}
    onChange={v=>setValue2(v)}
    />
    </>
  )
}

export default App
