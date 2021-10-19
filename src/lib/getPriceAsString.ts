// eslint-disable-next-line import/prefer-default-export
export const getPriceAsString = (amount: number) =>
  (Math.round(amount) / 100).toFixed(2)
