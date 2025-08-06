import React, { useMemo } from 'react';
import { BoxProps } from '@mui/material';
import WalletRow from './component/WalletRow';
import classes from './WalletPage.module.css';
import { WalletBalance, FormattedWalletBalance } from './type/WalletBalacnce';
import { useWalletBalances } from './hooks/useWalletBalances';
import { usePrices } from './hooks/usePrices';
import { getPriority } from './utils/utils';

interface Props extends BoxProps {
  children: React.ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // ✅ useMemo: filter balances and sort
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance : WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0; // ✅ filter correct balance 
      })
      .sort((leftBalance : WalletBalance, rightBalance : WalletBalance) => {
        const leftPriority = getPriority(leftBalance.blockchain);
        const rightPriority = getPriority(rightBalance.blockchain);
        if (leftPriority > rightPriority) return -1;
        if (rightPriority > leftPriority) return 1;
        return 0; // Add defaut return 
      });
  }, [balances]);

  // ✅ Format balances onces and use
  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return sortedBalances.map((balance : WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),  
    }));
  }, [sortedBalances]);

  // Use formattedBalances for render rows
  const rows = useMemo(() => {
    return formattedBalances.map((balance : FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}`} // ✅ Key unique
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
