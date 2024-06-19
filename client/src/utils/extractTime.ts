export function extractTime(dateString: string) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Months are zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number: number) {
    return number.toString().padStart(2, "0");
  }
  