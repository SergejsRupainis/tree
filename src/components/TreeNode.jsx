import React from 'react';
import PropTypes from 'prop-types';
import './TreeNode.css';

const renderChildren = (children, type) => (
  <div className={type === 'root' ? '' : 'tree-children'}>
    {children.map(child => <TreeNode key={child.id} node={child} />)}
  </div>
);

const renderNode = node => (
  <div className="tree-node">
    <span>{node.name}</span>
    <span>
      <button type="button">Delete</button>
    </span>
    {node.children && renderChildren(node.children, node.type)}
  </div>
);

const TreeNode = ({ node }) =>
  (node.type === 'root' ? renderChildren(node.children, node.type) : renderNode(node));

TreeNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
  }).isRequired,
};

export default TreeNode;
