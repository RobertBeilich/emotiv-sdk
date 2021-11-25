export type ClientId = string;
export type ClientSecret = string;
export type CortexToken = string;

export interface Credentials {
  clientId?: ClientId;
  clientSecret?: ClientSecret;
  cortexToken?: CortexToken;
}

export interface Profile {
  name: string;
}
