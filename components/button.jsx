export default function Button({children, buttonStyles, ...props}) {
    return (
        <button className={buttonStyles} {...props}>{children}</button>
    )
}