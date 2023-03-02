let timer;
const userIsTyping = (userName) => {
    clearTimeout(timer);
    const isTypingTooltip = document.getElementById('typing-tooltip');
    isTypingTooltip.style.display = 'flex';
    isTypingTooltip.textContent = `${userName} is typing ...`;
    timer = setTimeout(() => {isTypingTooltip.textContent = '', document.getElementById('typing-tooltip').style.display = 'none'}, 1000);



};

export {userIsTyping};