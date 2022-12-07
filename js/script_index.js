window.addEventListener('DOMContentLoaded', () => {
    let milisecond = 0;
    let interval = null;
    let timer = document.querySelector('#clock');
    let paused = true;
    timer.textContent = '00:00';
    document.querySelector('#reset').addEventListener('click', () => {
        timer.textContent = '00:00';
        milisecond = 0;
        setPause(true);
        document.querySelector('#pause').textContent = 'Start';
        //     remove #reset button
        document.querySelector('#reset').style.display = 'none';
    });
    document.querySelector('#pause').addEventListener('click', () => {
        if (paused) {
            setPause(false);
        } else {
            setPause(true);
        }
    });

    function setPause(bool) {
        paused = bool;
        //     set text
        document.querySelector('#pause').textContent = bool ? 'Resume' : 'Pause';
        if (bool) {
            clearInterval(interval);
        } else {
            interval = startInterval();
            //       show reset btn
            document.querySelector('#reset').style.display = 'block';
        }
    }

    function startInterval() {
        if (interval != null) {
            clearInterval(interval);
        }
        return setInterval(function() {
            milisecond += 100;
            let text = new Date(milisecond).toISOString().slice(11, 11 + 8);
            if (text.startsWith('00:')) {
                text = text.slice(3);
            }

            timer.textContent = text;
        }, 100);
    }
});
