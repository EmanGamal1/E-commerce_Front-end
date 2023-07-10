const Buttons = ({className, type, title, onClick}) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            {title}
        </button>
    )
}

export default Buttons;