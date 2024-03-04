import Clipboard from 'clipboard'
import { showToast } from 'vant';

function clipboardSuccess() {
  showToast({ type: 'success', message: 'Copy successfully', duration: 1500 })
}
function clipboardError() {
  showToast({ message: 'Copy failed', type: 'fail' });
}
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
