"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import styles from "./register.module.css";
import { env } from "node:process";

type FormErrors = {
  displayName?: string;
  email?: string;
  password?: string;
  form?: string;
};

export default function RegisterForm() {
    const router = useRouter();

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const displayName = String(formData.get("displayName") || "").trim();
        const email = String(formData.get("email") || "")
        .trim()
        .toLowerCase();
        const password = String(formData.get("password") || "");

        // frontend validation
        const validationErrors: FormErrors = {};

        if (displayName.length < 3) {
        validationErrors.displayName =
            "Display name must be at least 3 characters";
        } else if (displayName.length > 32) {
        validationErrors.displayName =
            "Display name must be no more than 32 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        validationErrors.email = "Enter a valid email address";
        }

        if (password.length < 8) {
        validationErrors.password =
            "Password must be at least 8 characters";
        } else if (password.length > 64) {
        validationErrors.password =
            "Password must be no more than 64 characters";
        }

        setErrors(validationErrors);

        // if we have validation error dont send api req
        if (Object.keys(validationErrors).length > 0) {
        return;
        }

        setIsSubmitting(true);

        try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                displayName
            }),
            },
        );

        const result = await response.json();

        if (!response.ok) {
            setErrors({
            form: result.error || "Registration failed",
            });

            return;
        }

        
        router.push("/user/login?registered=1");
        } catch {
        setErrors({
            form: "Could not connect to the API",
        });
        } finally {
        setIsSubmitting(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
            fullWidth
            isRequired
            isInvalid={Boolean(errors.displayName)}
            name="displayName"
            className={styles.field}
        >
            <Label className={styles.label}>Display name</Label>

            <Input
            fullWidth
            type="text"
            autoComplete="name"
            placeholder="How should we call you?"
            className={styles.input}
            variant="secondary"
            />

            <FieldError>{errors.displayName}</FieldError>
        </TextField>

        <TextField
            fullWidth
            isRequired
            isInvalid={Boolean(errors.email)}
            name="email"
            type="email"
            className={styles.field}
        >
            <Label className={styles.label}>Email</Label>

            <Input
            fullWidth
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
            variant="secondary"
            />

            <FieldError>{errors.email}</FieldError>
        </TextField>

        <TextField
            fullWidth
            isRequired
            isInvalid={Boolean(errors.password)}
            name="password"
            type="password"
            className={styles.field}
        >
            <Label className={styles.label}>Password</Label>

            <Input
            fullWidth
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={styles.input}
            variant="secondary"
            />

            <FieldError>{errors.password}</FieldError>
        </TextField>

        {errors.form && (
            <p role="alert" className={styles.formError}>
            {errors.form}
            </p>
        )}

        <Button
            type="submit"
            fullWidth
            isPending={isSubmitting}
            className={styles.submitButton}
        >
            {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
        </form>
    );
}