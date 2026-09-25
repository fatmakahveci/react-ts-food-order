export default function Icon({
  name,
  size = 20,
}: {
  name: "bag" | "search" | "arrow" | "clock" | "pin";
  size?: number;
}) {
  const paths = {
    bag: "M5 7h14l1 14H4L5 7ZM9 8V6a3 3 0 0 1 6 0v2",
    search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    arrow: "M4 12h16m-6-6 6 6-6 6",
    clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
