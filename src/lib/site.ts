// Keep a trailing slash so asset URLs retain the repository path on GitHub Pages.
export const siteUrl = `${(process.env.SITE_URL || "https://fatmakahveci.com/react-ts-food-order").replace(/\/$/, "")}/`;
export const siteDescription =
  "Explore Lokma's sample menu of burgers, pizzas and fresh bowls. Try the interactive cart and demo checkout. No real orders or payments.";
