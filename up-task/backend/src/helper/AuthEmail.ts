import { transporter } from "../config/nodemail"

interface IEmail {
    email: string,
    name: string,
    token: string
}
export class AuthEmail {
    static sendConfirmationEMail = async (user: IEmail) => {
        await transporter.sendMail({
            from: "UpTask <admin@uptask.com>",
            to: user.email,
            subject: "UpTask - Confirma tu Cuenta",
            text: " Up Task - Confirma tu Cuenta",
            html: `<p>Hola ${user.name}, has creado tu cuenta en UpTask , ya casi esta todo listo , solo debes confirmar
            tu cuenta </p>
            <p>Visita el siguiente enlace :</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account"> Confirmar Cuenta </a>
            <p>Ingresa el codigo: <b>${user.token}</b> </p>
            <p>Este token expira en 10 minutos !!</p>
            `
        })
    }
    static sendPasswordResetToken = async (user: IEmail) => {
        await transporter.sendMail({
            from: "UpTask <admin@uptask.com>",
            to: user.email,
            subject: "UpTask - Reestablece tu password",
            text: " Up Task - Reestablece tu password",
            html: `<p>Hola ${user.name}, has solicitado reestablecer tu contraseña </p>
            <p>Visita el siguiente enlace :</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password"> Reestablecer Password </a>
            <p>Ingresa el codigo: <b>${user.token}</b> </p>
            <p>Este token expira en 10 minutos !!</p>
            `
        })
    }
}