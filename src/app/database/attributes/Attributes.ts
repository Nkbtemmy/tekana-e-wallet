

interface BaseModelAttributes {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CustomerAttributes extends BaseModelAttributes {
    firstName: string;
    lastName: string,
    email: string;
    password: string;
    telephoneNumber: string;
    address: object;
    dateOfBirth: Date;
    isLoggedIn: boolean;
}

export interface AccountAttributes extends BaseModelAttributes {
    customerId: string;
    accountType: string;
    accountNumber: string;
    balance: number,
    openDate: Date
}

export interface TransactionAttributes extends BaseModelAttributes {
    accountId: string;
    customerId: string;
    transactionType: string;
    amount: number,
    transactionDate: Date,
    description: string,
}

export interface WalletAttributes extends BaseModelAttributes {
    customerId: string;
    walletBalance: number;
}
