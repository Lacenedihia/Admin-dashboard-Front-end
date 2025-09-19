function getDateAndTime(dateString) {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = date.getUTCFullYear();
    // const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    let str = "th";
    if (day === "1" || day === "21" || day === "31") {
        str = "st";
    }
    if (day === "2" || day === "22") {
        str = "nd";
    }
    // const formattedDateTime = `${year}-${month}-${day}, ${parseInt(hours) + 1}:${minutes}:${seconds}`;
    const formattedDateTime = `${month} ${day + str}, ${year} at ${parseInt(hours) + 1}:${minutes}:${seconds}`;
    return formattedDateTime;
}
export default getDateAndTime;
