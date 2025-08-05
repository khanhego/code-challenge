interface WalletRowProps {
  className: string;
  key: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, key, amount, usdValue, formattedAmount }) => {
  return <div className={className}>{formattedAmount}</div>;
};