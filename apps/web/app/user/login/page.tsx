import Link from "next/link";
import { Button, Card, Input, Label, TextField } from "@heroui/react";

import { NTBackground } from "../../ui/NTBackground";
import styles from "../register/register.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <NTBackground />

      <div className={styles.container}>
        <Card className={`${styles.card} dark`} variant="default">
          <Card.Header className={styles.header}>
            <Card.Title className={styles.title}>Welcome back</Card.Title>
            <Card.Description className={styles.description}>
              Sign in to continue to your AsyncDesk workspace
            </Card.Description>
          </Card.Header>

          <Card.Content className={styles.content}>
            <form className={styles.form}>
              <TextField
                fullWidth
                isRequired
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
              </TextField>

              <TextField
                fullWidth
                isRequired
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
              </TextField>

              <Button
                type="submit"
                fullWidth
                className={styles.submitButton}
              >
                Sign in
              </Button>
            </form>
          </Card.Content>

          <Card.Footer className={styles.footer}>
            <span>Don&apos;t have an account?</span>
            <Link href="/user/register" className={styles.loginLink}>
              Create account
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </main>
  );
}
