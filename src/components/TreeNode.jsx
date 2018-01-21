import React from 'react';
import './TreeNode.css';

const childrenProperties = ['categories', 'brands', 'products'];

const renderChildren = (node, entities, onDeleteNode) => {
  const childrenProp = childrenProperties.find(item => node.get(item));
  const children = node.get(childrenProp);

  if (!children) {
    return null;
  }
  return (
    <div className={node.id === 'root' ? '' : 'tree-children'}>
      {children.map((childId) => {
        const child = entities.getIn([childrenProp, childId]);
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
    {renderChildren(node, entities, onDeleteNode)}
  </div>
);

const TreeNode = ({ node, entities, onDeleteNode }) =>
  (node.get('id') === 'root'
    ? renderChildren(node, entities, onDeleteNode)
    : renderNode(node, entities, onDeleteNode));

export default TreeNode;
