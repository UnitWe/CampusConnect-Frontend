export default function Input({type, name, placeholder, label, inputStyles, onChange, value, ...props}){
    return(
        <>
            {
                label ?
                <>
                    <label htmlFor={name}>{label}</label> 
                    <input type={type} name={name} placeholder={placeholder} className={inputStyles} onChange={onChange} value={value} {...props}/> 
                </>
                :
                <input className={inputStyles} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} {...props}/> 
            }
            
        </>
        
    )
}