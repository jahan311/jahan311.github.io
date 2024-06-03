document.querySelectorAll('.mission_btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.mission_ani').forEach(missionAni => {
            missionAni.classList.remove('ani_play');
            missionAni.innerHTML = ''; // Clear previous divs if any
        });

        const missionAni = button.nextElementSibling.nextElementSibling;
        missionAni.classList.add('ani_play');

        for (let i = 0; i < 7; i++) {
            const div = document.createElement('div');
            missionAni.appendChild(div);
        }
    });
});