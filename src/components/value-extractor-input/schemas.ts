export interface Reward {
  id: string;
  parentChallenge?: string;
  kind:
    | "POINT"
    | "BADGE"
    | "VIRTUAL_ITEM"
    | "COUPON"
    | "REVEAL"
    | "UNLOCK"
    | "HINT"
    | "MESSAGE";
  name: string;
  description?: string;
  image?: string;
  recurrent?: boolean;
  cost?: number;
  amount?: number;
  message?: string;
  challenges?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface ChallengeStatus {
  challenge: string;
  startedAt?: Date;
  openedAt?: Date;
  endedAt?: Date;
  state:
    | "AVAILABLE"
    | "LOCKED"
    | "HIDDEN"
    | "OPENED"
    | "FAILED"
    | "COMPLETED"
    | "REJECTED";
  progress?: number;
}

export interface Submission {
  player: string;
  exerciseId: string;
  evaluationEngine: "BASE" | "MOOSHAK";
  language?: string;
  metrics?: { [k: string]: any };
  result?:
    | "PROCESSING"
    | "ACCEPT"
    | "WRONG_ANSWER"
    | "TIMED_OUT"
    | "OUTPUT_LIMIT_OVERFLOW"
    | "COMPILATION_ERROR"
    | "RUNTIME_ERROR"
    | "RESOURCE_USAGE_EXCEEDED"
    | "ASK_FOR_REEVALUATION";
  grade?: number;
  feedback?: string;
  submittedAt?: Date;
}

export interface Player {
  user: string;
  group?: string;
  points?: number;
  rewards: [Reward];
  learningPath: [ChallengeStatus];
  submissions: [Submission];
}

export interface Environment {
  players: [Player];
  submissions: [Submission];
  current_time: number;
}

export interface Event {
  [k: string]: any;
  player?: Player;
}

export interface Action {
  [k: string]: any;
  player?: Player;
}
