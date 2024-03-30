import { getTotalHour } from "./time";

export function getTotalAmount(rate: string, time: string) {
  const timeInNumber = getTotalHour(time);

  const rateInNumber = parseInt(rate.replace(/[,円]/g, ""));

  const total = rateInNumber * timeInNumber;

  return {
    rate: rateInNumber,
    time: parseFloat(timeInNumber.toFixed(2)),
    total,
  };
}
