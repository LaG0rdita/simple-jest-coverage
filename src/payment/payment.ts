export class PaymentService {
  amount: number
  isPaid: boolean

  constructor(amount: number) {
    if (amount <= 0) {
      throw new Error("Amount should be more than 0")
    }
    this.amount = amount
    this.isPaid = false
  }

  applyDiscount(percent: number): void {
    if (percent < 0 ) {
      return
    }
    if (percent > 100) {
      return
    }
    if (this.isPaid) {
      return
    }
    this.amount = this.amount - (this.amount * percent / 100)
  }

  pay(): boolean {
    if (this.isPaid) {
      return false
    }
    this.isPaid = true
    return true
  }

}
