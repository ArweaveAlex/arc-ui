import Bundlr from '@bundlr-network/client';
import Arweave from 'arweave';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';

(async () => {
	const DEPLOY_KEY = process.env.DEPLOY_KEY;
	const ANT_CONTRACT = process.env.ANT_CONTRACT;
	const DEPLOY_FOLDER = './dist';
	const BUNDLR_NODE = 'https://node2.bundlr.network';

	const arweave = Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https',
	});
	const jwk = JSON.parse(Buffer.from(DEPLOY_KEY, 'base64').toString('utf-8'));

	const bundlr = new Bundlr.default(BUNDLR_NODE, 'arweave', jwk);
	const warp = WarpFactory.custom(arweave, defaultCacheOptions, 'mainnet').useArweaveGateway().build();

	const contract = warp.contract(ANT_CONTRACT).connect(jwk);

	const result = await bundlr.uploadFolder(DEPLOY_FOLDER, {
		indexFile: 'index.html',
	});

	await new Promise((r) => setTimeout(r, 1000));

	await contract.writeInteraction({
		function: 'setRecord',
		subDomain: '@',
		transactionId: result.id,
	});

	console.log(`[ ${result.id} ]`);
})();
