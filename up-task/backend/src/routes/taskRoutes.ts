import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { taskBelongsToProyect, validateTaskExists } from "../middleware/task";


const taskRouter=Router()

taskRouter.param("projectId",validateProjectExists)

taskRouter.post("/:projectId/tasks",
    body("name")
        .notEmpty().withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty().withMessage("La descripcion  es obligatorio"),
    handleInputErrors,
    TaskController.createTask);


taskRouter.get("/:projectId/tasks",TaskController.getAllTask);

taskRouter.param("taskId",validateTaskExists)
taskRouter.param("taskId",taskBelongsToProyect)

taskRouter.get("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TaskController.getTaskByID);

taskRouter.put("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no valido"),
    body("name")
        .notEmpty().withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty().withMessage("La descripcion  es obligatorio"),
    handleInputErrors,
    TaskController.updateTask);

taskRouter.delete("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no valido"),
    handleInputErrors,
    TaskController.deleteTask);

taskRouter.post("/:projectId/tasks/:taskId/status"),
    param("taskId").isMongoId().withMessage("ID no valido"),
    body("status").notEmpty().withMessage("El estado no puede ir vacio"),
    handleInputErrors,
    TaskController.updateStatus;


export default taskRouter;