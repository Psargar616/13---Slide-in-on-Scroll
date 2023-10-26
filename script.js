

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  // console.log(e)
  // console.count(e)

  sliderImages.forEach((sliderImage) => {
    // to slideInAt half way through the image find at what screen height image should slide in based on scrollY and imageHeight
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;

    // to check if we are not scrolled thorough image height
    const isNotScrolledPastImage = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPastImage) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

// checkslide function runs every 20sec because of debounce
window.addEventListener("scroll", debounce(checkSlide));
