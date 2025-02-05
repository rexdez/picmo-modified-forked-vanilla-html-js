const messageInput = document.getElementById("message");

const emojiTrigger = document.getElementById('emoji-picker');

const emojiPicker = picmoPopup.createPopup({
}, {
    triggerElement: emojiTrigger,
    referenceElement: emojiTrigger,
});

emojiPicker.addEventListener('emoji:select', (selection) => {
    messageInput.value = messageInput.value + selection.emoji;
});