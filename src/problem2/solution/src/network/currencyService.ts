export interface Currency {
  code: string;   
  symbol: string; 
  name: string;
  id: string;
}

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const coinsRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
  );
  const coins = await coinsRes.json();

  const supportedRes = await fetch(
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  );
  const supportedCurrencies: string[] = await supportedRes.json();

  const filtered = coins.filter((coin: { symbol: string }) =>
    supportedCurrencies.includes(coin.symbol.toLowerCase())
  );
  console.log('filtered',filtered)

  return filtered.map((coin: { id: string; symbol: string; name: string }) => ({
    id: coin.symbol,
    code: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
  }));
};
