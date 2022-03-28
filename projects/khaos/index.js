const sdk = require('@defillama/sdk');
const { transformBscAddress } = require('../helper/portedTokens');
const BASE_CONTRACT = '0x4954ceb270bf39dbefcf6e769597d3c14faf9e8f';
const BOND_ADDRESS = '0xe22d394e3555b858d144a6062e0d044ed346ae59';

async function tvl(timestamp, block, chainBlocks) {
  const balances = {};
  const transform = await transformBscAddress();

  const collateralBalance = (await sdk.api.abi.call({
    abi: 'erc20:balanceOf',
    chain: 'bsc',
    target: BASE_CONTRACT,
    params: [BOND_ADDRESS],
    block: chainBlocks['bsc'],
  })).output;

  await sdk.util.sumSingleBalance(balances, transform(BASE_CONTRACT), collateralBalance);
  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology: 'counts the number of khaos tokens tvl.',
  bsc: {
    tvl,
  }
};