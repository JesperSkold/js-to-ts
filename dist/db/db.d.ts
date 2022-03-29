import pg from 'pg';
export declare const query: (text: any, params?: any) => Promise<pg.QueryArrayResult<any[]>>;
