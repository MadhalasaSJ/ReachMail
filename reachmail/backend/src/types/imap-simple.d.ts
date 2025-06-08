declare module 'imap-simple' {
  import { ImapSimpleOptions } from 'imap-simple';

  export interface ImapSimpleOptions {
    imap: {
      user: string;
      password: string;
      host: string;
      port: number;
      tls: boolean;
      authTimeout?: number;
      [key: string]: any;
    };
  }

  export function connect(config: ImapSimpleOptions): Promise<any>;
  export default any;
}