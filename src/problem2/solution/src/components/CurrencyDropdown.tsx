import React, { useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import type { Currency } from "../network/currencyService";
import "./CurrencyDropdown.css";

interface CurrencyDropdownProps {
  name: string;                     
  control: Control<any>;           
  currencies: Currency[];           
  loading?: boolean;               
  type?: 'code' | 'id';      
  rules?: object;                
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  name,
  control,
  currencies,
  loading = false,
  type = "code",
  rules = { required: true },
}) => {
  const options = useMemo(() => {
    return currencies.map((c) => (
      <option key={c.code} value={type === "code" ? c.code : c.symbol.toLowerCase()}>
        {c.symbol} - {c.name}
      </option>
    ));
  }, [currencies, type]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="currency-dropdown">
          <select
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            disabled={loading}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Select currency</option>
                {options}
              </>
            )}
          </select>
          {fieldState.error && (
            <small className="error-text">Please select a currency</small>
          )}
        </div>
      )}
    />
  );
};

export default React.memo(CurrencyDropdown);
