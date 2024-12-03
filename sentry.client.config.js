import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 10,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  relsease:1.0,
  beforeBreadcrumb(breadcrumbs,hint){
    if(breadcrumbs.category === "xhr" || breadcrumbs.category === "fetch"){
      return null
    }
    return breadcrumbs;
  }
})