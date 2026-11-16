"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";

import styles from "../register/register.module.css";

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const validationErrors: FormErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!password) {
      validationErrors.password = "Enter your password";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setErrors({ form: result?.error || "Unable to sign in" });
        return;
      }

      router.push("/app/home");
      router.refresh();
    } catch {
      setErrors({ form: "Could not connect to the API" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
          autoComplete="current-password"
          placeholder="Enter your password"
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
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}