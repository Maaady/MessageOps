import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean; formatted: string } => {
  try {
    const number = phoneUtil.parse(phoneNumber, 'US');
    const isValid = phoneUtil.isValidNumber(number);
    const formatted = isValid ? phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL) : phoneNumber;
    return { isValid, formatted };
  } catch (error) {
    return { isValid: false, formatted: phoneNumber };
  }
};