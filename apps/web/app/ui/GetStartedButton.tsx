"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function GetStartedButton() {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.push("/user/register")}
      className={`${styles.cardButton} bg-blue-500 text-white`}
    >
      Get Started
    </Button>
  );
}