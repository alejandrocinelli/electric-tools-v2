/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL_EXACTIAN: string;
    readonly VITE_URL_TELECOMEXACTIANAPP: string;
    readonly VITE_URL_CAPACITY: string;
    readonly VITE_URL_ICD: string;
    readonly VITE_URL_SHARE: string;
    readonly VITE_URL_TUTORIALICD: string;
    readonly VITE_URL_CAPACITACIONREFRIGRERACION: string;
    readonly VITE_URL_TUTORIALEXACTIAN: string;
    readonly VITE_URL_GRAFANA: string;
    readonly VITE_URL_TOC: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }