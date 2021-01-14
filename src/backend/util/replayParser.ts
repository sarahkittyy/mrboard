import fs from 'fs';

export interface ReplayHeader {
  Author: string;
  Version: string;
  Timestamp: number;
  WorkshopId: number;
  Campaign?: string;
  Level: string;
  EntityIds: string[];
};

export interface Replay extends ReplayHeader {
  time: number;
};

export default function replayParser(tempFilePath: string): Replay | undefined {
  // all bytes
  let data = fs.readFileSync(tempFilePath);
  // grab header json
  let header: Buffer;
  let headerByte = data.indexOf('\0');
  header = data.slice(0, headerByte);
  let headerJSON: ReplayHeader = JSON.parse(header.toString());

  if (!headerJSON.WorkshopId) {
    throw new Error('No WorkshopId field in replay file.');
  }
  if (headerJSON.WorkshopId == -1) {
    throw new Error('Default levels have their own leaderboards in-game.');
  }
  if (!headerJSON.Level) {
    throw new Error('No Level field in replay file.');
  }

  // calculate whatever this is
  let byteStart = data.byteLength - headerJSON.EntityIds.length * 24 - 4;
  // read little-endian float starting from that byte
  let lastSnapshotTime = data.readFloatLE(byteStart);

  return {
    ...headerJSON,
    time: lastSnapshotTime,
  };
};
