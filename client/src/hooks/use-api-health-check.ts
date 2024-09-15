import { useCallback, useEffect } from "react";
import { healthCheck } from "@/api";

/**
 * This is temporary as Render account is using the Free Plan
 * and server will sleep after 50 seconds of inactivity.
 */
export const useApiHealthCheck = () => {
  const check = useCallback(async () => {
    healthCheck()
      .then(() => {
        console.info("Server Status: live :)");
      })
      .catch(() => {
        console.error("Server Status: down :/");
      });
  }, []);

  useEffect(() => {
    // Initial check
    check();
    setInterval(async () => {
      check();
    }, 45000);
  }, [check]);
};
