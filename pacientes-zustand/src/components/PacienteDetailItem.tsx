type PacienteItemDetailProps={
    label:string
    data:string
}

function PacienteItemDetail({label,data}:PacienteItemDetailProps) {
    return ( 
    <p className="font-bold mb-3 text-gray-700 uppercase"> {label} : {""}
            <span className="font-normal normal-case">{data}</span>
    </p> );
}

export default PacienteItemDetail;