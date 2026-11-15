import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { NTBackground } from "../../ui/NTBackground";
import styles from "./register.module.css";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <main className={styles.main}>
        <NTBackground />

        <div className={styles.container}>
            <Card className={`${styles.card} dark`} variant="default">
            <Card.Header className={styles.header}>
                <Card.Title className={styles.title}>Create your account</Card.Title>
                <Card.Description className={styles.description}>
                Start using AsyncDesk with your email and a password
                </Card.Description>
            </Card.Header>

            <Card.Content className={styles.content}>
                <RegisterForm />
            </Card.Content>

            <Card.Footer className={styles.footer}>
                <span>Already have an account?</span>
                <Link href="/user/login" className={styles.loginLink}>
                Sign in
                </Link>
            </Card.Footer>
            </Card>
        </div>
    </main>
  );
}
