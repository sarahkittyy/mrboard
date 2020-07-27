import express from 'express';
import appRoot from 'app-root-path';

import api from './api';

import log from './log';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(appRoot.resolve('assets')));

app.use(log);

app.get('/*', (req, res) => {
	return res.sendFile(appRoot.resolve('dist/frontend/index.html'));
});

app.use(api);

let basePort = parseInt(process.env.BACKEND_PORT ?? '3000');

app.listen(basePort, () => {
	console.log(`listening on port ${basePort}`);
});