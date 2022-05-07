const cron = require('node-cron');
const algorithm = require('./algorithm')

cron.schedule('* * * * *', () => {
    algorithm.run()
});
