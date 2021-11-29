document.getElementById('backToMenu').addEventListener('click', backToMenu);
function backToMenu(){
    const currentScroll = document.documentElement.scrollTop;
    if(currentScroll > 0){
        window.scrollTo(0, currentScroll - (currentScroll/2));
        console.log(currentScroll);
    }
}

const button = document.getElementById('backToMenu');
button.style.transform = 'scale(0)';
window.onscroll = function(){
    const scroll = document.documentElement.scrollTop;
    if(scroll > 200){
        button.style.transform = 'scale(1)';
    }else{
        button.style.transform = 'scale(0)';
    }
}

