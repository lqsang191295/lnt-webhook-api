export type TypeResponseZalo = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
};

export type TypeResponseZaloError = {
  error_name: string;
  error_reason: string;
  ref_doc: string;
  error_description: string;
  error: number;
};
