interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // ✅ Thêm blockchain
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}