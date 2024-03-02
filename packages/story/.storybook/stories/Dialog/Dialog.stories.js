import React from 'react';
import { View, Text, Button } from 'react-native';
import { MyDialog } from './Dialog';

export default {
  title: 'Dialog',
  component: MyDialog,
};

export const BasicDialog = (args) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: args.isDark ? '#000000' : '#ffffff' }}>
    <Button title="Show dialog" onPress={showDialog} />
    <MyDialog {...args} visible={visible} handleCancel={handleCancel}>
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
      <Text>test</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title="Close" onPress={handleDelete} />
      </View>
    </MyDialog>
  </View>
};

BasicDialog.args = {
  isDark: true,
  title: "Dialog title"
};
