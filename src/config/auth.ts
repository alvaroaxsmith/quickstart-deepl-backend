import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn(
    "Warning: JWT_SECRET is not set in .env file. Using a default, insecure key. This is not safe for production."
  );
}

export const jwtConstants = {
  secret: JWT_SECRET || "your_default_secret_key_that_is_not_secure",
};
