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
                    console.log(response);
                } catch (error) {
                    if(error instanceof AxiosError){
                        const axiosErrors = error.response.data
                        console.log(axiosErrors)
                    }
                }

                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            }
        })
    ],
    callbacks: {
        // jwt({account, token, user, profile, session}){
        //     if(user) token.user = user
        //     console.log(token);
        //     return token
        // },
        // session({session, token}){
        //     console.log(session, token)
        //     session.user = token.user
        //     return session
        // }
    }
})

export { handler as GET, handler as POST }