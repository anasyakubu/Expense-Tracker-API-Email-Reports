//sendPaymentConfirm.ts

//********************** SendInfoI **********************//
export interface SendInfoI { email: string; name?: string; }

export interface MailOptionI { from: string; to: string; subject: string; html: string; }


//********************** BankTransferDetails **********************//

export interface BankTransferDetails {
  tx_ref: string; amount: string; currency: string; email: string; fullname: string;
  phone_number: string; redirect_url?: string;
}