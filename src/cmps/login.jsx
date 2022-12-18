import { CacheProvider } from "@emotion/react";
import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { prefixer } from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../store/actions/user.action";
import { useNavigate } from "react-router-dom";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { userService } from "../services/user.service";
import { getPagByUsername, removePagFromState } from "../store/actions/pagita.action";

export function Login() {
    const user = useSelector(state => state.userReducer.user)
    const message = useSelector(state => state.userReducer.msg)
    const navigate = useNavigate()

    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const dispatch = useDispatch()

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onLogin = (ev) => {
        ev.preventDefault()
        dispatch(logIn(values))
        const { username, password } = values
        if (!username || !password) return
        dispatch(getPagByUsername())
        navigate('/')


    }
    const onLogout = () => {
        dispatch(logOut())
        dispatch(removePagFromState())
        navigate('/')
    }
    return <div className="login-container">

        {user ? <div className="logout">
            <h2>האם אתה בטוח שברצונך לצאת? </h2>
            <div className="button-container">
                <button onClick={() => navigate('/')} className="no"> לא </button>
                <button onClick={onLogout} className="yes"> כן </button>
            </div>
        </div>
            :
            <div className="login">
                <div className="title">
                    <h1>התחברות</h1>
                </div>
                <form onSubmit={onLogin}>
                    <CacheProvider value={cacheRtl}>
                        <TextField className="tel" name="tel"
                            onChange={handleChange('username')}
                            type='tel' id="outlined-basic" dir="rtl"
                            label="שם משתמש" variant="outlined"
                            value={values.username}

                        />
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="סיסמא"
                        />
                    </CacheProvider>
                    {message && <div className=" message">{message} <DoDisturbOnIcon /></div>}

                    <button className="button"> התחבר</button>
                </form>
            </div>}
    </div >
}