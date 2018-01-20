import React from 'react';
import { shallow, mount } from 'enzyme';
import Tree from './Tree';

const root = {
  type: 'root',
  id: 0,
  name: '',
  children: [
    {
      id: 1,
      type: 'category',
      name: 'Test category 1',
    },
    {
      id: '2d', // check string id
      type: 'category',
      name: 'Test category 2',
    },
  ],
};

describe('Tree', () => {
  it('should render correct number of nodes', () => {
    const tree = mount(<Tree root={root} />);
    expect(tree.find('.tree-node')).toHaveLength(root.children.length);
  });

  it('should be selectable by class', () => {
    const tree = shallow(<Tree root={root} />);
    expect(tree.is('.tree')).toBe(true);
  });
});
