import styles from "./page.module.css";
import GetStartedButton from "./ui/GetStartedButton";
import { NTBackground } from "./ui/NTBackground";
import { Button, Card } from "@heroui/react";

/*
async function getGreeting() {
  const response = await fetch("http://localhost:4000/app/health/live");

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<{
    message: string;
    requestId: string;
  }>;
}**/

export default async function Home() {
  

  return (
    <main className={styles.main}>
      <NTBackground />
      <div className={styles.heroContent}>
        <Card
          className={`${styles.heroCard} dark w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/30`}
          variant="default"
        >
          <Card.Header className={styles.cardHeader}>
            <Card.Title className={styles.cardTitle}>
              Welcome to AsyncDesk!
            </Card.Title>
          </Card.Header>

          <Card.Content className={styles.cardContent}>
            <p className={styles.cardDescription}>
              AsyncDesk is a web application designed to streamline your
              workflow and enhance productivity. Explore the possibilities and
              take your productivity to the next level with AsyncDesk!
            </p>
          </Card.Content>

          <Card.Footer className={styles.cardFooter}>
            <GetStartedButton />
          </Card.Footer>
        </Card>
      </div>
    </main>
  );
}
