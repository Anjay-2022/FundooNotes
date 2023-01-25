import { createClient } from 'redis'

export const client = createClient({
    port: 6379,
    host: 'redis'
})

const redis = async() => {
 try {
    await client.connect()
    console.log("CLIENT CONNECTION ESTD...")
 } catch (error) {
    console.log(error)
 }
}
export default redis