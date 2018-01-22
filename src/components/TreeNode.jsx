import React from 'react';
import './TreeNode.css';

// const childrenProperties = ['categories', 'brands', 'products'];

const renderChildren = (node, entities, onDeleteNode) => {
  const childrenProperty = node.get('childrenProperty');
  const children = node.get(childrenProperty);

  if (!children) {
    return null;
  }
  return (
    <div className={node.id === 'root' ? '' : 'tree-children'}>
      {children.map((childId) => {
        const child = entities.getIn([childrenProperty, childId]);
        return (
          <TreeNode
            key={child.get('id')}
            entities={entities}
            node={child}
            onDeleteNode={onDeleteNode}
          />
        );
      })}
    </div>
  );
};

const renderNode = (node, entities, onDeleteNode) => (
  <div className="tree-node">
    <span>{node.get('name')}</span>
    <span>
      <button className="tree-delete-button" type="button" onClick={() => onDeleteNode(node)}>
        Delete
      </button>
    </span>
    {node.get('childrenProperty') && renderChildren(node, entities, onDeleteNode)}
  </div>
);

const TreeNode = ({ node, entities, onDeleteNode }) =>
  (node.get('id') === 'root'
    ? renderChildren(node, entities, onDeleteNode)
    : renderNode(node, entities, onDeleteNode));

export default TreeNode;
