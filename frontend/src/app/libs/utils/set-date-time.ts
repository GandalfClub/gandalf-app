export const setDateTime: (date: Date, time: string) => Date = (date: Date, time: string): Date => {
  return new Date(`${date.toDateString()}, ${time}:00`);
};
