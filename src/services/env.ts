import * as dotenv from 'dotenv';
import path from 'path';

const getENVBasePath = () => {
  if (process.platform === 'win32') {
    return `${path.resolve()}\\`;
  }

  return `${path.resolve()}/`;
};

export const getENV = async () => {
  console.log('getting .env...');

  if (import.meta.env) {
    console.log('env on vite');

    return import.meta.env;
  }

  console.log('env on node');

  const basePath = getENVBasePath();

  switch (process.env.VITE_NODE_ENV) {
    case 'production':
      dotenv.config({ path: `${basePath}.env.production` });
      break;
    case 'development':
      dotenv.config({ path: `${basePath}.env.development` });
      break;
    default:
      console.warn('App running on env config fail-safe mode. setting mode to production');
      dotenv.config({ path: `${basePath}.env.production` });
  }

  return process.env;
};
