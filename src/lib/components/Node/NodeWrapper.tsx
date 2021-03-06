import React, {
  FC,
  CSSProperties,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useState,
} from 'react';
import type { NodeWrapperProps, NodeCom, DraggerData } from '@lib/types';
import { InstanceInterface } from '@lib/contexts/instance';
import { setHovered, setNotHovered } from '@lib/atoms/reducers';
import { useAtom } from 'jotai';
import Dragger from './Dragger';
import { getNodeInfo } from './utils';
import styles from './Wrapper.module.scss';
import { BasicNode } from '.';

const wrapperClassname = `tail-node__wrapper ${styles.wrapper}`;

const NodeWrapper: FC<NodeWrapperProps> = ({ atom, templatePicker, templates }) => {
  const [nodeState, setNodeInternal] = useAtom(atom);
  const ref = useRef<HTMLDivElement>(null);
  const rootInterface = useContext(InstanceInterface)!;
  const [styled, setStyle] = useState<CSSProperties>({});

  const { node, selected, /* selectedHandles, */ hovered } = nodeState;
  const { left: x, top: y } = node;

  const style = useMemo(() => {
    return {
      ...styled,
      transform: `translate(${x}px,${y}px)`,
    } as CSSProperties;
  }, [x, y, styled]);

  //built-in event callbacks
  const dragStart = useCallback(
    (e: React.MouseEvent, c: DraggerData) => {
      return rootInterface.node.onDragStart?.(e, node, c);
    },
    [node],
  );
  const drag = useCallback(
    (e: MouseEvent, c: DraggerData) => {
      return rootInterface.node.onDrag?.(e, node, c);
    },
    [node],
  );
  const dragEnd = useCallback(
    (e: MouseEvent, c: DraggerData) => {
      return rootInterface.node.onDragEnd?.(e, node, c);
    },
    [node],
  );

  const onNodeClick = useCallback(
    (e: MouseEvent) => {
      rootInterface.node.onNodeClick?.(e, nodeState);
    },
    [node, selected],
  );
  const onHoverIn = () => {
    !hovered && setNodeInternal(setHovered);
  };
  const onHoverOut = () => {
    hovered && setNodeInternal(setNotHovered);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    selected && rootInterface.node.onNodeContextMenu?.(e, nodeState);
  };

  const updateNodeHandles = useCallback(() => {
    const scale = rootInterface.getScale();
    const [rect, handles] = getNodeInfo(ref, node, scale);
    setNodeInternal((prev) => {
      return {
        ...prev,
        handles,
        rect,
      };
    });
  }, [node]);

  // built-in life cycle
  useEffect(() => {
    updateNodeHandles();
  }, []);

  const NodeComponent: NodeCom = useMemo(() => {
    return templatePicker(node).reduce<any>((last, val) => {
      if (last[val]) return last[val];
      return BasicNode;
    }, templates);
  }, [templatePicker, node]);

  return (
    <Dragger
      x={x}
      y={y}
      getScale={rootInterface.getScale}
      onDragStart={dragStart}
      onDrag={drag}
      onDragEnd={dragEnd}
      onClick={onNodeClick}
      nodeRef={ref}
    >
      <div
        className={wrapperClassname}
        style={style}
        ref={ref}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        onContextMenu={onContextMenu}
      >
        <NodeComponent
          node={node}
          hovered={hovered}
          selected={selected}
          // selectedHandles={selectedHandles}
          updateNodeHandles={updateNodeHandles}
          setContainerStyle={setStyle}
        />
      </div>
    </Dragger>
  );
};

// export default memo(NodeWrapper);
export default NodeWrapper;
