export type OperatorId = 'gp' | 'bl' | 'robi' | 'airtel' | 'teletalk' | 'skitto';

export interface Operator {
  id: OperatorId;
  name: string;
  bengaliName: string;
  color: string;
  bgColor: string;
  textColor: string;
  prefixes: string[];
  logoText: string;
}

export type UserRole = 'retailer' | 'dealer' | 'dgm' | 'house' | 'sub_admin';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  role: UserRole;
  roleBengali: string;
  mainBalance: number;
  driveBalance: number;
  bankBalance: number;
  pin: string;
  avatarUrl?: string;
  joinedDate: string;
  totalRechargesToday: number;
  totalEarningsToday: number;
}

export interface DriveOffer {
  id: string;
  operator: OperatorId;
  title: string;
  description: string;
  validity: string;
  regularPrice: number;
  offerPrice: number;
  cashback: number; // Commission given to reseller
  division: 'All' | 'Dhaka' | 'Chittagong' | 'Rajshahi' | 'Khulna' | 'Sylhet' | 'Barisal' | 'Rangpur' | 'Mymensingh';
  tag?: string;
  isActive: boolean;
}

export type TransactionType = 'recharge' | 'drive' | 'bill_pay' | 'add_balance' | 'transfer';
export type TransactionStatus = 'success' | 'pending' | 'failed' | 'processing';

export interface Transaction {
  id: string;
  trxId: string;
  type: TransactionType;
  operator?: OperatorId;
  targetNumber?: string;
  amount: number;
  commissionEarned?: number;
  cost: number;
  details: string;
  status: TransactionStatus;
  timestamp: string;
  billCategory?: string;
  paymentMethod?: string;
}

export interface BillBiller {
  id: string;
  category: 'electricity' | 'gas' | 'water' | 'internet';
  name: string;
  nameBn: string;
  billerCode: string;
  iconName: string;
  fee: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  body: string;
  date: string;
  isImportant?: boolean;
}
