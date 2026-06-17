'use client';

import { useState } from 'react';

const PHONE_REGEX = /^\+7\d{10}$/;
const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

export interface FieldState {
  value: string;
  error: string;
}

export function useFormFields() {
  const [name, setNameState] = useState<FieldState>({ value: '', error: '' });
  const [phone, setPhoneState] = useState<FieldState>({ value: '+7', error: '' });

  const handleNameChange = (raw: string) => {
    const filtered = raw.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, '');
    const value = filtered.slice(0, 15);
    const error = value.length > 0 && value.trim().length < 2 ? 'Имя слишком короткое' : '';
    setNameState({ value, error });
  };

  const validateName = (): boolean => {
    if (!name.value.trim()) {
      setNameState(s => ({ ...s, error: 'Введите имя' }));
      return false;
    }
    if (!NAME_REGEX.test(name.value)) {
      setNameState(s => ({ ...s, error: 'Только буквы, пробел и дефис' }));
      return false;
    }
    if (name.value.trim().length < 2) {
      setNameState(s => ({ ...s, error: 'Имя слишком короткое' }));
      return false;
    }
    return true;
  };

  const handlePhoneChange = (raw: string) => {
    if (!raw.startsWith('+7')) raw = '+7';
    const digits = raw.slice(2).replace(/\D/g, '');
    const value = '+7' + digits.slice(0, 10);
    const error = value.length > 2 && !PHONE_REGEX.test(value) ? 'Введите 10 цифр после +7' : '';
    setPhoneState({ value, error });
  };

  const validatePhone = (): boolean => {
    if (!PHONE_REGEX.test(phone.value)) {
      setPhoneState(s => ({ ...s, error: 'Введите корректный номер: +7XXXXXXXXXX' }));
      return false;
    }
    return true;
  };

  const resetFields = () => {
    setNameState({ value: '', error: '' });
    setPhoneState({ value: '+7', error: '' });
  };

  return { name, phone, handleNameChange, handlePhoneChange, validateName, validatePhone, resetFields };
}
