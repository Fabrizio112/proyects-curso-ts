type AmountDisplayProps={
    label?:string
    amount:number
}

function AmountDisplay({label,amount}:AmountDisplayProps) {
    return ( 
    <>
    <p className="text-blue-700 text-2xl">{label} <span className="text-black font-bold text-2xl "> ${amount}</span></p>
    </> );
}

export default AmountDisplay;