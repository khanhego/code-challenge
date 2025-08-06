interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Add blockchain definition
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}