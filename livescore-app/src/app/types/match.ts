export type Match = {
  id: number;
  utcDate: string;
  status: string;
  competition: {
    id: number;
    name: string;
  };
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
};

export type MatchStatus =
  | "SCHEDULED"
  | "IN_PLAY"
  | "FINISHED"
  | "CANCELLED"
  | "POSTPONED";
