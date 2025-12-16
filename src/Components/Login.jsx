// src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap'
import axios from 'axios';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function Login() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const loginSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5286/api',
    timeout: 10000
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await api.post('/auth/login', values);
      localStorage.setItem('user-info', JSON.stringify(res.data.user));
      setShowAlert(true);
      reset();
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      alert('Login failed');
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 30 }}>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control my-2"
          type="name"
          placeholder="Name"
          {...register('name')}
        />
        {errors.name && (
          <small className="text-danger">{errors.name.message}</small>
        )}
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <small className="text-danger">{errors.email.message}</small>
        )}
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <small className="text-danger">{errors.password.message}</small>
        )}
        {showAlert && (
          <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
            You have successfully Logged IN!
          </Alert>
        )}

        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging...' : 'Login'}
        </button>
      </form>
    </div>
  );
}