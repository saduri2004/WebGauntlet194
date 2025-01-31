import { logScamInteract } from "../utils/client-logger.js";

export function createObject(options = {}) {



    const {
        title = 'EMPTY',
        subtitle = 'EMPTY',
        extra = "EMPTY",
        actionText = 'EMPTY',
        cancelText = 'EMPTY',
        onAction = () => { },
        onCancel = () => { },
        theme= 'black',

        attack_config = { category: 'EMPTY', type: 'EMPTY', source: 'EMPTY' },
        
    } = options;

    const container = document.createElement('div');
    const visibility = 'hidden'
    const display = 'none'

    // Hidden using visibility
    const invisibleText1 = document.createElement('div');
    invisibleText1.style.visibility = visibility;
    invisibleText1.innerHTML = title;

    // Hidden using display none    
    const invisibleText2 = document.createElement('p');
    invisibleText2.style.visibility = visibility;
    invisibleText2.innerHTML = subtitle;

    const invisibleText3 = document.createElement('p');
    invisibleText3.style.visibility = visibility;
    invisibleText3.innerHTML = extra;


    // Add all hidden elements
    container.appendChild(invisibleText1);
    container.appendChild(invisibleText2);
    container.appendChild(invisibleText3);

    // Add buttons
    const actionButton = document.createElement('button');
    actionButton.innerHTML = actionText;
    actionButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onAction();
        logScamInteract(attack_config, 'invisible', 'CLICK');
    });

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = cancelText;
    cancelButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onCancel();
        logScamInteract(attack_config, 'invisible', 'AVOID');
    });


    actionButton.style.visibility = visibility;
    cancelButton.style.visibility = visibility;

    // Add buttons to container
    container.appendChild(actionButton);
    container.appendChild(cancelButton);

    return container;
}
