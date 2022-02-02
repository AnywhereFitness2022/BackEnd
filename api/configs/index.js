module.exports = {
    PORT: 9000,
    NODE_ENV: 'development',
    DATABASE_URL: 'postgres://vjztdijibuxvid:4dd760d161e5c29b0e674b7e021685a3a87bba3224f582767948ce02c63b64b0@ec2-35-170-85-206.compute-1.amazonaws.com:5432/d2hotim8n678r9',
    DEV_DATABASE_URL: 'postgresql://postgres:Mm00260618@localhost:5432/clients',
    TESTING_DATABASE_URL: 'postgresql://postgres:Mm00260618@localhost:5432/clients-test',
    SEED_PASSWORD: '1234',
    BCRYPT_ROUNDS: 8,
    JWT_SECRET: 'this is a secret'
}