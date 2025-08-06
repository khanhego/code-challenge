import React, { useEffect, useState } from "react";
import "./CurrencySwapForm.css";
import CurrencyDropdown from "./CurrencyDropdown";
import { fetchCurrencies } from "../network/currencyService";
import { swapCurrency } from "../network/swapService";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

const CurrencySwapForm: React.FC = () => {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [debouncedAmount] = useDebounce(sendAmount, 1000);

  const { data: currencies = [], isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (currencies.length > 0 && !fromCurrency && !toCurrency) {
      setFromCurrency(currencies[0].code);
      setToCurrency(currencies[1].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);
  // real solution call api every debounce text change, but there is free api, if using this, it will cause to many request 
  //   useEffect(() => {
  //     if (!debouncedAmount || isNaN(Number(debouncedAmount))) return;
  //     swapCurrency(fromCurrency, toCurrency, Number(debouncedAmount))
  //       .then((result) => setReceiveAmount(result.toFixed(8)))
  //       .catch(console.error);
  //   }, [debouncedAmount, fromCurrency, toCurrency]);

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault()
    swapCurrency(fromCurrency, toCurrency, Number(debouncedAmount))
      .then((result) => setReceiveAmount(result.toFixed(8)))
      .catch(console.error);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onChangeFromCurrency = (value: string) => {
    console.log("onChangeFromCurrency", value);
    setFromCurrency(value);
  };
  const onChangeToCurrency = (value: string) => {
    console.log("onChangeToCurrency", value);
    setToCurrency(value);
  };

  return (
    <div className="exchange-container">
      <form className="exchange-card" onSubmit={handleSwap}>
        <h2 className="title">Crypto Exchange</h2>
        {/* Send Section */}
        <div className="field">
          <div className="input-group">
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
            />
            <div className="dropdown">
              <CurrencyDropdown
                value={fromCurrency}
                currencies={currencies}
                onChange={onChangeFromCurrency}
                type="code"
              />
            </div>
          </div>
        </div>

        {/* Receive Section */}
        <div className="field">
          <div className="input-group">
            <input type="text" value={receiveAmount} readOnly />
            <div className="dropdown">
              <CurrencyDropdown
                value={toCurrency}
                currencies={currencies}
                onChange={onChangeToCurrency}
                type="id"
              />
            </div>
          </div>
        </div>
        {/* Exchange Button */}
        <button type="submit" className="exchange-btn">
          Exchange
        </button>
      </form>
    </div>
  );
};

export default CurrencySwapForm;
