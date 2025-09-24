export function formatDate(date){
    return new Date(date).toLocaleDateString("en-IL" , {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}