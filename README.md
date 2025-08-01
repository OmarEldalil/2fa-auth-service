# MFA Service

A robust Multi-Factor Authentication (MFA) service built with TypeScript, Express.js, TypeORM, and Redis. This service provides secure user authentication with SMS-based two-factor authentication, rate limiting, and configurable SMS providers.

## Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **Multi-Factor Authentication**: SMS-based 2FA using configurable providers
- **Rate Limiting**: Rate limiting with `express-rate-limit`
- **Strategy Pattern**: Pluggable SMS providers (Twilio, Console logging)
- **Database Support**: PostgreSQL with TypeORM
- **Caching**: Redis for session management and rate limiting
- **Docker Support**: Full containerization with Docker Compose
- **Security**: Password hashing, input validation, and comprehensive error handling

## Prerequisites

- Docker
- Twilio account (optional, for SMS functionality)

## Installation & Setup

### Docker Compose

1. **Clone the repository**
   ```bash
   git clone git@github.com:OmarEldalil/2fa-auth-service.git
   cd MFA-service
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5. **Verify services are running**
   ```bash
   docker-compose ps
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
APP_ENV=development
APP_URL=http://localhost:3000
PORT=3000

# Database
DB_URL=postgresql://postgres:secret@localhost:5432/auth

# Redis
REDIS_URL=redis://localhost:6379

# JWT Configuration
ACCESS_JWT_SECRET=your-super-secret-jwt-key
REFRESH_JWT_SECRET=your-super-secret-refresh-key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=4w

# SMS Provider Configuration
DEFAULT_SMS_PROVIDER=Console
# Options: Twilio, Console

# Twilio Configuration (required if using Twilio provider)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_VERIFY_SERVICE_SID=your-twilio-verify-service-sid
DEFAULT_TO_TEST_SMS=+1234567890
```

## SMS Communication Strategy Pattern

The application implements the **Strategy Pattern** for SMS communication, allowing you to easily switch between different SMS providers without changing the core business logic.

### Architecture Overview

```
SMSCommunicationService
    ↓
SMSProviderInterface (Strategy Interface)
    ↓
Concrete Strategies:
├── TwilioProvider
├── ConsoleProvider
└── [Your Custom Provider]
```

### Available SMS Providers

#### 1. Console Provider (Default)
- **Use Case**: Development and testing
- **Configuration**: Set `DEFAULT_SMS_PROVIDER=Console`
- **Behavior**: Logs SMS messages to console instead of sending actual SMS

#### 2. Twilio Provider
- **Use Case**: Production SMS sending
- **Configuration**: Set `DEFAULT_SMS_PROVIDER=Twilio`
- **Requirements**: Valid Twilio credentials in environment variables

### Changing SMS Implementation

#### Via Environment Configuration

The easiest way to switch SMS providers is through environment variables:

```env
# For development/testing
DEFAULT_SMS_PROVIDER=Console

# For production with Twilio
DEFAULT_SMS_PROVIDER=Twilio
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_VERIFY_SERVICE_SID=your-verify-service-sid
```

#### Adding a Custom SMS Provider

1. **Create a new provider class**:
   ```typescript
   // src/services/communication/sms/strategies/custom-provider.ts
   import { SMSCommunicationProviderInterface } from '../sms-provider-interface';

   export class CustomSMSProvider implements SMSCommunicationProviderInterface {
     async send(to: string, message: string): Promise<void> {
       // Your custom SMS implementation
       console.log(`Custom SMS to ${to}: ${message}`);
     }
   }

   export const customProvider = new CustomSMSProvider();
   ```

2. **Register the provider**:
   ```typescript
   // src/constants/communication.ts
   export enum CommunicationProviders {
     Twilio = "Twilio",
     Console = "Console",
     Custom = "Custom", // Add your provider
   }
   ```

3. **Add to strategy index**:
   ```typescript
   // src/services/communication/sms/strategies/index.ts
   import { customProvider } from './custom-provider';

   export default {
     [CommunicationProviders.Twilio]: twilioObj,
     [CommunicationProviders.Console]: consoleSms,
     [CommunicationProviders.Custom]: customProvider, // Register here
   };
   ```

4. **Use your provider**:
   ```env
   DEFAULT_SMS_PROVIDER=Custom
   ```

### Strategy Pattern Benefits

- **Loose Coupling**: Business logic is decoupled from SMS implementation details
- **Easy Testing**: Switch to Console provider for testing without actual SMS costs
- **Extensibility**: Add new providers without modifying existing code
- **Runtime Switching**: Change providers via configuration without code deployment
- **Provider Fallback**: Can implement fallback mechanisms between providers

## API Endpoints

### Authentication

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/auth/register` | Register new user | No specific limit |
| POST | `/auth/login` | User login (returns transient token) | 10 requests/5min + 3 OTP requests/5min |
| POST | `/auth/two-factor/verify` | Verify 2FA code | 10 requests/5min |

