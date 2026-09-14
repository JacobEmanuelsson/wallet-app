"use client";

import {useState} from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
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

        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Login failed.");
                return;
            }

            setSuccess(true);
            form.reset();
        } catch {
            setError("Could not connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

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
                    autoComplete="current-password" 
                    minLength={8} 
                    maxLength={128} 
                    required 
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Logging in" : "Login"}
            </button>

            {error && <p role="alert">{error}</p>}
            {success && <p role="status">You have logged in</p>}
        </form>
    );
}