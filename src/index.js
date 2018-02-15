//  @flow
import config from 'config';
import http from 'http';
import Koa from 'koa';
import KoaCompress from 'koa-compress';
import KoaMount from 'koa-mount';
import KoaStatic from 'koa-static';
import KoaViews from 'koa-views';
import path from 'path';
import setupRoutes from './Controller';

const koa = new Koa();
const server = http.createServer(koa.callback());

koa.use(KoaCompress());
koa.use(KoaMount('/assets', KoaStatic(path.resolve(__dirname, 'assets'))));

koa.use(
  KoaViews(path.resolve(__dirname, 'Views'), {
    extension: 'pug',
  })
);

setupRoutes(koa);

server.listen(config.port);
