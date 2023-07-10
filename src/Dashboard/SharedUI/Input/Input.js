const Input = ({type, name, value, id, handleChange , Class , onBlur ,error}) => {
    return(
        <input type={type} name={name} value={value} className={Class} id={id} onBlur={onBlur} onChange={handleChange}  error={error}/>
    )
}

export default Input;