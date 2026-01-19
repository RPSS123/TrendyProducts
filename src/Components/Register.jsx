// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function Register() {

  const navigate = useNavigate();

  const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  // baseURL: use env var or default to your API
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7057/api',
    timeout: 10000
  });

  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setApiError(null);
    try {
      const res = await api.post('/auth/register', values);
      if (res) {
        // For prototype/demo: store token in localStorage (ok for demo)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user-info', JSON.stringify(res.data.user));

        // Redirect to home (or to profile / email verification page)
        navigate('/');
      } else {
        // If API returns something else, show raw message
        setApiError('Registered but no token returned.');
      }
    } catch (err) {
      // Backend returns 409 Conflict when email exists - handle that
      if (err.response) {
        if (err.response.status === 409 || err.response.status === 400) {
          setApiError(err.response.data?.message || err.response.data || 'Email already registered');
        } else {
          setApiError(err.response.data?.message || 'Server error during registration');
        }
      } else {
        setApiError('Network error: could not reach server');
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, marginTop: 30 }}>
      <h1>Registration</h1>

      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          className="form-control my-2"
          placeholder="Full name"
          {...register('name')}
          disabled={isSubmitting}
          required
        />
        {errors.name && (
          <small className="text-danger">{errors.name.message}</small>
        )}
        <input
          className="form-control my-2"
          placeholder="Email"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
          required
        />
        {errors.name && (
          <small className="text-danger">{errors.email.message}</small>
        )}
        <input
          className="form-control my-2"
          placeholder="Password (min 6 chars)"
          type="password"
          {...register('password')}
          disabled={isSubmitting}
          required
        />
        {errors.name && (
          <small className="text-danger">{errors.password.message}</small>
        )}
        <button className="btn btn-success w-100" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
