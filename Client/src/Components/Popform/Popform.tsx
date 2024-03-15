import React, { ReactNode, useState, useEffect } from 'react';
import { Modal } from 'antd';
import './Popform.css'

interface PopFormProps {
  renderInputs: () => ReactNode;
  cancel?: () => void;
  onSubmit?: () => void;
  showModalAutomatically?: boolean;
}

const PopForm: React.FC<PopFormProps> = ({
  renderInputs,
  cancel,
  onSubmit,
  showModalAutomatically
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (showModalAutomatically) {
      setModalVisible(true);
    }
  }, [showModalAutomatically]);

  const handleCancel = () => {
    setModalVisible(false);
    if (cancel) {
      cancel();
    }
  };

  const handleOk = () => {
    setModalVisible(false);
    if (onSubmit) {
      onSubmit();
      cancel && cancel();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="blue-background-modal"
    >
      <div className="inputs">
        {renderInputs()}
      </div>
    </Modal>
  );
};

export default PopForm;


