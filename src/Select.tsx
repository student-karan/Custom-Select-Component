import { useEffect, useRef, useState } from 'react';
import { type SelectProps, type SelectOption } from './types';

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
    const [IsArrowOpen, setIsArrowOpen] = useState<boolean>(false);
    const containerref = useRef<HTMLDivElement>(null);
    const height = containerref.current?.getBoundingClientRect().height as number;

    function handleChange(option: SelectOption) {
        if (multiple) {
            if (value.some(val => val.value === option.value)) {
                onChange(value.filter(val => val.value !== option.value));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) {
                onChange(option);
            }
        }
        setIsArrowOpen(false);
    }

    useEffect(()=>{
        function handler(e:MouseEvent){
            if(containerref.current && !containerref.current.contains(e.target as Node)){
                setIsArrowOpen(false);
            }
        }
        document.addEventListener("click",handler);
        return function(){
            document.removeEventListener("click",handler);
        }
    },[setIsArrowOpen])

    return (
        <div ref={containerref} className='Container'>
            <p className='mb-3 text-xl  md:text-2xl '>{multiple ? "Multi Select" : "Single Select"}</p>
            <div className='main_box'>

                {multiple ?
                    value?.map(val =>
                        <button onClick={() => handleChange(val)}  className='selected_button'>
                            <p className='text-black'>{val.label}</p>
                            <i className='fa-solid fa-xmark'></i>
                        </button>
                    )
                    : <p className='mx-1'>{value?.label}</p>}

                <div className='flex items-center h-full  w-fit absolute right-2 gap-2'>
                    <i onClick={() => multiple ? onChange([]) : onChange(null)} className="fa-solid fa-xmark x_mark"></i>
                    <div className='bg-gray-700 h-8 w-[2px]'></div>
                    <i onClick={() => setIsArrowOpen(arrow => !arrow)} tabIndex={0} 
                    className={`fa-solid fa-caret-down caret ${IsArrowOpen ? "rotate-180" : "rotate-0"} `}>
                    </i>
                </div>
            </div>
            <ul className={`List ${IsArrowOpen ? "block" : "hidden"}`} style={{top:height}}>
                {options.map((option: SelectOption) => {
                    return (
                        <li onClick={() => handleChange(option)} className={`list_item 
                            ${multiple ? value.some(val => val.value === option.value) && "list_item_hover" : option.value == value?.value && "list_item_hover" }`} key={option.value}>{option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Select