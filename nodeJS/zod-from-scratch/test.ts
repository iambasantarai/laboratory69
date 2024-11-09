import { expect } from "bun:test";
import { z } from "./zod";

const Monster = z.object({
  health: z.number(),
  name: z.string(),
});

const monster = {
  health: 44,
  name: "pento",
};

const parsed = Monster.parse(monster);

expect(parsed).toEqual(monster);
