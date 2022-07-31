const cron = require('node-cron');
const algorithm = require('./algorithm')

cron.schedule('5 * * * *', () => {
    algorithm.run()
});
