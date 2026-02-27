import { Router } from "express"
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import { TeamController } from "../controllers/TeamController";
import { validateProjectExists } from "../middleware/project";


const projectRouter = Router();

projectRouter.use(authenticate)

projectRouter.param("projectId", validateProjectExists)

projectRouter.post("/",
    body("projectName")
        .notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("description")
        .notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.createProject);

projectRouter.get("/", ProjectController.getAllProjects);

projectRouter.get("/:projectId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.getProjectById);

projectRouter.put("/:projectId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    body("projectName")
        .notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("description")
        .notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.updateProject);

projectRouter.delete("/:projectId",
    param("projectId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.deleteProject);

export default projectRouter;