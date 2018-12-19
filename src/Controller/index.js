// @flow
import { getInformation } from '../Scraper';
import config from 'config';
import Router from 'koa-router';
import type Application from 'koa';

async function woist(username: string, ctx: any) {
  try {
    const currentLocation = await getInformation(username);

    return ctx.render('woist', {
      currentLocation,
      username,
    });
  } catch (e) {
    ctx.body = e;
  }
}

export default function setupRoutes(koa: Application) {
  const router = new Router();

  router.get('/favicon.ico', ctx => {
    ctx.status = 404;
  });
  router.get('/', ctx => woist(config.username, ctx));
  router.get('/:username.json', async ctx => {
    const currentLocation = await getInformation(ctx.params.username);

    ctx.body = currentLocation;
  });
  router.get('/:username', ctx => woist(ctx.params.username, ctx));

  koa.use(router.routes());
}