### User Management (Authenticated Routes)

All user routes require authentication via Bearer token.

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| PATCH | `/users/me/information` | Update user profile information | No specific limit |
| POST | `/users/me/password/request` | Request OTP for password change | 3 requests/5min |
| PATCH | `/users/me/password` | Update password using OTP | No specific limit |

## Rate Limiting Strategy

The application implements comprehensive rate limiting with the following configurations:

- **OTP Rate Limiter**: 3 requests per 5 minutes (applied to OTP-related endpoints)
  - Used on `/auth/login` and `/users/me/password/request`
  - Only counts failed requests (`skipSuccessfulRequests: true`)
  
- **Login Process Rate Limiter**: 10 requests per 5 minutes (applied to authentication flow)
  - Used on `/auth/login` and `/auth/two-factor/verify`
  - Only counts failed requests (`skipSuccessfulRequests: true`)

- **IP-based tracking**: Rate limits are enforced per IP address with support for `x-forwarded-for` headers
- **Smart counting**: Most limiters skip successful requests to avoid penalizing legitimate users
- **Configurable windows**: Different time windows for different endpoint types

### Rate Limiter Types

1. **OTPRateLimiter**: Prevents OTP spam and brute force attacks on OTP generation
2. **loginProcessRateLimiter**: Protects the entire login flow from abuse
3. **generalRateLimiter**: Available for general API protection (100 requests/5min)

## Developer Q&A

### How much time did you spend working on the solution?
**6-8 hours roughly**

The time was distributed across:
- Initial project setup and architecture design
- Implementing the core authentication flow with JWT tokens
- Building the SMS communication strategy pattern
- Adding comprehensive rate limiting with Redis
- Docker containerization and environment configuration
- Documentation and code refinement

### What's the part of the solution you are most proud of?

**Communication Strategy Pattern**
- The SMS communication system uses the Strategy Pattern, making it incredibly easy to switch between different providers (Twilio, Console, etc.) without changing any business logic
- This design adheres to the **Open/Closed Principle** - the system is open for extension (new SMS providers) but closed for modification (existing business logic remains untouched)
- Runtime configuration switching via environment variables or on-demand change provides operational flexibility

**Reusable OTP Handling**
- The OTP functionality is designed as a reusable service that can be leveraged across different flows (login 2FA, password reset, etc.)
- Clean separation between OTP generation, storage, and verification logic
- Configurable expiration and validation rules

**Comprehensive Rate Limiting**
- Multi-layered rate limiting strategy to mitigate various attack vectors:
  - Brute force login attempts
  - OTP spam/flooding
  - General API abuse
- Smart rate limiting that skips successful requests to avoid penalizing legitimate users

**JWT Token Architecture**
- Implemented both access and refresh token pattern for enhanced security
- Transient tokens for 2FA flow provide additional security layer
- Proper token expiration and validation handling

### If you had more time, what other things would you like to do?

**Testing Infrastructure**
- **Unit Tests**: Comprehensive Jest test suites for all services, repositories, and controllers
- **Integration Tests**: End-to-end API testing with test database
- **Mock Strategies**: Mock SMS providers for testing without actual SMS costs
- **Load Testing**: Performance testing for rate limiting and high-concurrency scenarios

**Enhanced Rate Limiting**
- Redis-based rate limiting storage (currently using in-memory) for true horizontal scaling
- Rate limiting consistency across multiple server instances

**Extended Communication Interface**
- Broader communication service interface supporting multiple channels:
  - Email OTP delivery
  - Push notifications
  - Voice calls for OTP delivery
- Multi-channel fallback mechanisms (SMS → Email → Voice)

**Advanced MFA Options**
- **TOTP (Time-based OTP)**: Google Authenticator, Authy integration
- **WebAuthn/Passkeys**: Biometric and hardware key authentication
- **Backup Codes**: Single-use recovery codes
- **Risk-based Authentication**: Location and device-based MFA triggers

**Additional Enhancements**
- **API Documentation**: OpenAPI/Swagger documentation with interactive testing
- **Monitoring & Observability**: Metrics, tracing, and health checks
- **Security Headers**: CORS, CSP, HSTS implementation
- **Database Migrations**: Proper migration system for schema changes

### Do you have any feedback regarding this coding challenge?

**Overall Experience**: The challenge was well-structured and covered key aspects of modern authentication systems.

**Clarity Suggestion**: It would be helpful to be more explicit about certain requirements, such as:
- **Email uniqueness constraint** (I assumed emails should be unique, which is standard practice)


### Notes
- I kept Copilot agent mode usage as minimum, used it for generating the README and some code completions.