import {Router} from "express"
import {body,param} from "express-validator"
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";


const projectRouter=Router();

projectRouter.post("/",
    body("projectName")
    .notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
    .notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("description")
    .notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.createProject);

projectRouter.get("/",ProjectController.getAllProjects);

projectRouter.get("/:id",
    param("id").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.getProjectById);

projectRouter.put("/:id",
    param("id").isMongoId().withMessage("ID no valido"),
    body("projectName")
    .notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
    .notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("description")
    .notEmpty().withMessage("La descripcion es obligatoria"),
    handleInputErrors,
    ProjectController.updateProject);

projectRouter.delete("/:id",
    param("id").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    ProjectController.deleteProject);

export default projectRouter;