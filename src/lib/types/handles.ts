import { rect } from "."
import { coordinates } from "./dragger"

export type HandleType = 'target' | 'source'

export type HandleProps = {
  type: HandleType
  handleId: string
  nodeId: string
  selected?: boolean
}

export type StartHandlePayload = {
  sourceNode: string,
  source: string
}

export enum HandlePosition {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}


export interface HandleElement extends coordinates, rect {
  id: string,
}

