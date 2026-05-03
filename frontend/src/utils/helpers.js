export const isOverdue = (date) => {
  return new Date(date) < new Date();
};