/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentType, CSSProperties } from 'react';
import type { JotaiImmerAtom, AtomForceRender } from './jotai';
import type { UpdaterType, HandlesInfo } from './instance';
import type { coordinates, DraggerData, Rect } from './dragger';

export type Node<T extends Record<string, any> = {}> = {
  id: string;
  left: number;
  top: number;
  fold?: boolean;
  disable?: boolean;
  parent?: string;
  type: string;
} & T;
export type Nodes = Record<string, Node>;

export type NodeTemplatesType = Record<string, TemplateNodeClass>;

export type NodeCom<T extends Record<string, any> = {}> = ComponentType<NodeProps<T>>;

export type TemplateNodeClass = Record<string, NodeCom<any>>;

export type TemplatePickerType = (node: Node<any>) => [string, string];

export type NodeRendererProps = {
  templates: NodeTemplatesType;
  templatePicker: TemplatePickerType;
};

export type NodeAtomState<T extends Record<string, any> = {}> = NodeAtomRaw<T> & AtomForceRender;

export type NodeAtom<T extends Record<string, any> = {}> = JotaiImmerAtom<NodeAtomState<T>>;
export type NodeAtomsType = Record<string, NodeAtom>;

export type NodeWrapperProps<T extends Record<string, any> = {}> = {
  atom: NodeAtom<T>;
  templates: NodeTemplatesType;
  templatePicker: TemplatePickerType;
};

export type NodeProps<T extends Record<string, any> = {}> = {
  node: Node<T>;
  selected: boolean;
  hovered: boolean;
  // selectedHandles: Record<string, number>;
  updateNodeHandles(): void;
  setContainerStyle(css: UpdaterType<CSSProperties>): void;
};

export interface NodeMouseInterface extends DraggerCallbacksType {
  onNodeClick?: (e: MouseEvent, node: NodeAtomState) => void;
  onNodeContextMenu?: (e: React.MouseEvent, node: NodeAtomState) => void;
}

export type DraggerCallbacksType = {
  onDragStart?: (e: React.MouseEvent, n: Node, c: DraggerData) => boolean | void;
  onDrag?: (e: MouseEvent, n: Node, c: DraggerData) => boolean | void;
  onDragEnd?: (e: MouseEvent, n: Node, c: DraggerData) => boolean | void;
};

export type NodeAtomRaw<T extends Record<string, any> = {}> = Pick<
  NodeProps<T>,
  'node' | 'selected' | 'hovered'
> & {
  handles: HandlesInfo;
  rect: Rect;
  hide?: boolean;
  runtimePosition: coordinates;
};

type NodeId = string;
export type NodeTree = Map<NodeId, Set<NodeId>>;
