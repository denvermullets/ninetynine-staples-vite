// i was deconstructing these but typescript hated it as it could be undefined
const API_URL = import.meta.env.VITE_APP_API_URL || "";

if (!API_URL) {
  console.error("Missing API environment variable");
}

const config = {
  API_URL,
};

export default config;
