import app from './app.js'
import logger from './utils/logger.js'
import config from './utils/config.js'


const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})


