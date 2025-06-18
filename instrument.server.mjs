import * as Sentry from "@sentry/react-router";
Sentry.init({
  dsn: "https://3bfb498bbd201553ea2a172bb8d72542@o4509519210610688.ingest.us.sentry.io/4509519218606080",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});