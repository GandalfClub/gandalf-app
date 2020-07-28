export enum EntityStatus {
    Init = "Init",
    Pending = "Pending",
    Success = "Success",
    Error = "Error"
}

export interface EntityWrapper<T> {
    status: EntityStatus;
    value?: T;
    error?: any;
}
