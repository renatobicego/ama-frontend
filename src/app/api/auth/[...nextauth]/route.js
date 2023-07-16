import axios, { AxiosError } from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@mail.com" },
                contraseña: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_URL_API}/auth/login`, 
                        {
                            email: credentials.email,
                            password: credentials.contraseña
                        }
                    )
                    return response.data
                } catch (error) {
                    if(error instanceof AxiosError){
                        const axiosErrors = error.response.data
                        throw new Error(axiosErrors)
                    }else{
                        throw new Error(error)
                    }
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session({session, token}){
            session.user = token
            console.log(session);
            return session
        }
    }
})

export { handler as GET, handler as POST }