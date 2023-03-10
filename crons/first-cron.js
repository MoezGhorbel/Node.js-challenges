const cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
  console.log("Cette tâche s'exécute toutes les deux minutes");
});