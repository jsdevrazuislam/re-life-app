const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return 'Email is required';
  if (!emailRegex.test(value)) return 'Enter a valid email';
  return null;
};

const validateName = (value: string) => {
  if (!value) return 'Majid Name is required';
  if (value.length < 5) return 'Majid Name must be at least 5 characters';
  return null;
};
const validateUsername = (value: string) => {
  if (!value) return 'Username is required';
  if (value.length < 3) return 'Username must be at least 3 characters';
  return null;
};
const validatePassword = (value: string) => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return null;
};
const validateCheckbox = (value: boolean) => {
    if (!value) return 'You must accept the terms and conditions';
    return null;
  };
const validatePinCode = (value: string) => {
  if (!value) return 'Pincode is required';
  if (value.length < 3) return 'Pincode must be at least 3 characters';
  return null;
  };


export {
    validateEmail,
    validatePassword,
    validateName,
    validateUsername,
    validateCheckbox,
    validatePinCode
}