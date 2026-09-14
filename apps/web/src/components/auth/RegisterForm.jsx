"use client";

import {useState} from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setError("");
        setSuccess(false);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Registration failed.");
                return;
            }

            setSuccess(true);
            form.reset();
        } catch {
            setError("Could not conect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    autoComplete="name" 
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    autoComplete="email" 
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    autoComplete="new-password" 
                    minLength={8} 
                    maxLength={128} 
                    required 
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Creating acount..." : "Register"}
            </button>

            {error && <p role="alert">{error}</p>}
            {success && <p role="status">Your acount has been created.</p>}
        </form>
    );
}