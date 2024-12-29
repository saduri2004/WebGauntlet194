import { createForm } from '../form_base.js';

export function createAgentForm() {
  return createForm({
    title: 'Agent Configuration',
    subtitle: 'Define and customize your AI agent\'s core parameters and capabilities.',
    fields: [
      {
        type: 'text',
        name: 'agentName',
        label: 'Agent Name',
        placeholder: 'Enter agent identifier',
        required: true
      },
      {
        type: 'select',
        name: 'agentType',
        label: 'Agent Type',
        options: [
          { value: 'ml', label: 'Machine Learning' },
          { value: 'nlp', label: 'Natural Language Processing' },
          { value: 'cv', label: 'Computer Vision' }
        ],
        required: true
      },
      {
        type: 'textarea',
        name: 'agentDescription',
        label: 'Agent Description',
        placeholder: 'Describe the agent\'s purpose and capabilities',
        required: false
      }
    ],
    submitText: 'Configure Agent',
    cancelText: 'Cancel',
    onSubmit: (formData) => {
      console.log('Agent Configuration Submitted:', formData);
      // Add your submission logic here
    },
    onCancel: () => {
      console.log('Agent Configuration Canceled');
      // Add your cancellation logic here
    }
  });
}
