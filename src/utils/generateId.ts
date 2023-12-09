export function generateStringId(prefix = '', length = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomChars = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]);
  const randomId = prefix + randomChars.join('');
  return randomId;
}

export function generateNumberId(prefix = '', length = 10): string {
  const characters = '0123456789';
  const randomChars = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]);
  const randomId = prefix + randomChars.join('');
  return String(randomId);
}
