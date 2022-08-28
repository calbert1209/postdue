import { isString } from "../../deps.ts";
import { AuthCookieEntry, AuthCookieQuery } from "./types.ts";

export const isValidQuery = (
  query: Record<string, string>,
): query is AuthCookieQuery => {
  const { host, name } = query;
  return isString(host) && !!host.length && isString(name) && !!name.length;
};

// deno-lint-ignore no-explicit-any
export const isAuthCookieEntry = (obj: any): obj is AuthCookieEntry => {
  const { host, name, value } = obj;
  return isString(host) && isString(name) && isString(value);
};
