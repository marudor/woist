// @flow

export type Config = {
  port: number,
  username: string,
};

function envOrDefault<T>(envName: string, defaultValue: T, postProcess?: string => any = a => a): T {
  const env = process.env[envName];

  if (env) {
    return postProcess(env);
  }

  return defaultValue;
}

const config: Config = {
  port: envOrDefault('PORT', 9042, Number.parseInt),
  username: envOrDefault('username', 'marudor'),
};

export default config;
