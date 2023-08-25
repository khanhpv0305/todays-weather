import { ChangeEventHandler } from 'react'

type InputProps = {
  name: string
  placeholder: string
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}


const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <input
      className='outline-none h-10 bg-white/[.1] px-3 mr-2 rounded-full placeholder:text-white/[.6] w-24 grow'
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Input
