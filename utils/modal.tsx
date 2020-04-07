import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';

export interface ModalBaseProps {
  visible: boolean;
  onClose: () => void;
  afterClose: () => void;
  modal: {
    close: () => void;
  };
}

export default function createOpen<P extends ModalBaseProps = any>(Component: ComponentType<P>) {
  return function (props: Omit<P, keyof ModalBaseProps>) {
    const el = document.createElement('div');
    const config: P = {
      ...props,
      visible: true,
      onClose,
      afterClose: destroy,
      modal: {
        close: onClose
      }
    } as any;

    function onClose() {
      config.visible = false;
      render(config);
    }

    function destroy() {
      ReactDOM.unmountComponentAtNode(el);
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }

    function render(config: P) {
      ReactDOM.render(<Component {...config} />, el);
    }

    render(config);
  };
}
