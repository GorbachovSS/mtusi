document.addEventListener('DOMContentLoaded', function () {
    var foldBtns = document.getElementsByClassName('fold-button');
    for (var i = 0; i < foldBtns.length; i++) {
        foldBtns[i].addEventListener('click', function (e) {
            // Находим родительский блок статьи
            var post = e.target.closest('.one-post');
            
            // Переключаем класс folded (свернуть/развернуть)
            post.classList.toggle('folded');
            
            // Меняем текст кнопки
            if (post.classList.contains('folded')) {
                e.target.innerHTML = "развернуть";
            } else {
                e.target.innerHTML = "свернуть";
            }
        });
    }
});