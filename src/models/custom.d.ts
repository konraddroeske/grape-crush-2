export declare global {
  import Gtag = Gtag.Gtag

  interface Window {
    AmbassadorChat: any
    gtag: Gtag
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
