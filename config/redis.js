
import { createClient } from "redis";

const redisClient = createClient({
    url:""
})

redisClient.on("error",(error) => console.log(error))

await redisClient.connect();

export default redisClient;