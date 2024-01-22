import NextAuth, {type NextAuthConfig, User} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {jwtDecode} from "jwt-decode";
import {AuthDatasourcesImpl} from "@/app/api/infrastructure/datasources/authDatasourcesImpl";
import {AuthRepositoryImpl} from "@/app/api/infrastructure/repositories/authRepositoryImpl";

interface DecodedToken {
    uuid: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
}

export const authConfig: NextAuthConfig = {
    trustHost: true,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            console.log({ auth });
            // const isLoggedIn = !!auth?.user;

            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //   if (isLoggedIn) return true;
            //   return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //   return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },

        jwt({ token, user }) {
            if ( user ) {
                token.data = user;
                const myUser = user as any;
                token.name = myUser.name;
                token.email = myUser.email;
                token.username = myUser.username;
                token.token = myUser.token;
                const decodedToken: DecodedToken = jwtDecode(myUser.token);
                token.uuid = decodedToken.uuid;
            }

            return token;
        },

        session({ session, token, user }) {
            session.user = token.data as any;
            return session;
        },
    },

    providers: [

        Credentials({
            async authorize(credentials): Promise<User | null> {
                const authDatasource = new AuthDatasourcesImpl();
                const authRepository = new AuthRepositoryImpl(authDatasource);
                const authData = {
                    email: (credentials.email as string),
                    password: (credentials.password as string),
                };

                try {
                    const response = await authRepository.loginUser(authData);
                    return response as any;
                } catch (error) {
                    return null;
                }
            }

        }),
    ]
}

export const {  signIn, signOut, auth, handlers } = NextAuth( authConfig );