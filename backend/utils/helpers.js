exports.formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

exports.isOverdue = (deadline) => {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
};

exports.calculateProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const completed = tasks.filter(t => t.status === 'done').length;
  return Math.round((completed / tasks.length) * 100);
};

exports.validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};