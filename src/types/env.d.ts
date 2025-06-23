declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    BASE_URL: string;
    [key: string]: string | undefined;
  }
}

interface ImportMeta {
  readonly env: Record<string, string>;
} 