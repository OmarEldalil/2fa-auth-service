export const APP_ENV = process.env.APP_ENV || "production";
export const DB_URL = process.env.DB_URL || "postgresql://postgres:secret@localhost:5432/auth";
export const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const TWILIO_ACCOUNT_SID =  process.env.TWILIO_ACCOUNT_SID || "your-twilio-account-sid";
export const TWILIO_AUTH_TOKEN =  process.env.TWILIO_AUTH_TOKEN || "your-twilio-auth-token";
export const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID || "your-twilio-messaging-service-sid";
export const DEFAULT_TO_TEST_SMS = process.env.DEFAULT_TO_TEST_SMS || "+1234567890";