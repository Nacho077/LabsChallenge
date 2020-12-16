const server = require('./src/server.js')
const { conn } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(`Server funcionando en el puerto ${process.env.PORT || 3001}`)
  })
})