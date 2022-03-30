import pg from 'pg';
export declare const query: (text: string, params?: any) => Promise<pg.QueryResult<any>>;
