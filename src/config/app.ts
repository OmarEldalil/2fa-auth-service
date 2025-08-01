import {CommunicationProviders} from "../constants/communication";

export const APP_ENV = process.env.APP_ENV || "production";
export const APP_URL = process.env.APP_URL || "http://localhost:3000";
export const DB_URL = process.env.DB_URL || "postgresql://postgres:secret@localhost:5432/auth";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "your-twilio-account-sid";
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "your-twilio-auth-token";
export const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID || "your-twilio-messaging-service-sid";
export const DEFAULT_TO_TEST_SMS = process.env.DEFAULT_TO_TEST_SMS || "+18777804236";
export const DEFAULT_SMS_PROVIDER = (Object.keys(CommunicationProviders).includes(process.env.DEFAULT_SMS_PROVIDER || '') ? process.env.DEFAULT_SMS_PROVIDER : CommunicationProviders.Console) as CommunicationProviders;

export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET || "some-secret-key";
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET || "some-secret-key";
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "4w";