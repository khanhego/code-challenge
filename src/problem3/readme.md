# 99Tech Code Challenge #1 #

Note that if you fork this repository, your responses may be publicly linked to this repo.  
Please submit your application along with the solutions attached or linked.   

It is important that you minimally attempt the problems, even if you do not arrive at a working solution.

## Submission ##
You can either provide a link to an online repository, attach the solution in your application, or whichever method you prefer.
We're cool as long as we can view your solution without any pain.

## 1. **Undefined Properties and Functions**
- **Issue:** 
  - `WalletBalance` interface lacks the `blockchain` property, but it is accessed in `getPriority` and sorting/filtering.
  - `useWalletBalances` and `usePrices` are used but not defined/imported in the code.
- **Recommendation:**
  ```typescript
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // ✅ Add this property
  }

## 2. **Incorrect Variable Usage**
- **Issue:** 
  - Inside the filter callback, lhsPriority is used but never defined, leading to ReferenceError.
- **Recommendation:**
  Replace it with balancePriority: 
  if (balancePriority > -99) { ... }

## 3. **Filter Logic Problems**
- **Issue:** 
  - The filter currently keeps balances with amount <= 0: if (balance.amount <= 0) { return true; } 
  This seems incorrect since typically you’d want to exclude zero or negative balances.
- **Recommendation:**
  return balancePriority > -99 && balance.amount > 0;

## 4. **Sorting Function Missing Return**
- **Issue:** 
  - The sort callback lacks a default return:
   }).sort((lhs, rhs) => { ... });
- **Recommendation:**
if (leftPriority > rightPriority) return -1;
if (rightPriority > leftPriority) return 1;
return 0; // ✅ Add default return

## 5. **Type Mismatch in Mapping Rows**
- **Issue:** 
  - `rows` maps over `sortedBalances` but expects `FormattedWalletBalance` type, while formatted values are only created in `formattedBalances`.
- **Recommendation:**
 Use `formattedBalances` instead of `sortedBalances` for rows:
 const rows = formattedBalances.map((balance: FormattedWalletBalance) => { ... });

## 6. **Unused Dependency in useMemo**
- **Issue:** 
  - `prices` is included in `useMemo` dependencies but is not used, causing unnecessary recomputations.
- **Recommendation:**
 }, [balances]); // ✅ Remove `prices` from dependencies

 ## 7. **Verbose Switch Statement**
- **Issue:** 
  - `getPriority` uses a verbose switch with repeated `return` statements.
- **Recommendation:**
 const priorities: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
};

const getPriority = (blockchain: string): number => 
  priorities[blockchain] ?? -99;

## 8. **Key Usage in WalletRow**
- **Issue:** 
  - Using `index` as `key` is an anti-pattern in React. 
  This seems incorrect since typically you’d want to exclude zero or negative balances.
- **Recommendation:**
  key={`${balance.blockchain}-${balance.currency}`}

## 8. **Classes and BoxProps Not Defined**
- **Issue:** 
  - `BoxProps`, `classes`, and `WalletRow` are used but not imported or defined.
- **Recommendation:**
import { BoxProps } from '@mui/material';
import WalletRow from './WalletRow';
import classes from './WalletPage.module.css';

