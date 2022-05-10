import { Message } from 'element-ui';

export function alertInfo(message, type) {
  Message({
    showClose: true,
    message,
    type,
  });
}