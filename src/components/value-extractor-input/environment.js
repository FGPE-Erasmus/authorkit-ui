export const SAMPLE_PLAYER = {
  learningPath: [
    {
      startedAt: "2004-07-12T09:10:19.783Z",
      openedAt: "1979-10-10T13:19:53.743Z",
      state: "AVAILABLE",
      endedAt: "1991-09-13T02:12:18.14Z",
      progress: 83727400.51386884,
      challenge: "b2645f41b55109ea28fab819"
    }
  ],
  submissions: [
    {
      result: "RESOURCE_USAGE_EXCEEDED",
      player: "717eae8cf9ef570f5428c2f9",
      metrics: {
        executionTime: 613206.0306801796,
        linesOfCode: 77838022.61101934,
        cpuUsage: 33846802.28619455,
        memoryUsage: -85707965.98503438,
        programSize: 27271273.354474485
      },
      submittedAt: "1979-11-17T08:55:21.704Z",
      feedback: "aute aliquip eiusmod quis",
      exerciseId: "9628b70c-eafd-41fd-8603-c1139eda966f",
      language: "in in mollit sed",
      evaluationEngine: "BASE",
      grade: 14730839.225549325
    }
  ],
  user: "b9951664cde0e4f32d7080ba",
  points: 77063916.98252815,
  group: "89fbf4e8ffc3b807a23e5b78",
  rewards: [
    {
      amount: -71917694.16453609,
      kind: "MESSAGE",
      createdAt: "1960-03-04T05:17:03.85Z",
      recurrent: true,
      message: "ipsum deserunt ea commodo voluptate",
      name: "est non",
      id: "4eb0a25d4455181306302696",
      image: "Lorem quis in deserunt",
      cost: 85516825.15084934,
      parentChallenge: "707d67935a28824320187550",
      challenges: [
        "2c50f30c465af8dbd6812219",
        "1a4fc302e51af45f64e8d857",
        "72c3711325b7e18f680bc706"
      ],
      updatedAt: "2001-03-20T21:14:12.376Z",
      description: "sint minim"
    }
  ]
};

export const SAMPLE_ENVIRONMENT = {
  players: [SAMPLE_PLAYER],
  submissions: [
    {
      player: "7f000df65955aefb7d5094ce",
      language: "dolor in laborum quis",
      evaluationEngine: "MOOSHAK",
      submittedAt: "1991-10-28T00:34:46.511Z",
      result: "PROCESSING",
      exerciseId: "00000000-0000-0000-0000-000000000000",
      grade: 79343782.85590994,
      feedback: "Ut fugiat qui",
      metrics: {
        linesOfCode: -98609720.31382312,
        programSize: -72158991.24219164,
        memoryUsage: 69920873.1860761,
        executionTime: -14636502.45030044,
        cpuUsage: 83461841.83933243
      }
    }
  ],
  current_time: 71267661.14363483
};

export const SAMPLE_EVENT = {
  challengeId: "7f000df65955aefb7d5094ce",
  playerId: "7f000df65955aefb7d5094ce",
  player: SAMPLE_PLAYER
};

export const SAMPLE_ACTION = {
  playerId: "7f000df65955aefb7d5094ce",
  player: SAMPLE_PLAYER
};
