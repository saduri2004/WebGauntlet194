import { createNotification } from '../notification_base.js';

export function showFakeSurveyNotification() {
    createNotification({
        title: 'Suspicious Survey Alert',
        message: 'Beware of fraudulent survey requests. Do not share personal information.',
        type: 'error',
        duration: 7000,
        onProceed: () => {
            console.log('Proceeding with survey warning');
            alert('Remember: Never share personal information in unsolicited surveys');
        }
    });
}
