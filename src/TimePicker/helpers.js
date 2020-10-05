export const isValidTime = (value = '') => {
  const [hour, minute] = value.split(':').map(item => item.trim());

  return (hour && hour >= 0 && hour <= 24) && (minute && minute >= 0 && minute <= 60);
};
