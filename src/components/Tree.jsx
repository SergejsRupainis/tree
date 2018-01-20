import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import './Tree.css';

const Tree = ({ root }) => (
  <div className="tree">
    <TreeNode node={root} />
  </div>
);

Tree.propTypes = {
  root: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tree;
