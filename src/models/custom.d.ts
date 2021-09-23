export declare global {
  interface Window {
    AmbassadorChat: any
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
