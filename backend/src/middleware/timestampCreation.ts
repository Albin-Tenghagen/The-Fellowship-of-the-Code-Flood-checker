export function timestampCreation() {
  const swedenTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  // Format: "YYYY-MM-DD HH:mm:ss"
  const formattedTime = swedenTime.replace(",", "");
  return formattedTime;
}
