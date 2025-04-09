type PropinaProps={
    setPropina:React.Dispatch<React.SetStateAction<number>>
}
function Propinas({setPropina}:PropinaProps) {
    return ( 
    <form className="mt-4">
        <h3 className="text-2xl font-black">Propina:</h3>
        <div>
                <label htmlFor="10">10% </label>
                <input className="cursor-pointer" type="radio" id="10" name="tip" value=".10" onChange={(e)=>setPropina(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="20">20% </label>
                <input className="cursor-pointer" type="radio" id="20" name="tip" value=".20" onChange={(e)=>setPropina(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="50">50% </label>
                <input className="cursor-pointer" type="radio" id="50" name="tip" value=".50"onChange={(e)=>setPropina(+e.target.value)} />
              </div>
    </form> );
}

export default Propinas;