const env = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    project: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.APPWRITE_API_KEY),
  },
};
export default env;
