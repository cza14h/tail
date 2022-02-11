import { Component, createRef } from "react";
import NodeRenderer from "../NodeRenderer";
import EdgeRenderer from "../EdgeRenderer";
import InfiniteViewer from "../InfiniteViewer";
import type { SelectedItem, SelectedItemCollection, InterfaceValue, ConnectMethodType, NodeInternals, NodeInternalInfo, InternalMutation, TailRendererProps, WrapperDraggerInterface } from '@types'
import { StateProvider, InterfaceProvider, StateValue, } from '@app/contexts/instance'
import MarkerDefs from '../MarkerDefs'


type TailRenderState = {
  connecting: boolean
  selected: SelectedItemCollection
}
class TailRenderer
  extends Component<TailRendererProps, TailRenderState>
  implements InterfaceValue {

  state: TailRenderState = {
    connecting: false,
    selected: {}
  }

  contextState: StateValue = null
  nodeInternals: NodeInternals = new Map()
  edgeRendererRef = createRef<EdgeRenderer>()
  nodeRendererRef = createRef<NodeRenderer>()

  contextInterface: InterfaceValue
  constructor(props: TailRendererProps) {
    super(props)
    this.contextInterface = {
      startConnecting: this.startConnecting,
      onConnected: this.onConnected,
      startReconnecting: this.startReconnecting,
      registerNode: this.registerNode,
      delistNode: this.delistNode,
      activateItem: this.activateItem
    }
  }

  activateItem = (id: string, item: SelectedItem<'node' | 'edge'>, append?: boolean) => {
    if (!!append) {
      this.setState((prev) => {
        return {
          ...prev,
          selected: {
            ...prev.selected,
            [id]: item
          }
        }
      })
    }
  }

  getEdgesFromNodeId = (node: string) => {
    return this.edgeRendererRef.current?.nodeToEdge.get(node)
  }

  findUnreachableItems = () => {

  }

  registerNode = (id: string, node: NodeInternalInfo) => {
    this.nodeInternals.set(id, node)
  }

  delistNode = (id: string) => {
    this.nodeInternals.delete(id)
  }

  startConnecting: ConnectMethodType = (nodeId, handleId) => {

  }

  onConnected: ConnectMethodType = (nodeId, handleId) => {

  }


  startReconnecting: ConnectMethodType = (nodeId, handleId) => {

  }

  onDrag() {

  }
  onDragEnd() {

  }
  onDragStart() {

  }


  render() {
    return <InfiniteViewer>
      <StateProvider value={this.contextState}>
        <InterfaceProvider value={this.contextInterface}>
          <NodeRenderer ref={this.nodeRendererRef} />
        </InterfaceProvider>
        <EdgeRenderer
          ref={this.edgeRendererRef}
          connecting={this.state.connecting}
        >
          <MarkerDefs />
        </EdgeRenderer>
      </StateProvider>
    </InfiniteViewer>
  }
}


export default TailRenderer