export const isValidKaspaAddressSyntax = (address: string) =>
  /^kaspa(test)?:[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{61,63}$/.test(address);

export const isValidHashSyntax = (hash: string) => /^[0-9a-fA-F]{64}$/.test(hash);
