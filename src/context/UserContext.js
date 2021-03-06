import { createContext, useState, useEffect } from "react";
import { auth, analytics } from "../config/firebase";
import { createDbUser } from "../utils/user";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Config

    // State
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (authData) => {
        const newUser = await auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                const user = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: authData.displayName
                }
                auth.currentUser.updateProfile({
                    displayName: user.displayName
                })
                return user
            })
            .catch((error) => {
                throw error
            });
        await createDbUser(newUser)
        analytics.logEvent("sign_up")
        return newUser
    }

    const signIn = async (authData) => {
        const authResult = await auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                return result.user
            })
            .catch((error) => {
                console.log(error)
                throw error
            });
        analytics.logEvent("login")
        return authResult
    };

    const signOut = async () => {
        return await auth.signOut()
    };

    const resetPassword = async (email) => {
        return await auth.sendPasswordResetEmail(email)
    }

    // Set user on Auth Change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, []);

    // Set Cookies for SSR
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                // nookies.set(undefined, 'TBN-Token', '', { path: '/' });
            } else {
                // const token = await user.getIdToken();
                setCurrentUser(user);
                // nookies.set(undefined, 'TBN-Token', token, { path: '/' });
            }
        });
    }, []);


    // Context Value
    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword
    }

    return (
        <UserContext.Provider
            value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}