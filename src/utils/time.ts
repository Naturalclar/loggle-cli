export function getTotalHour(time: string) {
  const [hour, minute] = time.split(":");
  return parseInt(hour) + parseInt(minute) / 60;
}
