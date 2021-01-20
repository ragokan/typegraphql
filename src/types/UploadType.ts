import { Stream } from "stream";

export interface UploadType {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
