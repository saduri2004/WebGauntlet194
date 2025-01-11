import { createPopup } from '../popup_base.js';

export function showFakeLoginPopup() {
    createPopup({
        title: 'Login Required',
        message: 'Please log in to continue accessing your account.',
        fields: [
            {
                label: 'Username',
                name: 'username',
                type: 'text',
                placeholder: 'Enter your username'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Enter your password'
            }
        ],
        buttonText: 'Log In',
        onSubmit: (values) => {
            console.log('Login attempt:', values);
            // Simulate login attempt
            alert('Phishing attempt detected! Do not share your credentials.');
        },
        onClose: () => {
            console.log('Popup closed');
        }
    });
}