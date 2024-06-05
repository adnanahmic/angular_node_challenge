export type SIGNUP_TYPE = {
  name: string;
  email: string;
  password: string;
};

export type LOGIN_TYPE = {
  email: string;
  password: string;
};

export interface GENERATE_TOKEN_PAYLOAD_TYPE {
  _id: string;
  email: string;
}
