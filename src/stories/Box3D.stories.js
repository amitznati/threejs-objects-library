import React from 'react';
import Box3D from '../Objects/Box3D';

export default {
  title: 'Box3D',
  component: Box3D,
  argTypes: {
    backgroundColor: { control: 'color' },
    lightColor: { control: 'color' },
  },
};
const Template = (args) => <Box3D {...args} />;

export const Box = Template.bind({});
Box.args = {
  lightColor: '#5a5dc4',
  label: 'Button',
};
//
// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
