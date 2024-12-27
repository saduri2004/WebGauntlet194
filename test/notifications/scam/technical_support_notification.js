import { createNotification } from '../notification_base.js';

export function showTechnicalSupportNotification() {
    createNotification({
        title: 'Urgent Technical Support',
        message: 'Your computer is at risk. Immediate technical support required.',
        type: 'error',
        duration: 7000,
        onProceed: () => {
            console.log('Proceeding with technical support warning');
            alert('Warning: Do not proceed with unsolicited technical support');
        }
    });
}
