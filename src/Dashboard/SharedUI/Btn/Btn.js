const Btn = ({type, title, className, onClick, style }) => {
    return(
        <button  type={type} style={style} className={className} onClick={onClick}>{title}</button>
    )
}

export default Btn;