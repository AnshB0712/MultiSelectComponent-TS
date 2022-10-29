import { useState } from 'react'
import style from './select.module.css'

export type SelectOption = {
  label: string;
  value: string | number;
}

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption|undefined) => void;
}

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

type Props = {
  options: SelectOption[];
} & (MultipleSelectProps | SingleSelectProps)

export function Select({multiple,value,onChange,options}:Props){
  
  const [open,setOpen]=useState(false)
  
  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }
  
  const selectOption = (option: selectOption) => {
    if(multiple){
      if(value.includes(option)){
        onChange(value.filter(o => o !== option))
      }
      else {onChange([...value,option])}
    }
    else{
    onChange(option)
    }
  }
  
  const isOptionSelected = (option) => 
  {
    return multiple ? value.includes(option) : value === option
  }
  
  return(
  <div 
  onClick={() => setOpen(!open)} 
  className={style.container}>
  <span className={style.value} >
  {multiple ? value.map(option => {
    return (
    <button
    onClick={e => {
      e.stopPropagation()
      selectOption(option)
    }}
    className={style["option-badge"]}
    >
    {option.label}
    <span
    className={style["remove-btn"]}>
    &times;
    </span>
    </button>
    )
  }) : value?.label}
  </span>
  <button 
  onClick ={e => {
  e.stopPropagation()
  clearOptions()
  }} 
  className={style["clear-btn"]}>
  &times;
  </button>
  <div className={style.divider}></div>
  <div className={style.caret}></div>
  
  <ul className={`${style.options} ${open ? style.show:''}`}>
  {options.map(option => (
  <li 
  onClick={(e) => {
  e.stopPropagation()
  selectOption(option)
  setOpen(false)
  }}
  key={option.label} 
  className={`${style.option} ${isOptionSelected(option) ? style.selected:''}`}>
  {option.label}
  </li>
  ))}
  </ul>
  
  </div>
  )
}