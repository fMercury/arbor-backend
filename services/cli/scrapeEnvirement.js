const { loadMainModuleSystem } = require('../../loadMainModules');

const log = require('log4js').getLogger(__filename.split('\\').pop().split('/').pop());
log.level = 'trace';

/*
const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'env', alias: 'e', type: String },
];
const cliOptions = commandLineArgs(optionDefinitions);
const { env } = cliOptions;
*/


(async () => {
    const {config, smart_contract_connector} = await loadMainModuleSystem();
    console.log(JSON.stringify(config().modificationTime, null, 2));

    await smart_contract_connector.scrapeOrganizations();

    process.exit(0);
})();
