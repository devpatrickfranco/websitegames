document.addEventListener('DOMContentLoaded', function() {
    const toggleMoreBtn = document.querySelector('.toggle-more');
    const showMoreIcon = document.querySelector('.show-more');
    const showLessIcon = document.querySelector('.show-less');
    const descriptionGame = document.querySelector('.description-game');
    const categoryGame = document.querySelector('.category-game');
    const stars = document.querySelectorAll('.star');

    // Verificar se a descrição é maior que a caixa
    if (descriptionGame.scrollHeight > descriptionGame.clientHeight) {
        toggleMoreBtn.classList.remove('hidden');
    } else {
        toggleMoreBtn.classList.add('hidden');
    }

    toggleMoreBtn.addEventListener('click', function() {
        if (descriptionGame.style.maxHeight === 'none') {
            // Recolher a descrição
            descriptionGame.style.maxHeight = '90px'; // Limite a altura novamente
            descriptionGame.style.overflow = 'hidden'; // Oculta o overflow
            categoryGame.style.maxHeight = 'none'; // Ajusta a altura da caixa principal
            showMoreIcon.classList.remove('hidden');
            showLessIcon.classList.add('hidden');
        } else {
            // Expandir a descrição
            descriptionGame.style.maxHeight = 'none'; // Remove a limitação de altura
            descriptionGame.style.overflow = 'auto'; // Permite rolagem
            categoryGame.style.maxHeight = '300px'; // Ajusta a altura da caixa principal
            showMoreIcon.classList.add('hidden');
            showLessIcon.classList.remove('hidden');
        }
    });

    // Controle das estrelas de classificação
    const savedRating = localStorage.getItem('rating');
    if (savedRating) {
        setStars(parseInt(savedRating, 10));
    }

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            resetStars();
            this.classList.add('hovered');
            const prevSiblings = getPreviousSiblings(this);
            prevSiblings.forEach(sibling => sibling.classList.add('hovered'));
        });

        star.addEventListener('mouseout', function() {
            resetStars();
            const savedRating = localStorage.getItem('rating');
            if (savedRating) {
                setStars(parseInt(savedRating, 10));
            }
        });

        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            localStorage.setItem('rating', value);
            setStars(parseInt(value, 10));
        });
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('hovered');
            star.classList.remove('filled');
        });
    }

    function setStars(count) {
        resetStars();
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            if (value <= count) {
                star.classList.add('filled');
            }
        });
    }

    function getPreviousSiblings(elem) {
        const siblings = [];
        while (elem = elem.previousElementSibling) {
            siblings.push(elem);
        }
        return siblings;
    }
});
