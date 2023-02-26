let bottomPanel =  document.getElementById('bottomPanel');
let horizontalLine = document.getElementById('line-sub');

horizontalLine.setAttribute('draggable',true);

let positionUp = true
let pixelPerPercent = document.documentElement.clientHeight / 100;
horizontalLine.addEventListener('touchmove', function(event) {
        event.preventDefault()

    // If there's exactly one finger inside this element
    if (event.targetTouches.length == 1) {
        console.log()

        let touch = event.targetTouches[0];

        // Place element where the finger is
            console.log(touch.pageY)
            bottomPanel.style.top = touch.pageY + 'px';
            if (positionUp) {
                if ((touch.pageY / pixelPerPercent )< 30) {
                    bottomPanel.style.top = '30%'
                    positionUp = true;
                }
                if ((touch.pageY / pixelPerPercent) > 45) {
                    bottomPanel.style.top = '97%'
                    positionUp = false;
                }
            }
              else {
                if ((touch.pageY / pixelPerPercent ) < 85) {
                    bottomPanel.style.top = '30%'
                    positionUp = true;
                }
                if ((touch.pageY / pixelPerPercent) > 100) {
                    bottomPanel.style.top = '97%'
                    positionUp = false;
                }
            }

    }
}, false);