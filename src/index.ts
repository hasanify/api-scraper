import 'module-alias/register';

import {Application} from 'express';

import env from '@/data/env';
import create from '@/lib/server';

const app: Application = create();

app.listen(env.PORT, () => {
  console.log(`Started at ${env.PORT}`);
});
