import Link from "next/link";
import { Card } from "@heroui/react";

import { NTBackground } from "../../ui/NTBackground";
import styles from "../register/register.module.css";
import LoginForm from "./LoginForm";

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
            <LoginForm />
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