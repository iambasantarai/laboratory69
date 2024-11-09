type ZodType = ZodUnknown | ZodString | ZodNumber;
type ZodUnknown = { type: "unknown" };
type ZodString = { type: "string" };
type ZodNumber = { type: "number" };

type Infer<T extends ZodType> = T extends ZodUnknown
  ? unknown
  : T extends ZodString
    ? string
    : T extends ZodNumber
      ? number
      : "invalid type";

type result1 = Infer<ZodUnknown>;
type result2 = Infer<ZodString>;
type result3 = Infer<ZodNumber>;
