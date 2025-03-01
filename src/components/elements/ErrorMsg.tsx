export default function ErrorMsg({errorMsg, className}: {errorMsg: string, className?: string}) {
    return (
        <div className={`error-msg ${className}`}>
            <p>{errorMsg}</p>
        </div>
    )
}