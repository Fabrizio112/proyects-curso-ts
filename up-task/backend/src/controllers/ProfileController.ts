import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../helper/auth"


export class ProfileController {

    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body

        const userExists = await User.findOne({ email })
        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            const error = new Error("Ese email ya esta registrado")
            return res.status(409).json({ error: error.message })
        }

        req.user.name = name
        req.user.email = email

        try {
            await req.user.save()
            res.send("Perfil Actualizado Correctamente")
        } catch (error) {
            res.status(500).send("Hubo un error ")
        }
    }
    static updatePassword = async (req: Request, res: Response) => {
        const { current_password, password } = req.body

        const user = await User.findById(req.user.id)

        const isPasswordCorrect = await checkPassword(current_password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error("El password actual es incorrecto")
            return res.status(401).json({ error: error.message })
        }
        try {
            user.password = await hashPassword(password)
            await user.save()
            res.send("El password se modifico exitosamente")
        } catch (error) {
            res.status(500).send("Hubo un error ")
        }

    }
}