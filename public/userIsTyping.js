let timer;
const userIsTyping = (userName) => {
    clearTimeout(timer);
    const isTypingTooltip = document.getElementById('typing-tooltip');
    const whoIsTyping = document.getElementById('typing-name-printing');
    isTypingTooltip.style.display = 'flex';
    whoIsTyping.textContent = `${userName} is typing`;
    timer = setTimeout(() => {whoIsTyping.textContent = '', document.getElementById('typing-tooltip').style.display = 'none'}, 1000);



};

export {userIsTyping};