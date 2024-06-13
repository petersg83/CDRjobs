type Props = {
  text: string
  onClick: (event: React.MouseEvent) => void
}

const Button = (props: Props) => {
 return  <button className='bg-white px-2 rounded-xl' onClick={props.onClick}>{props.text}</button>
}

export default Button