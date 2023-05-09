const { deployBundle } = require('arcframework');

const DEPLOY_FOLDER = './dist';
const DEPLOY_KEY = process.env.DEPLOY_KEY;
const ANT_CONTRACT = process.env.ANT_CONTRACT;

(async () => {
  try {
	console.log(`Deploying ${DEPLOY_FOLDER} folder`);
    const resultTxId = await deployBundle(DEPLOY_KEY, ANT_CONTRACT, DEPLOY_FOLDER);
    console.log(`Deployment Tx ID: ${resultTxId}`);
  } catch (e) {
    console.error(e);
  }
})();
