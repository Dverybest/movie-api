export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret:process.env.JWT_SECRET,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
  },
});