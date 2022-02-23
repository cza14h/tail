import React, { Component } from 'react';
import type { coordinates } from '@app/types';
import styles from './index.module.scss';

type InfiniteViewerState = {
  scale: number;
  offset: coordinates;
};

type InfiniteViewerProps = {};
class InfiniteViewer extends Component<InfiniteViewerProps, InfiniteViewerState> {
  state = {
    scale: 1,
    offset: { x: 0, y: 0 },
  };

  getScale() {
    return this.state.scale;
  }

  render() {
    const {
      scale,
      offset: { x, y },
    } = this.state;
    return (
      <div
        className={styles['infinite-wrapper']}
        style={{
          transform: `translate(${x}px,${y}px), scale(${scale})`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default InfiniteViewer;
