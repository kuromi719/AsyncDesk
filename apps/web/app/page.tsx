import styles from "./page.module.css";

async function getGreeting() {
  const response = await fetch("http://localhost:4000/health/live", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<{ message: string }>;
}

export default async function Home() {
  const health = await getGreeting();

  return (
    <main className={styles.main}>
      <h1>Welcome to the Web App</h1>
      <p>{health.message}</p>
    </main>
  );
}