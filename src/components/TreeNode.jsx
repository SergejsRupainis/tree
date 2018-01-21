import React from 'react';
import PropTypes from 'prop-types';
import './TreeNode.css';

const renderChildren = (children, type, onDeleteNode) => (
  <div className={type === 'root' ? '' : 'tree-children'}>
    {children.map(child => <TreeNode key={child.id} node={child} onDeleteNode={onDeleteNode} />)}
  </div>
);

const renderNode = (node, onDeleteNode) => (
  <div className="tree-node">
    <span>{node.name}</span>
    <span>
      <button type="button" onClick={() => onDeleteNode(node)}>
        Delete
      </button>
    </span>
    {node.children && renderChildren(node.children, node.type, onDeleteNode)}
  </div>
);

const TreeNode = ({ node, onDeleteNode }) =>
  (node.type === 'root'
    ? renderChildren(node.children, node.type, onDeleteNode)
    : renderNode(node, onDeleteNode));

TreeNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
  }).isRequired,
  onDeleteNode: PropTypes.func.isRequired,
};

export default TreeNode;
