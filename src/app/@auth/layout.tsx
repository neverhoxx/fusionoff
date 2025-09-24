"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClose = useCallback(() => {
        router.push('/')
    }, [router]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleClose]);

    const shouldShowDialog = pathname === "/login" || pathname === "/register";

    if (!shouldShowDialog) return null;

    return (
        <Dialog open onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-slate-900/80 backdrop-blur text-white">
                <DialogTitle>{title}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    );
}
