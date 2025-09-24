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
            <a href=""> Confirmar Cuenta </a>
            <p>Ingresa el codigo: <b>${user.token}</b> </p>
            <p>Este token expira en 10 minutos !!</p>
            `
        })
    }
}