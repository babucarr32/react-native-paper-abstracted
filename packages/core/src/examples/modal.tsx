import * as React from 'react';
import PaperProvider from '@/components/core/PaperProvider';
import Portal from '@/components/Portal/Portal';
import Modal from '@/components/Modal';
import Button from '@/components/Button/Button';
import Text from '@/components/Typography/Text'

const ModalExample = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: 300,
    borderRadius: 24,
    margin: 16
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default ModalExample;
