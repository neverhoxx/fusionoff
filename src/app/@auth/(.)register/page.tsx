"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/@auth/layout";

export default function RegisterForm() {
    const [form, setForm] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                try {
                    const data = await res.json();
                    setError(data.error || "Unknown error");
                } catch {
                    setError("Unexpected server error");
                }
            } else {
                router.push("/");
            }
        } catch {
            setError("Network error");
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push("/login");
    };

    return (
        <AuthLayout title="Sing up">
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
                    type="text"
                    placeholder="Username"
                    required
                    value={form.username}
                    className="text-white"
                    onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    className="text-white"
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />

                <button type="submit" className="bg-white text-black p-2 rounded cursor-pointer">
                    Sign Up
                </button>

                <p className="text-white">
                    Haven’t account?{" "}
                    <a
                        href="/login"
                        className="underline font-bold cursor-pointer"
                        onClick={handleClick}
                    >
                        Sign in
                    </a>
                </p>
            </form>
        </AuthLayout>
    )
        ;
}
