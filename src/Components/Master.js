import React, { useEffect } from 'react'
import { selectUser } from '../features/counter/userSlice';
import Login from '../Components/Login'
import { useSelector, useDispatch } from 'react-redux';
import Console from '../Components/Console'
import '../Css/master.css'
import { auth } from '../firebase'
import { login } from '../features/counter/userSlice'

function Master() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                dispatch(login({
                    name: user.displayName,
                    email: user.email,
                    profileURL: user.photoURL,
                    emailVerified: user.emailVerified
                }))
            }
        });

    }, [])

    return (
        <div>
            {user === null ? <Login /> : <Console />}
        </div>
    )
}

export default Master
