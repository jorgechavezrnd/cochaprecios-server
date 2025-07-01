const common = [
  '--require-module ts-node/register'
];

const market_backend = [
  ...common,
  'tests/apps/market/backend/features/**/*.feature',
  '--require tests/apps/market/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  market_backend
};
