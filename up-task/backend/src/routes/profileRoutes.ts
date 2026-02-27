import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { ProfileController } from "../controllers/ProfileController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";



const profileRouter = Router()

profileRouter.use(authenticate)

profileRouter.put("/",
    body("name")
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body("email")
        .isEmail().withMessage("Email no valido"),
    handleInputErrors,
    ProfileController.updateProfile
)
profileRouter.post("/update-password",
    body("current_password")
        .notEmpty().withMessage("El password actual no puede ir vacio"),
    body("password")
        .isLength({ min: 8 }).withMessage("El password debe tener minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Los password no son iguales")
        }
        return true
    }),
    handleInputErrors,
    ProfileController.updatePassword
)

export default profileRouter