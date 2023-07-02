export default function Input({type, name, placeholder, label, inputClasses, onChange, value}){
    return(
        <>
            {
                label ?
                <>
                    <label htmlFor={name}>{label}</label> 
                    <input type={type} name={name} placeholder={placeholder} className={inputClasses} onChange={onChange} value={value}/> 
                </>
                :
                <input className={inputClasses} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value}/> 
            }
            
        </>
        
    )
}