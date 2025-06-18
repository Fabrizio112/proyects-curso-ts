import type { z } from "zod";
import { CryptoCurrenciesSchema, CryptoCurrencySchema, CryptoPriceSchema, CurrencySchema, PairSchema } from "../schema/currency-schema";

export type Currency=z.infer<typeof CurrencySchema>

export type CryptoCurrency=z.infer<typeof CryptoCurrencySchema>
export type CryptoCurrencies=z.infer<typeof CryptoCurrenciesSchema>

export type PairState=z.infer<typeof PairSchema>

export type CryptoPrice=z.infer<typeof CryptoPriceSchema>