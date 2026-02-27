import { Router } from "express";
import { validateProjectExists } from "../middleware/project";
import { handleInputErrors } from "../middleware/validation";
import { TeamController } from "../controllers/TeamController";
import { body, param } from "express-validator";
import { authenticate } from "../middleware/auth";

const teamRouter = Router()


teamRouter.use(authenticate)

teamRouter.param("projectId", validateProjectExists)


teamRouter.post("/:projectId/find",
    param("projectId").isMongoId().withMessage("ID no valido"),
    body("email").isEmail().toLowerCase().withMessage("Email no valido"),
    handleInputErrors,
    TeamController.findMemberByEmail
)
teamRouter.post("/:projectId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TeamController.addMemberById
)
teamRouter.get("/:projectId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TeamController.getProjectTeam
)
teamRouter.delete("/:projectId/:userId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    param("userId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TeamController.deleteMemberById
)


export default teamRouter;