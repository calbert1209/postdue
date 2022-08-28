export type AuthCookieQuery = {
  host: string;
  name: string;
};

export interface AuthCookieEntry {
  host: string;
  name: string;
  value: string;
}
