"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/@auth/layout";

import Link from "next/link";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error);
        } else {
            window.location.href = "/";
        }
    };

    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push("/register");
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500">{error}</p>}
                <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    className="text-white"
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    className="text-white"
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
                <button type="submit" className="bg-white text-black border-black p-2 rounded cursor-pointer">Login</button>

                <p className="text-white">
                    Haven’t account?{" "}
                    <Link
                        href="/register"
                        className="underline font-bold cursor-pointer"
                        onClick={handleClick}
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>

    );
}
