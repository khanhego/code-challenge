import React, { useEffect, useState } from "react";
import "./CurrencySwapForm.css";
import CurrencyDropdown from "./CurrencyDropdown";
import { fetchCurrencies } from "../network/currencyService";
import { swapCurrency } from "../network/swapService";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  sendAmount: number;
  fromCurrency: string;
  toCurrency: string;
}

const schema = yup.object().shape({
  sendAmount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be greater than 0")
    .max(1000000, "Amount too large"),
  fromCurrency: yup.string().required("Please select source currency"),
  toCurrency: yup
    .string()
    .required("Please select target currency")
    .notOneOf([yup.ref("fromCurrency")], "Cannot swap to the same currency"),
});

const CurrencySwapForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { sendAmount: 0, fromCurrency: "", toCurrency: "" },
  });

  const [receiveAmount, setReceiveAmount] = useState("");

  const { data: currencies = [], isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 10,
  });
  console.log('currencies',currencies)

  useEffect(() => {
    if (currencies.length > 1) {
      setValue("fromCurrency", currencies[0].code);
      setValue("toCurrency", currencies[1].code);
    }
  }, [currencies, setValue]);

  const onSubmit = (data: FormValues) => {
    swapCurrency(data.fromCurrency, data.toCurrency, data.sendAmount)
      .then((result) => setReceiveAmount(result.toFixed(8)))
      .catch(console.error);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="exchange-container">
      <form className="exchange-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Crypto Exchange</h2>

        {/* Send Section */}
        <div className="field">
          <div className="input-group">
            <input
              type="number"
              step="any"
              placeholder="Enter amount"
              {...register("sendAmount")}
            />
            <CurrencyDropdown
              name="fromCurrency"
              control={control}
              currencies={currencies}
              loading={isLoading}
              type="code"
            />
          </div>
          
        </div>
        {errors.sendAmount && (
            <small className="error-text">{errors.sendAmount.message}</small>
          )}

        {/* Receive Section */}
        <div className="field">
          <div className="input-group">
            <input type="text" value={receiveAmount} readOnly />
            <CurrencyDropdown
              name="toCurrency"
              control={control}
              currencies={currencies}
              loading={isLoading}
              type="id"
            />
          </div>
        </div>
        {errors.toCurrency && (
            <small className="error-text">{errors.toCurrency.message}</small>
          )}
        {/* Exchange Button */}
        <button type="submit" className="exchange-btn">
          Exchange
        </button>
      </form>
    </div>
  );
};

export default CurrencySwapForm;
