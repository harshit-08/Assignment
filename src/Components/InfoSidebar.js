import React from 'react'
import '../Css/infoSidebar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/counter/userSlice';

import { auth } from '../firebase'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function InfoSidebar() {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const logoutHandler = () => {
        auth.signOut()
            .then(() => {
                dispatch(logout())

            })

            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="infoSidebar">
            <div className="infoSidebar__img">
                <img src={user.profileURL} alt="" />
            </div>
            <div className="infoSidebar__userName">
                <h2>User Name</h2>
                <h3>{user.name}</h3>

            </div>
            <div className="infoSidebar__email">
                <h2>Email</h2>
                <h3>{user.email}</h3>
            </div>
            <div className="infoSidebar__verfified">
                <h2>Verified</h2>
                {user.verified ?
                    <CheckCircleIcon className="infoSidebar__verfified__check" /> :
                    <CancelIcon className="infoSidebar__verfified__cancel" />}


            </div>
            <div className="infoSidebar__logout">
                <button
                    onClick={logoutHandler}>
                    Logout
                </button>
                <ExitToAppIcon className="icon" />
            </div>
        </div>
    )
}

export default InfoSidebar
