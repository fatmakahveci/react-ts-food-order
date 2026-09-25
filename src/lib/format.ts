const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
export const money = (value: number) => currencyFormatter.format(value);
export const photo = (id: string, width = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
