import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";


const authRouter = Router()


authRouter.post("/create-account",
    body("name")
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body("password")
        .isLength({ min: 8 }).withMessage("El password debe tener minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Los password no son iguales")
        }
        return true
    }),
    body("email")
        .isEmail().withMessage("Email no valido"),
    handleInputErrors,
    AuthController.createAccount)

authRouter.post("/confirm-account",
    body("token")
        .notEmpty().withMessage("El token no puede ir vacio"),
    handleInputErrors,
    AuthController.confirmAccount
)

authRouter.post("/login",
    body("email")
        .isEmail().withMessage("Email no valido"),
    body("password")
        .notEmpty().withMessage("El password no puede ir vacio"),
    handleInputErrors,
    AuthController.login
)
authRouter.post("/request-code",
    body("email")
        .isEmail().withMessage("Email no valido"),
    handleInputErrors,
    AuthController.confirmationCode
)
authRouter.post("/forgot-password",
    body("email")
        .isEmail().withMessage("Email no valido"),
    handleInputErrors,
    AuthController.forgotPassword
)
authRouter.post("/validate-token",
    body("token")
        .notEmpty().withMessage("El token no puede ir vacio"),
    handleInputErrors,
    AuthController.validateToken
)
authRouter.post("/update-password/:token",
    param("token")
        .isNumeric().withMessage("Token no valido"),
    body("password")
        .isLength({ min: 8 }).withMessage("El password debe tener minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Los password no son iguales")
        }
        return true
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

authRouter.get("/user", authenticate,
    AuthController.user
)
authRouter.get("/check-password",
    authenticate,
    body("password")
        .notEmpty().withMessage("El password no puede ir vacio"),
    handleInputErrors,
    AuthController.checkPassword
)

export default authRouter;