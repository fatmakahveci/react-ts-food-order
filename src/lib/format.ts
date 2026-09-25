const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
export const money = (value: number) => currencyFormatter.format(value);
// Public assets need the same build-time prefix as Next.js routes on Pages.
export const photo = (id: string, width: 160 | 400 | 800 | 1200 = 800) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/meals/${id}-${width}.webp`;
export const photoSrcSet = (id: string) =>
  ([400, 800, 1200] as const)
    .map((width) => `${photo(id, width)} ${width}w`)
    .join(", ");
