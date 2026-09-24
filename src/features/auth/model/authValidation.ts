export interface AuthFormErrors {
  email?: string;
  password?: string;
}

const emailError = 'Введите корректный email';
const passwordError = 'Пароль должен содержать не менее 8 символов, буквы и цифры';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return emailError;
  return emailRegex.test(email.trim()) ? null : emailError; 
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) return passwordError;
  return passwordRegex.test(password.trim()) ? null : passwordError; 
};

export const validateAuthForm = (email: string, password: string): AuthFormErrors => {
  const errors: AuthFormErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
};