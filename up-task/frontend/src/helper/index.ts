export function formatDate(isoString: string) {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return formatter.format(date)
}

export const statusTranslations: { [key: string]: string } = {
    pending: "Pendiente",
    onHold: "En Espera",
    inProgress: "En Proceso",
    underReview: "En Revision",
    completed: "Completado"
}