declare module "decap-cms" {
  const CMS: {
    init: (options?: { config?: string | Record<string, unknown> }) => void;
    registerPreviewTemplate: (name: string, component: unknown) => void;
    registerPreviewStyle: (style: string) => void;
  };
  export default CMS;
}
