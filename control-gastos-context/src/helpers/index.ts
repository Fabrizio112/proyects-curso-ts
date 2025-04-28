export function formatDate(dateStr:string): string{
    const dateOBj=new Date(dateStr)
    const options : Intl.DateTimeFormatOptions={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    }
    return new Intl.DateTimeFormat("es-ES",options).format(dateOBj)
}