import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the document declares English and restaurant metadata", async () => {
  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.match(layout, /lang="en"/);
  assert.match(layout, /Lokma/);
});
