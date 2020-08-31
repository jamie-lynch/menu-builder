export default async (): Promise<null> => {
  if (!process.env.APP_ENV) {
    await require("dotenv").config({ path: ".env.test" });
  }

  return null;
};
