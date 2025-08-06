import React, { useMemo } from "react";
import type { Currency } from "../network/currencyService";
import "./CurrencyDropdown.css";

interface CurrencyDropdownProps {
  value: string;
  currencies: Currency[];
  onChange: (value: string) => void;
  loading?: boolean;
  type?: 'code' | 'id';
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  value,
  currencies,
  onChange,
  loading = false,
  type = 'code',
}) => {
  const options = useMemo(() => {
    return currencies.map((c) => (
      <option key={type === 'code' ? c.code : c.id} value={type === 'code' ? c.code : c.id}>
        {type === 'code' ? c.code : c.id} - {c.name}
      </option>
    ));
  }, [currencies, type]);
  return (
    <div className="currency-dropdown">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        {loading ? (
          <option>Loading...</option>
        ) : (
          options
        )}
      </select>
    </div>
  );
};

export default React.memo(CurrencyDropdown);