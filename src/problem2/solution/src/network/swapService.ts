export const swapCurrency = async (
  fromCurrency: string, 
  toCurrency: string,   
  amount: number
): Promise<number> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
  );
  const data = await res.json();
  const rate = data[fromCurrency]?.[toCurrency];
  if (!rate) throw new Error("Invalid currency pair or unsupported vs_currency");
  return amount * rate;
};