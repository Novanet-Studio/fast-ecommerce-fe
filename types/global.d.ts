interface EmailObjectParams {
  payed: string;
  date: string;
  content: string;
  orderId: string;
}

interface PaymentObject {
  orderId?: string;
  name: string;
  lastname: string;
  confirmation: string;
  amount: string;
  paymentDate: string;
  /**
   * If this field is set, it means that the payment method is 'pago movil'
   */
  amountRate?: string;
}
