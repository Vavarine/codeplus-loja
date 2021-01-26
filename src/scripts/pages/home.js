const Home = {
    init: () => {
        console.log('teste evailson');

        Home.slickSlidePrincipal('slide-principal');
    },

    slickSlidePrincipal: (slickContainerClass) => {     
        $(`.${slickContainerClass}`).slick({
            prevArrow: $('.slide-principal-container__button--prev'),
            nextArrow: $('.slide-principal-container__button--next')
        })
    }
}

module.exports = Home