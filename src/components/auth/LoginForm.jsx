import React from 'react';
import { useForm } from 'react-hook-form';
import Field from '../common/Field';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate()

    const { setAuth } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm()

    const submitForm = async (formData) => {
        try {
            const respons = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

            if (respons.status === 200) {
                const { token, user } = respons.data;
                if (token) {
                    const authToken = token.token;
                    const refreshToken = token.refreshToken;

                    console.log(`Login time token: ${authToken}`);
                    setAuth({ user, authToken, refreshToken })

                    navigate("/")
                }
            }




        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `User with Email ${formData.email} is not found`
            })
        }


    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className='border-b border-[#3F3F3F] pb-10 lg:pb-[60px]'>
            <Field label="Email" error={errors.email}>
                <input
                    {...register("email", { required: "Email id is required" })}
                    className={`auth-input ${!!errors.email ? "border-red-500" : "border-gray-200"}`}
                    type="email" name="email" id="email" />
            </Field>

            <Field label="Password" error={errors.password}>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be 8 character"
                        }
                    })}

                    className={`auth-input ${!!errors.password ? "border-red-500" : "border-gray-200"}`}
                    type="password" name="password" id="password" />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >Submit </button>
            </Field>
        </form>
    )
};

export default LoginForm;