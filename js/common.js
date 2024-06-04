// mission_btn animation
document.querySelectorAll('.mission_btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.mission_ani').forEach(missionAni => {
            missionAni.classList.remove('ani_play');
            missionAni.innerHTML = '';
        });

        const missionAni = button.nextElementSibling.nextElementSibling;
        missionAni.classList.add('ani_play');

        for (let i = 0; i < 7; i++) {
            const div = document.createElement('div');
            missionAni.appendChild(div);
        }
    });
});

// level progress bar
document.addEventListener('DOMContentLoaded', function () {
    const progressbar = document.querySelector(".level_progress");
    const currentProgress = document.querySelector(".level_bar");
    const progressText = document.querySelector(".level_count");

    // aria-valuenow update
    function updateProgressBar() {
        let progress = parseFloat(progressbar.getAttribute("aria-valuenow"));
        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;

        // bg style setting
        currentProgress.style.clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`;
        // percent count
        progressText.textContent = `${progress.toFixed(1)}%`;
        // percent visible hidden==0
        currentProgress.style.visibility = 'visible';
        // percent count >=50, white text change
        if (progress >= 50) {
            progressText.classList.add('wh_txt');
        } else {
            progressText.classList.remove('wh_txt');
        }

        // percent count >=50, img scale up
        if (progress >= 100) {
            document.querySelector('.level_box .level_img').classList.add('scaleup');
        }
    }

    // aria-valuenow 값 감지 변화, updateProgressBar 호출
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
                updateProgressBar();
            }
        });
    });

    observer.observe(progressbar, {
        attributes: true
    });

    updateProgressBar();
});

// goods progress bar
document.addEventListener('DOMContentLoaded', function () {
    const progressbar = document.querySelector(".goods_progress");
    const currentProgress = document.querySelector(".goods_bar");
    const progressText = document.querySelector(".goods_count");

    // aria-valuenow update
    function updateProgressBar() {
        let progress = parseFloat(progressbar.getAttribute("aria-valuenow"));
        if (progress < 0) progress = 0;
        if (progress > 100) progress = 100;

        // bg style setting
        currentProgress.style.clipPath = `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`;
        // percent count
        progressText.textContent = `${progress.toFixed(1)}%`;
        // percent visible hidden==0
        currentProgress.style.visibility = 'visible';
        // percent count >=50, white text change
        if (progress >= 50) {
            progressText.classList.add('wh_txt');
        } else {
            progressText.classList.remove('wh_txt');
        }
    }

    // aria-valuenow 값 감지 변화, updateProgressBar 호출
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "aria-valuenow") {
                updateProgressBar();
            }
        });
    });

    observer.observe(progressbar, {
        attributes: true
    });

    updateProgressBar();
});


// right_menu scroll effect
// document.addEventListener('DOMContentLoaded', function () {
//     const rightMenu = document.querySelector('.right_menu ul');
//     const lastMenuItem = document.querySelector('.menu_box:last-child');

//     rightMenu.addEventListener('scroll', function () {
//         if (rightMenu.scrollTop > 0) {
//             lastMenuItem.style.opacity = '1.0';
//             lastMenuItem.style.filter = 'blur(0)'
//         } else {
//             lastMenuItem.style.opacity = '0.8';
//             lastMenuItem.style.filter = 'blur(0.5px)'
//         }
//     });
// });