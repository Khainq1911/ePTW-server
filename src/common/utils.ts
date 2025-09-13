
import 'dotenv/config';

export const generateCodeTelegram = (start: string = 'eptw') =>
  start + Math.floor(Math.random() * 1000000);

