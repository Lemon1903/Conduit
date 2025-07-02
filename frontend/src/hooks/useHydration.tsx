import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = userStore.persist.onHydrate(() => setHydrated(false));
    const unsubFinishHydration = userStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(userStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}

export { useHydration };

