export interface AuthCookie {
  host: string;
  name: string;
  value: string;
}

const isString = (obj: unknown): obj is string => typeof obj === "string";

// deno-lint-ignore no-explicit-any
export const isAuthCookie = (obj: any): obj is AuthCookie => {
  const { host, name, value } = obj;
  return isString(host) && isString(name) && isString(value);
};
