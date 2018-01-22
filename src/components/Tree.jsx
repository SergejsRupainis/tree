import React from 'react';
import TreeNode from './TreeNode';
import './Tree.css';

const Tree = ({ root, entities, onDeleteNode }) => (
  <div className="tree">
    <TreeNode node={root} entities={entities} onDeleteNode={onDeleteNode} />
  </div>
);

export default Tree;
