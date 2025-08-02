import {Router} from 'express'
import {login, register, verify2FA} from "../controllers/auth-controller";
import {validateRequest} from "../middlewares/validate-request";
import {postRegisterRequest} from "../request-validation/post-register";
import {postLoginRequest} from "../request-validation/post-login";
import {postVerify2FARequest} from "../request-validation/post-verify-2fa";
import {loginProcessRateLimiter, OTPRateLimiter, registerRateLimiter} from "../middlewares/rate-limiter";

const authRouter = Router();

authRouter.post("/register", registerRateLimiter, validateRequest(postRegisterRequest), register)
authRouter.post("/login", loginProcessRateLimiter, OTPRateLimiter, validateRequest(postLoginRequest), login)
authRouter.post("/two-factor/verify", loginProcessRateLimiter, validateRequest(postVerify2FARequest), verify2FA)

export {authRouter};