import { PaymentService } from '../../src/payment/payment'

describe('PaymentService', () => {
  let payment: PaymentService

  beforeEach(() => {
    payment = new PaymentService(100)
  })
  describe('applyDiscount', () => {

    // NORMAL DISCOUNT
    test('applies discount', () => {
      payment.applyDiscount(20)
      expect(payment.amount).toBe(80)
    })
    // ADDITIONAL DISCOUNT
    test('applies additional discount to current amount', () => {
      payment.applyDiscount(20)
      payment.applyDiscount(10)
      expect(payment.amount).toBe(72)
    })
    // 0% DISCOUNT
    test('accepts 0 percent discount', () => {
      payment.applyDiscount(0)
      expect(payment.amount).toBe(100)
    })
    // 100% DISCOUNT
    test('accepts 100 percent discount', () => {
      payment.applyDiscount(100)
      expect(payment.amount).toBe(0)
    })
    // NEGATIVE % DISCOUNT
    test('does nothing when discount is negative', () => {
      payment.applyDiscount(-10)
      expect(payment.amount).toBe(100)
    })
    // NO DISCOUNTS AFTER PAYING
    test('does nothing after payment is completed', () => {
      payment.pay()
      payment.applyDiscount(20)
      expect(payment.amount).toBe(100)
    })
    // NO >100% DISCOUNT
    test('does nothing for discount above 100', () => {
      payment.applyDiscount(101)
      expect(payment.amount).toBe(100)
    })
  })

  describe('pay', () => {

    // FIRST PAYMENT
    test('completes payment', () => {
      expect(payment.pay()).toBe(true)
      expect(payment.isPaid).toBe(true)
    })
    // SECOND PAYMENT
    test('returns false if payment is already completed', () => {
      payment.pay()
      expect(payment.pay()).toBe(false)
      expect(payment.isPaid).toBe(true)
    })

  })
})