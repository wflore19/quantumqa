import { OAuthLogin } from '@quantumqa/quantumcore/api';
import express from 'express';
import { match } from 'ts-pattern';

import { AuthorizationCodeQuery, type HandleLoginInput } from '../utils/types';

export const oauthRouter = express.Router();

oauthRouter.get('/oauth/google', async (req, res) => {
  const query = AuthorizationCodeQuery.parse(req.query);

  try {
    const to = await handleLogin({
      query,
      type: 'GOOGLE',
    });

    return res.redirect(to);
  } catch (e) {
    return res.status(500).json({
      message: (e as Error).message,
    });
  }
});

async function handleLogin({ query, type }: HandleLoginInput) {
  const { code, state } = query;

  return match(state)
    .with({ context: 'admin_login' }, { context: 'member_login' }, async () => {
      const { authToken, email } = await OAuthLogin({
        context: state.context,
        code,
        oauthRedirectUrl: state.oauthRedirectUrl,
        type,
      });

      const url = new URL(state.clientRedirectUrl!);

      if (authToken) {
        url.searchParams.set('token', authToken);
        url.searchParams.set('method', type);
      } else {
        url.searchParams.set(
          'error',
          `There was no user found with this email (${email}).`
        );
      }

      return url.toString();
    })
    .exhaustive();
}
