import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  OperatorId,
  UserProfile,
  DriveOffer,
  Transaction,
  UserRole,
} from '../types/telecom';
import {
  INITIAL_USER,
  INITIAL_DRIVE_OFFERS,
  INITIAL_TRANSACTIONS,
  COMMISSION_RATES,
  OPERATORS,
} from '../data/telecomData';

export type ViewMode = 'web' | 'mobile';
export type ActiveTab =
  | 'home'
  | 'recharge'
  | 'drive'
  | 'billpay'
  | 'addbalance'
  | 'transfer'
  | 'history'
  | 'resellers'
  | 'rates'
  | 'support';

interface TelecomContextType {
  user: UserProfile;
  driveOffers: DriveOffer[];
  transactions: Transaction[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedReceipt: Transaction | null;
  setSelectedReceipt: (tx: Transaction | null) => void;
  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (open: boolean) => void;
  
  // Actions
  processRecharge: (data: {
    phoneNumber: string;
    operator: OperatorId;
    amount: number;
    simType: 'prepaid' | 'postpaid' | 'skitto';
    pin: string;
  }) => { success: boolean; message: string; transaction?: Transaction };

  processDrivePurchase: (data: {
    offerId: string;
    phoneNumber: string;
    pin: string;
  }) => { success: boolean; message: string; transaction?: Transaction };

  processBillPayment: (data: {
    billerId: string;
    accountNo: string;
    phone: string;
    amount: number;
    pin: string;
  }) => { success: boolean; message: string; transaction?: Transaction };

  processAddBalance: (data: {
    method: string;
    senderNumber: string;
    trxId: string;
    amount: number;
    targetWallet: 'main' | 'drive' | 'bank';
  }) => { success: boolean; message: string; bonus: number };

  processBalanceTransfer: (data: {
    recipientPhone: string;
    walletType: 'main' | 'drive';
    amount: number;
    pin: string;
  }) => { success: boolean; message: string };

  upgradeUserRole: (newRole: UserRole) => boolean;
  detectOperatorFromNumber: (number: string) => OperatorId | null;
}

const TelecomContext = createContext<TelecomContextType | undefined>(undefined);

export const TelecomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('om_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_USER;
  });

  const [driveOffers] = useState<DriveOffer[]>(INITIAL_DRIVE_OFFERS);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('om_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('om_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('om_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const detectOperatorFromNumber = (number: string): OperatorId | null => {
    const cleanNum = number.replace(/\s+/g, '').replace(/^\+88/, '');
    if (cleanNum.length >= 3) {
      const prefix = cleanNum.substring(0, 3);
      if (prefix === '017' || prefix === '013') return 'gp';
      if (prefix === '019' || prefix === '014') return 'bl';
      if (prefix === '018') return 'robi';
      if (prefix === '016') return 'airtel';
      if (prefix === '015') return 'teletalk';
    }
    return null;
  };

  const processRecharge = ({
    phoneNumber,
    operator,
    amount,
    simType,
    pin,
  }: {
    phoneNumber: string;
    operator: OperatorId;
    amount: number;
    simType: 'prepaid' | 'postpaid' | 'skitto';
    pin: string;
  }) => {
    if (pin !== user.pin) {
      return { success: false, message: 'ভুল পিন নম্বর! আবার চেষ্টা করুন।' };
    }

    if (amount <= 0) {
      return { success: false, message: 'সঠিক রিচার্জ পরিমাণ লিখুন।' };
    }

    if (user.mainBalance < amount) {
      return { success: false, message: 'অপর্যাপ্ত মেইন ব্যালেন্স! দয়া করে ব্যালেন্স যোগ করুন।' };
    }

    // Commission based on role per 1000 TK
    const roleConfig = COMMISSION_RATES[user.role];
    const commission = Number(((amount * roleConfig.rechargeBonusPer1000) / 1000).toFixed(2));
    const finalCost = Number((amount - commission).toFixed(2));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      trxId: `REC${Math.floor(10000000 + Math.random() * 90000000)}`,
      type: 'recharge',
      operator,
      targetNumber: phoneNumber,
      amount,
      commissionEarned: commission,
      cost: finalCost,
      details: `${OPERATORS[operator].bengaliName} (${simType === 'prepaid' ? 'প্রিপেইড' : simType === 'postpaid' ? 'পোস্টপেইড' : 'স্কিটো'}) রিচার্জ`,
      status: 'success',
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setUser(prev => ({
      ...prev,
      mainBalance: Number((prev.mainBalance - finalCost).toFixed(2)),
      totalRechargesToday: prev.totalRechargesToday + 1,
      totalEarningsToday: Number((prev.totalEarningsToday + commission).toFixed(2)),
    }));

    setTransactions(prev => [newTx, ...prev]);
    setSelectedReceipt(newTx);
    triggerConfetti();

    return {
      success: true,
      message: `৳${amount} রিচার্জ সফল হয়েছে! কমিশন লাভ: ৳${commission}`,
      transaction: newTx,
    };
  };

  const processDrivePurchase = ({
    offerId,
    phoneNumber,
    pin,
  }: {
    offerId: string;
    phoneNumber: string;
    pin: string;
  }) => {
    if (pin !== user.pin) {
      return { success: false, message: 'ভুল পিন নম্বর! আবার চেষ্টা করুন।' };
    }

    const offer = driveOffers.find(o => o.id === offerId);
    if (!offer) {
      return { success: false, message: 'ড্রাইভ অফারটি পাওয়া যায়নি!' };
    }

    const requiredBalance = offer.offerPrice;
    // Check Drive Balance first, or fallback to Main Balance
    const useDriveBalance = user.driveBalance >= requiredBalance;
    const useMainBalance = !useDriveBalance && user.mainBalance >= requiredBalance;

    if (!useDriveBalance && !useMainBalance) {
      return {
        success: false,
        message: `অপর্যাপ্ত ব্যালেন্স! আপনার একাউন্টে নূন্যতম ৳${requiredBalance} থাকা প্রয়োজন।`,
      };
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      trxId: `DRV${Math.floor(10000000 + Math.random() * 90000000)}`,
      type: 'drive',
      operator: offer.operator,
      targetNumber: phoneNumber,
      amount: offer.offerPrice,
      commissionEarned: offer.cashback,
      cost: offer.offerPrice,
      details: `${offer.title} (${offer.validity})`,
      status: 'processing', // Real drive packs take 1-3 minutes in telecom systems
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setUser(prev => {
      const updated = { ...prev };
      if (useDriveBalance) {
        updated.driveBalance = Number((updated.driveBalance - requiredBalance).toFixed(2));
      } else {
        updated.mainBalance = Number((updated.mainBalance - requiredBalance).toFixed(2));
      }
      updated.totalEarningsToday = Number((updated.totalEarningsToday + offer.cashback).toFixed(2));
      return updated;
    });

    setTransactions(prev => [newTx, ...prev]);
    setSelectedReceipt(newTx);
    triggerConfetti();

    // Auto update status to success after 5 seconds to simulate real telecom auto-processing
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(t => (t.id === newTx.id ? { ...t, status: 'success' } : t))
      );
    }, 4500);

    return {
      success: true,
      message: `ড্রাইভ অর্ডার গ্রহণ করা হয়েছে! ক্যাশব্যাক: ৳${offer.cashback} আপনার একাউন্টে সংরক্ষিত হয়েছে।`,
      transaction: newTx,
    };
  };

  const processBillPayment = ({
    billerId,
    accountNo,
    phone,
    amount,
    pin,
  }: {
    billerId: string;
    accountNo: string;
    phone: string;
    amount: number;
    pin: string;
  }) => {
    if (pin !== user.pin) {
      return { success: false, message: 'ভুল পিন নম্বর!' };
    }

    if (amount <= 0) {
      return { success: false, message: 'সঠিক বিলের পরিমাণ দিন।' };
    }

    if (user.mainBalance < amount) {
      return { success: false, message: 'অপর্যাপ্ত মেইন ব্যালেন্স!' };
    }

    const commission = 5; // Flat cashback/bonus for bill payment
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      trxId: `BIL${Math.floor(10000000 + Math.random() * 90000000)}`,
      type: 'bill_pay',
      targetNumber: `${accountNo} (${phone})`,
      amount,
      commissionEarned: commission,
      cost: amount,
      details: `ইউটিলিটি বিল পরিশোধ [আইডি: ${billerId}]`,
      status: 'success',
      billCategory: billerId,
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setUser(prev => ({
      ...prev,
      mainBalance: Number((prev.mainBalance - amount).toFixed(2)),
      totalEarningsToday: Number((prev.totalEarningsToday + commission).toFixed(2)),
    }));

    setTransactions(prev => [newTx, ...prev]);
    setSelectedReceipt(newTx);
    triggerConfetti();

    return {
      success: true,
      message: `৳${amount} বিল সফলভাবে পরিশোধিত হয়েছে!`,
      transaction: newTx,
    };
  };

  const processAddBalance = ({
    method,
    senderNumber,
    trxId,
    amount,
    targetWallet,
  }: {
    method: string;
    senderNumber: string;
    trxId: string;
    amount: number;
    targetWallet: 'main' | 'drive' | 'bank';
  }) => {
    if (amount < 50) {
      return { success: false, message: 'নূন্যতম ব্যালেন্স যোগ ৫০ টাকা হতে হবে।', bonus: 0 };
    }

    const roleConfig = COMMISSION_RATES[user.role];
    const bonus = Number(((amount * roleConfig.addBalanceBonus) / 1000).toFixed(2));
    const totalAdded = amount + bonus;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      trxId: trxId.toUpperCase(),
      type: 'add_balance',
      amount: totalAdded,
      commissionEarned: bonus,
      cost: amount,
      details: `${method} এর মাধ্যমে অটো ব্যালেন্স যোগ (বোনাস: ৳${bonus})`,
      status: 'success',
      paymentMethod: `${method} [${senderNumber}]`,
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setUser(prev => {
      const updated = { ...prev };
      if (targetWallet === 'drive') {
        updated.driveBalance = Number((updated.driveBalance + totalAdded).toFixed(2));
      } else if (targetWallet === 'bank') {
        updated.bankBalance = Number((updated.bankBalance + totalAdded).toFixed(2));
      } else {
        updated.mainBalance = Number((updated.mainBalance + totalAdded).toFixed(2));
      }
      return updated;
    });

    setTransactions(prev => [newTx, ...prev]);
    setSelectedReceipt(newTx);
    triggerConfetti();

    return {
      success: true,
      message: `অভিনন্দন! ৳${amount} + বোনাস ৳${bonus} মোট ৳${totalAdded} আপনার ${targetWallet.toUpperCase()} ব্যালেন্সে সফলভাবে যুক্ত হয়েছে!`,
      bonus,
    };
  };

  const processBalanceTransfer = ({
    recipientPhone,
    walletType,
    amount,
    pin,
  }: {
    recipientPhone: string;
    walletType: 'main' | 'drive';
    amount: number;
    pin: string;
  }) => {
    if (pin !== user.pin) {
      return { success: false, message: 'ভুল পিন নম্বর!' };
    }

    const currentBal = walletType === 'main' ? user.mainBalance : user.driveBalance;
    if (currentBal < amount) {
      return { success: false, message: 'অপর্যাপ্ত ব্যালেন্স!' };
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      trxId: `TRF${Math.floor(10000000 + Math.random() * 90000000)}`,
      type: 'transfer',
      targetNumber: recipientPhone,
      amount,
      cost: amount,
      details: `${walletType.toUpperCase()} ব্যালেন্স ট্রান্সফার টু ${recipientPhone}`,
      status: 'success',
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setUser(prev => ({
      ...prev,
      [walletType === 'main' ? 'mainBalance' : 'driveBalance']: Number(
        (prev[walletType === 'main' ? 'mainBalance' : 'driveBalance'] - amount).toFixed(2)
      ),
    }));

    setTransactions(prev => [newTx, ...prev]);
    setSelectedReceipt(newTx);
    triggerConfetti();

    return {
      success: true,
      message: `সফলভাবে ৳${amount} ট্রান্সফার হয়েছে (${recipientPhone})`,
    };
  };

  const upgradeUserRole = (newRole: UserRole) => {
    const config = COMMISSION_RATES[newRole];
    if (user.mainBalance < config.costToUpgrade) {
      return false;
    }

    setUser(prev => ({
      ...prev,
      role: newRole,
      roleBengali: config.title,
      mainBalance: Number((prev.mainBalance - config.costToUpgrade).toFixed(2)),
    }));
    triggerConfetti();
    return true;
  };

  return (
    <TelecomContext.Provider
      value={{
        user,
        driveOffers,
        transactions,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        selectedReceipt,
        setSelectedReceipt,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        isNoticeModalOpen,
        setIsNoticeModalOpen,
        processRecharge,
        processDrivePurchase,
        processBillPayment,
        processAddBalance,
        processBalanceTransfer,
        upgradeUserRole,
        detectOperatorFromNumber,
      }}
    >
      {children}
    </TelecomContext.Provider>
  );
};

export const useTelecom = () => {
  const context = useContext(TelecomContext);
  if (!context) {
    throw new Error('useTelecom must be used within a TelecomProvider');
  }
  return context;
};
