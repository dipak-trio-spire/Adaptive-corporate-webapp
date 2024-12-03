export function formatContract(contractString) {
    if (!contractString || contractString === '-') return null;

    // Adjusted regex pattern to match your contract string format
    const regex = /^([A-Z]+)(20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(P|C|put|call)([0-9]+(?:\.[0-9]+)?)$/;

    const match = contractString.match(regex);
    if (!match) return null;

    const [_, ticker, year, month, day, optionType, price] = match;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonth = monthNames[parseInt(month, 10) - 1];
    const formattedDay = parseInt(day, 10);
    const formattedDate = `${formattedMonth.toUpperCase()} ${formattedDay} ${year}`;

    const formattedOptionType = optionType === 'P' || 'put' ? 'PUT' : 'CALL';

    return `${ticker} ${formattedDate} $${price} ${formattedOptionType}`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const formattedDay = day;
    const formattedMonth = monthNames[monthIndex];
    
    return `${formattedMonth.toUpperCase()} ${formattedDay} ${year}`;
}

