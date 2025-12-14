import { createClient } from 'redis';


    const redisHost = process.env.REDIS_HOST || 'redis://localhost:6379';

    export const redisClient = createClient({ url: redisHost });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    console.log('✅ Redis connected');  
