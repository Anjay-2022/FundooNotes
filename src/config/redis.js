import { createClient } from 'redis'

import logger from './logger';

export const client = createClient({
    port: 6379,
    host: 'redis'
})

const redis = async() => {
 try {
    await client.connect()
    logger.info("CLIENT CONNECTION ESTD...")
 } catch (error) {
    logger.error(error)
 }
}
export default redis