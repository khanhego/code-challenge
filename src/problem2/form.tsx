import React, { useState } from "react";

interface CurrencyOption {
  label: string;
  value: string;
}

const currencies: CurrencyOption[] = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "GBP - British Pound", value: "GBP" },
];

const CurrencySwapForm: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>("");

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return alert("Enter an amount to swap.");
    alert(`Swapping ${amount} ${fromCurrency} to ${toCurrency}`);
    // Here you'd call your API to perform swap
  };

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <form
      onSubmit={handleSwap}
      className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Currency Swap</h2>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      {/* From Currency */}
      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Switch Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSwitch}
          className="text-sm text-blue-600 underline"
        >
          ⇄ Switch
        </button>
      </div>

      {/* To Currency */}
      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Swap
      </button>
    </form>
  );
};

export default CurrencySwapForm;