export class SendInvoiceEmailError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'SendEmailError';
  }
}

export class PaymentReportError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'PaymentReportError';
  }
}
