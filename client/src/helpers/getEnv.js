export const getEnv = (envname) => {
     const value = import.meta.env[envname];
  if (!value) {
    throw new Error(`Missing env variable: ${envname}`);
  }
  return value;
}