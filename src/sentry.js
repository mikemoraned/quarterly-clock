import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { CaptureConsole } from "@sentry/integrations";

export function init({ tracesSampleRate }) {
  Sentry.init({
    dsn: "https://795e380a18ab416d997409fa24fa79b3@o1074871.ingest.sentry.io/6074817",
    integrations: [new Integrations.BrowserTracing(), new CaptureConsole()],

    tracesSampleRate,
  });
}
