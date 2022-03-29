export declare const getActors: () => Promise<any[][]>;
export declare const getActorById: (actorId: number) => Promise<any[] | null>;
export declare const insertActor: (actor: any) => Promise<any[]>;
export declare const updateActor: (actorId: any, actor: any) => Promise<any[] | null>;
export declare const deleteActor: (actorId: number) => Promise<import("pg").QueryArrayResult<any[]>>;
