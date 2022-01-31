module.exports = {
    PORT: 9000,
    NODE_ENV: 'development',
    DEV_DATABASE_URL: 'postgresql://postgres:Mm00260618@localhost:5432/clients',
    TESTING_DATABASE_URL: 'postgresql://postgres:Mm00260618@localhost:5432/clients-test',
    SEED_PASSWORD: '1234',
    BCRYPT_ROUNDS: 8,
    JWT_SECRET: 'this is a secret'
}