import React from 'react';
import TreeNode from './TreeNode';
import './Tree.css';

const Tree = ({ entities, onDeleteNode }) => (
  <div className="tree">
    <TreeNode
      node={entities.getIn(['root', 'root'])}
      entities={entities}
      onDeleteNode={onDeleteNode}
    />
  </div>
);

export default Tree;
