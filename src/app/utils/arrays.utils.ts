export const getDays = () => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
}

export const getMonths = () => {
  return [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
}

export const getYears = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: currentYear - 1980 + 1 }, (_, i) => 1980 + i);
}

export const getCitizenships = () => {
  return [
    'Unites States', 'Italy', 'Ukraine', 'Germany', 'other'
  ];
}
