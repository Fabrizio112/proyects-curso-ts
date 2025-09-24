import type { Request, Response } from "express"
import User from "../models/User"
import { genSalt, hash } from "bcrypt"
import { checkPassword, hashPassword } from "../helper/auth"
import Token from "../models/Token"
import { generateToken } from "../helper/token"
import { transporter } from "../config/nodemail"
import { AuthEmail } from "../helper/authEmail"

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            const userExists = await User.findOne({ email })

            if (userExists) {
                const error = new Error("El Usuario ya esta registrado")
                return res.status(409).json({ error: error.message })
            }

            const user = new User(req.body)
            user.password = await hashPassword(password)

            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            AuthEmail.sendConfirmationEMail({
                email: user.email,
                name: user.name,
                token: token.token
            })


            await Promise.allSettled([user.save(), token.save()])
            res.send("Cuenta creada , revisa el email para confirmarla")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error("Token no valido")
                return res.status(404).json({ error: error.message })
            }
            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send("Cuenta confirmada correctamente")

        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("Usuario no encontrado")
                return res.status(404).json({ error: error.message })
            }
            if (!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()

                AuthEmail.sendConfirmationEMail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error("La cuenta no ha sido confirmada , se ha enviado un email de confirmacion")
                return res.status(401).json({ error: error.message })
            }
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("Password Incorrecto")
                return res.status(404).json({ error: error.message })
            }
            res.status(200).json("Usuario Autenticado Correctamente")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" })
        }
    }
}