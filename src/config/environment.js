const DATABASE_STORAGE_PATH = 'git-explorer.sqlite';
const DATABASE_TYPE = 'sqlite';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

module.exports = {
    DATABASE_STORAGE_PATH,
    DATABASE_TYPE,
    JWT_SECRET
}
