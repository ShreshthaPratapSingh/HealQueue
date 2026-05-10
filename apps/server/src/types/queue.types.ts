export interface JoinQueueBody {
    queueId: string,
    type?: "ONLINE" | "WALK_IN",
}