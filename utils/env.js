// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
const yup = require("yup");

/*eslint sort-keys: "error"*/
const envSchema = yup.object({
  DATABASE_URL: yup.string().required(),
  JWT_SECRET: yup.string().required(),
  NODE_ENV: yup.mixed().oneOf(["development", "test", "production"]),
  TRPC_API_URL: yup.string().required(),
});

const env = envSchema.validateSync(process.env);

if (!env) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env, null, 4)
  );

  process.exit(1);
}
module.exports.env = env;
