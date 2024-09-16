import { useCallback, useEffect, useState } from "react";
import { healthCheck } from "@/api";

/**
 * Check if server is alive
 */
export const useApiHealthCheck = () => {
  const [alive, setAlive] = useState(true);
  const check = useCallback(async () => {
    healthCheck()
      .then(() => {
        setAlive(true);
      })
      .catch(() => {
        console.error("Server Status: down :/");
        setAlive(false);
      });
  }, []);

  useEffect(() => {
    // Initial check
    check();
    setInterval(async () => {
      check();
    }, 60000);
  }, [check]);

  return alive;
};
