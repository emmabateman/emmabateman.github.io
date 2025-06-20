"use client";

import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-require-imports*/
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    /* eslint-enable @typescript-eslint/no-require-imports*/
  }, []);

  return null;
}

export { BootstrapClient };
