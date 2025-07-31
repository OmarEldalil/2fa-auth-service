import {Router} from 'express'
import {
    handlePasswordUpdateRequest,
    updateUserInformation,
    updateUserPassword
} from "../controllers/user-controller";
import {validateRequest} from "../middlewares/validate-request";
import {patchUserInformationRequest} from "../request-validation/patch-user-information";
import {authenticate} from "../middlewares/authenticate";
import {postUpdatePasswordRequestRequest} from "../request-validation/post-update-password-request";
import {patchUserPasswordRequest} from "../request-validation/patch-user-password";

const usersRouter = Router();

usersRouter.use(authenticate);

// to update user information
usersRouter.patch("/me/information", validateRequest(patchUserInformationRequest), updateUserInformation)

// request a new password OTP
usersRouter.post("/me/password/request", validateRequest(postUpdatePasswordRequestRequest), handlePasswordUpdateRequest)

// update password using OTP
usersRouter.patch("/me/password", validateRequest(patchUserPasswordRequest), updateUserPassword)

export {usersRouter};