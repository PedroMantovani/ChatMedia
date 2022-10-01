import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { logIn, signUp } from '../../actions/AuthActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpass: '',
    }
    const loading = useSelector((state) => state.authReducer.loading)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSignUp, setIsSignUp] = useState(false)

    const [data, setData] = useState(initialState)

    const [confirmPass, setConfirmPass] = useState(true)

    // Reset Form
    const resetForm = () => {
        setData(initialState)
        setConfirmPass(confirmPass)
    }

    // handle Change in input
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // Form Submission
    const handleSubmit = (e) => {
        setConfirmPass(true)
        e.preventDefault()
        if (isSignUp) {
            data.password === data.confirmpass
                ? dispatch(signUp(data, navigate))
                : setConfirmPass(false)
        } else {
            dispatch(logIn(data, navigate))
        }
    }

    return (
        <div className="Auth">
            {/* left side */}

            <div className="a-left">
                <img src={Logo} alt="Logo Chat Media" />

                <div className="Webname">
                    <h1>Chat Media</h1>
                    <h6>Explore ideias através de conversas!</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? 'Register' : 'Login'}</h3>
                    {isSignUp && (
                        <div>
                            <input
                                required
                                type="text"
                                placeholder="Primeiro Nome"
                                className="infoInput"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Último Nome"
                                className="infoInput"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div>
                        <input
                            required
                            type="text"
                            placeholder="E-mail"
                            className="infoInput"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="password"
                            placeholder="Senha"
                            className="infoInput"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        {isSignUp && (
                            <input
                                required
                                type="password"
                                placeholder="Confirmar Senha"
                                className="infoInput"
                                name="confirmpass"
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            alignSelf: 'flex-end',
                            marginRight: '5px',
                            display: confirmPass ? 'none' : 'block',
                        }}
                        onClick={() => {
                            resetForm()
                            setIsSignUp((prev) => !prev)
                        }}
                    >
                        *As senhas não batem!
                    </span>
                    <div>
                        <span
                            style={{
                                fontSize: '12px',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                            onClick={() => {
                                resetForm()
                                setIsSignUp((prev) => !prev)
                            }}
                        >
                            {isSignUp
                                ? 'Você já tem uma conta? faça login!'
                                : 'Não tem uma conta? Crie uma!'}
                        </span>
                        <button
                            className="button infoButton"
                            type="Submit"
                            disabled={loading}
                        >
                            {loading
                                ? 'Loading...'
                                : isSignUp
                                ? 'SignUp'
                                : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth
