import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { NoteController } from "../controllers/NoteController";
import { authenticate } from "../middleware/auth";
import { validateProjectExists } from "../middleware/project";
import { taskBelongsToProyect, validateTaskExists } from "../middleware/task";


const noteRouter = Router()

noteRouter.use(authenticate)
noteRouter.param("projectId", validateProjectExists)
noteRouter.param("taskId", validateTaskExists)
noteRouter.param("taskId", taskBelongsToProyect)

noteRouter.post("/:projectId/tasks/:taskId",
    body("content").notEmpty().withMessage("El contenido no puede ir vacio"),
    handleInputErrors,
    NoteController.createNote
)
noteRouter.get("/:projectId/tasks/:taskId",
    NoteController.getNotes
)
noteRouter.delete("/:projectId/tasks/:taskId/:noteId",
    param("noteId").isMongoId().withMessage("ID No valido"),
    handleInputErrors,
    NoteController.deleteNote
)



export default noteRouter;