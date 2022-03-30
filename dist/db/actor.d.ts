export interface IActor {
    firstname: string;
    lastname: string;
    last_update: Date;
}
export declare const getActors: () => Promise<any[]>;
export declare const getActorById: (actorId: number) => Promise<any>;
export declare const insertActor: (actor: IActor) => Promise<any>;
export declare const updateActor: (actorId: number, actor: IActor) => Promise<any>;
export declare const deleteActor: (actorId: number) => Promise<import("pg").QueryResult<any>>;
