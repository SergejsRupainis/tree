import React from 'react';
import { shallow } from 'enzyme';
import TreeNode from './TreeNode';

describe('Tree Node', () => {
  it('should render name', () => {
    const node = {
      id: 1,
      type: 'category',
      name: 'Mock node',
    };
    const treeNode = shallow(<TreeNode node={node} />);
    expect(treeNode.contains(node.name)).toEqual(true);
  });
});
