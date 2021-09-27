export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gaPageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gaEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: Gtag.EventNames
  category: string | undefined
  label: string | undefined
  value: number | undefined
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
