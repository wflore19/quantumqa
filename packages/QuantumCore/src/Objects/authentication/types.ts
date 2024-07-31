import { z } from 'zod';

export type OAuthProviderType = 'GOOGLE' | 'DISCORD';

export interface OAuthService {
  exchangeCodeForToken(args: ExchangeCodeForTokenInput): Promise<OAuthTokens>;
  getProfile(token: string): Promise<OAuthProfile>;
}

export type OAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type OAuthProfile = {
  email: string;
};

export type ExchangeCodeForTokenInput = {
  code: string;
  redirectUrl: string;
};

export type OAuthCodeState = z.infer<typeof OAuthCodeState>;

export const OAuthCodeState = z.object({
  clientRedirectUrl: z.string().url(),

  /**
   * This provides context for what the application should do after the user
   * is authenticated. In our case, this will tell us whether we want to lookup
   * an admin record or a student record.
   */
  context: z.enum(['admin_login', 'member_login']),

  oauthRedirectUrl: z.custom<`${string}/oauth/${string}`>((value) => {
    const { success } = z.string().url().safeParse(value);

    return success;
  }),
});
