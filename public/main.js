$(document).ready(function () {
  function HeroScript(){
      // Variables
      let isMenuOpen = false;
      const $menuToggle = $('#menu-toggle');
      const $mobileMenu = $('#mobile-menu');
      const $hamburgerIcon = $('.hamburger-icon');
      const $closeIcon = $('.close-icon');
      const $dropdownContent = $('#dropdown-content');
      
      // Toggle mobile menu
      $menuToggle.on('click', function() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle icons
        if (isMenuOpen) {
          $hamburgerIcon.addClass('hidden');
          $closeIcon.removeClass('hidden');
          $menuToggle.attr('aria-label', 'Close menu');
          
          // Get content height and animate open
          const contentHeight = $dropdownContent.outerHeight();
          $mobileMenu.css('height', contentHeight + 'px');
        } else {
          $hamburgerIcon.removeClass('hidden');
          $closeIcon.addClass('hidden');
          $menuToggle.attr('aria-label', 'Open menu');
          
          // Animate close
          $mobileMenu.css('height', '0px');
        }
      });
      
      // Smooth scroll function with header offset
      $('.nav-link, .mobile-nav-link').on('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (isMenuOpen) {
          isMenuOpen = false;
          $hamburgerIcon.removeClass('hidden');
          $closeIcon.addClass('hidden');
          $menuToggle.attr('aria-label', 'Open menu');
          $mobileMenu.css('height', '0px');
        }
        
        // Get target element
        const targetId = $(this).attr('href');
        const $targetElement = $(targetId);
        
        if ($targetElement.length) {
          // Get header height to offset scroll position
          const headerHeight = $('header').outerHeight();
          
          // Calculate position with offset
          const elementPosition = $targetElement.offset().top;
          const offsetPosition = elementPosition - headerHeight;
          
          // Smooth scroll to the element
          $('html, body').animate({
            scrollTop: offsetPosition
          }, 800);
        }
      });
      
      // Handle window resize to recalculate dropdown height if menu is open
      $(window).on('resize', function() {
        if (isMenuOpen) {
          const contentHeight = $dropdownContent.outerHeight();
          $mobileMenu.css('height', contentHeight + 'px');
        }
      });
    
  }

  function updateAfflinksLinksOutbound() {
    const urlParams = new URLSearchParams(window.location.search);
    const sub2Value = urlParams.get("sub2") || "";
    const baseUrl = "https://offer.wallasound.com/speaker/en/us/v6/checkout?uid=377&oidsm=79&affidsm=39&uid=1541&oid=239&affid=16&sub2={clickid}";
    const updatedUrl = baseUrl.replace("{clickid}", sub2Value);

    $(".aff-link").each(function() {
      $(this).attr("href", updatedUrl);
    });
  }

  function updateHeroAfterHeight() {
    if ($(".hero-last-section").length) {
      const containerHeight = $(".hero-last-section").outerHeight();
      const containerVideoHeight = $(".video-container").outerHeight();
      const containerInfoHeight = $(".product-info").innerHeight();
      const totalGap = containerVideoHeight - containerInfoHeight;
      const newHeightDesktop = containerHeight + (totalGap > 0 ? totalGap + 14 : 16) + 0 + "px";
      const newHeightDesktopXMedium = containerHeight + 24 + "px";
      const newHeightDesktopSmaller = containerHeight + 16 + "px";
      const newHeightXMobile = containerHeight + 16 + "px";
      const newHeightMobile = containerHeight + 16 + "px";

      const windowWidth = $(window).width();

      if (windowWidth >= 1260) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktop
        );
      } else if (windowWidth >= 1200) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktopXMedium
        );
      } else if (windowWidth >= 1024) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightDesktopSmaller
        );
      } else if (windowWidth >= 768) {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightXMobile
        );
      } else {
        document.documentElement.style.setProperty(
          "--hero-before-height",
          newHeightMobile
        );
      }
    }
  }

  function updateShippingDate() {
    if ($(".date-to-ship").length) {
      // Get current date
      let currentDate = new Date();

      // Add one day
      let shippingDate = new Date(currentDate);
      shippingDate.setDate(currentDate.getDate() + 1);

      // Get day of week
      const dayNames = [
        "SUN",
        "MON",
        "TUE",
        "WED",
        "ThU",
        "FRI",
        "SAT",
      ];
      const dayOfWeek = dayNames[shippingDate.getDay()];

      // Get day of month with ordinal suffix (1st, 2nd, 3rd, etc.)
      const day = shippingDate.getDate();
      let ordinalSuffix;

      if (day > 3 && day < 21) {
        ordinalSuffix = "th";
      } else {
        switch (day % 10) {
          case 1:
            ordinalSuffix = "st";
            break;
          case 2:
            ordinalSuffix = "nd";
            break;
          case 3:
            ordinalSuffix = "rd";
            break;
          default:
            ordinalSuffix = "th";
        }
      }

      // Get month name
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[shippingDate.getMonth()];

      // Format the date as "Tuesday 19th February"
      const formattedDate = `${dayOfWeek} ${day}${ordinalSuffix} ${month}`;

      // Update the element with class "date-to-ship"
      $(".date-to-ship").text(formattedDate);
    }
  }

  function InitializeFAQ() {
    // Initialize the FAQ accordion
    if($(".faq-item").length){
      $(".faq-answer").hide();
      let activeId = 1;
  
  // Show the first answer initially
  $(".faq-item").eq(0).addClass("active");
  $(".faq-item").eq(0).find(".faq-answer").show();
  
  // Handle click on FAQ questions
  $(".faq-question").click(function() {
    const $faqItem = $(this).closest(".faq-item");
    const id = $faqItem.index() + 1;
    
    if (activeId === id) {
      // If clicking the active item, close it
      $faqItem.removeClass("active");
      $faqItem.find(".faq-answer").slideUp(200);
      activeId = 0;
    } else {
      // Otherwise, open the clicked item
      $(".faq-item").removeClass("active");
      $(".faq-answer").slideUp(200);
      
      $faqItem.addClass("active");
      $faqItem.find(".faq-answer").slideDown(200);
      activeId = id;
    }
    
    // Update icons for all items
    $(".faq-item").each(function(index) {
      const itemId = index + 1;
      const $iconContainer = $(this).find(".faq-icon");
      
      if (itemId === activeId) {
        $iconContainer.html(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 30" fill="none">
            <rect x="29.5" y="1" width="28" height="28" rx="14" transform="rotate(90 29.5 1)" stroke="black" stroke-width="2"/>
            <rect x="23.5" y="16" width="16" height="2" transform="rotate(180 23.5 16)" fill="black"/>
          </svg>
        `);
      } else {
        $iconContainer.html(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 30" fill="none">
            <rect x="1.5" y="1" width="28" height="28" rx="14" stroke="black" stroke-width="2"/>
            <rect x="7.5" y="14" width="16" height="2" fill="black"/>
            <rect x="16.5" y="7" width="16" height="2" transform="rotate(90 16.5 7)" fill="black"/>
          </svg>
        `);
      }
    });
  });
    }
  }

  // Duplicate marquee content for smooth scrolling
  if ($("#marquee").length) {
    const clone = $("#marquee").html();
    $("#marquee").html(clone + clone);

    // Adjust speed based on screen width
    const updateSpeed = function () {
      const width = $(window).width();
      const speed = width < 768 ? "30s" : "40s";

      // Check if element exists
      if ($(".marquee-content").length) {
        $(".marquee-content").css("animation-duration", speed);
      }
    };

    updateSpeed();
    $(window).on("resize", updateSpeed);
  }

  function initializeCountdown() {
    setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    let countdown = $('.countdown').text();
    let [hours, minutes, seconds] = countdown.split(':').map(Number);
  
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
    }
  
    $('.countdown').text(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    );
  }

  function disableClick(){
    $(document).on("contextmenu", function(e) {
      e.preventDefault();
  });

  // Disable specific keyboard shortcuts
  $(document).keydown(function(e){
      if ((e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
          (e.ctrlKey && (e.key === "U" || e.key === "C" || e.key === "S")) ||
          (e.key === "F12")) {
          e.preventDefault();
          return false;
      }
  });

  // Disable mouse events except for links
  $('body').on('mousedown mouseup click', function(e){
      if (!$(e.target).closest('a').length) {
          e.preventDefault();
          return false;
      }
  });
  }

  function updateLogoSources() {
    const isMobile = window.innerWidth < 768;
    
    $('[data-logo-index]').each(function() {
      const $img = $(this).find('img');
      const desktopSrc = $img.data('desktop-src');
      const mobileSrc = $img.data('mobile-src');
      
      // Update image source based on screen size
      if (isMobile && mobileSrc) {
        $img.attr('src', mobileSrc);
      } else if (desktopSrc) {
        $img.attr('src', desktopSrc);
      }
    });
  }

  const MOBILE_WIDTH = 768;
      const fixedBottomCta = document.getElementById('fixed-bottom-cta');
      let showByScroll = false;
      let isMobile = false;

      // Check if device is mobile
      function checkMobile() {
        isMobile = window.innerWidth < MOBILE_WIDTH;
        updateCTAVisibility();
      }

      // Set up Intersection Observer for hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            showByScroll = !entries[0].isIntersecting;
            updateCTAVisibility();
          },
          { threshold: 0 }
        );
        
        observer.observe(heroSection);
      }

      // Update CTA visibility based on scroll position and device width
      function updateCTAVisibility() {
        if (showByScroll && isMobile) {
          fixedBottomCta.style.bottom = '0';
        } else {
          fixedBottomCta.style.bottom = '-100%';
        }
      }

      function setRandomDatesToElements() {
  // Get all elements with the class "testimonial-date-grid"
  const dateElements = document.querySelectorAll('.testimonial-date-grid');
  const elementCount = dateElements.length;
  
  // Validate that we have either 3 or 6 elements
  if (elementCount !== 3 && elementCount !== 6) {
    if (elementCount === 0) {
      console.error('No elements found with class "testimonial-date-grid"');
      return;
    }
    return;
  }
  
  const currentDate = new Date();
  const dates = [];
  const usedDates = new Set();
  
  // Generate random dates based on the number of elements found
  while (dates.length < elementCount) {
    // Generate random number of days (0-29) to SUBTRACT from current date
    const randomDays = Math.floor(Math.random() * 30);
    
    // Create new date by subtracting random days (going backwards in time)
    const randomDate = new Date(currentDate.getTime() - (randomDays * 24 * 60 * 60 * 1000));
    
    // Create a date string to check for duplicates
    const dateKey = randomDate.toISOString().split('T')[0];
    
    // Only add if we haven't used this date before
    if (!usedDates.has(dateKey)) {
      usedDates.add(dateKey);
      dates.push(randomDate);
    }
  }
  
  // Sort dates chronologically (oldest to newest)
  dates.sort((a, b) => a - b);
  
  // Format dates and assign to elements
  dates.forEach((date, index) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    
    // Set the formatted date to the element
    dateElements[index].textContent = formattedDate;
  });
  
  return dates.map(date => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }));
}
  
  const slides = $('.slider-img');
  const slidesImg = $('.slider-img img');
  const sliderWrapper = $('.slider-images');
  const slideCount = slides.length;
  const slideWidth = slides.eq(0).outerWidth(true);
      const sliderImagesWidth = $('.slider-images').width();

  const contentData = [
    {
      mv: '+500 MV',
      color: "#E43E3E",
      title: 'Cola',
      heading: 'High oxidative stress. Promotes <br /> inflammation and cell damage.',
      desc: '(Loaded with sugars and artificial <br class="hidden md:block"/> chemicals that increase free radicals)'
    },
    {
      mv: '+300 MV',
      color: "#DA8502",
      title: 'Tap<br class="hidden md:block"/> Water',
      heading: 'Neutral to mildly oxidative. <br /> Some health benefits.',
      desc: 'Common tap water often contains <br class="hidden md:block" /> chlorine and lacks antioxidants'
    },
    {
      mv: '-200 MV',
      color: "#F9C705",
      title: 'Green<br class="hidden md:block"/> Tea',
      heading: 'Natural antioxidant source. <br /> Mild cellular protection.',
      desc: 'Contains polyphenols and catechins <br class="hidden md:block" /> that help reduce free radicals'
    },
    {
      mv: '-650 MV',
      color: "#38BCF8",
      title: 'Aqua<br class="hidden md:block"/> Vital',
      heading: 'Superior antioxidant potential. <br /> Defends against cellular aging.',
      desc: 'Delivers 10x antioxidants of green tea – <br class="hidden md:block"/> backed by research'
    }
  ];

  let currentIndex = 0;
  let interval;

 function updateSlide(index) {
  console.log('SlideWidth: ', slideWidth);
    console.log('Current Index:', index);
     const offset = $(window).width() < 768 ? sliderImagesWidth * index : slideWidth * index; 
    console.log(offset);
    
    sliderWrapper.css('transform', `translateX(-${offset}px)`);
    
    if ($(window).width() >= 768) {
      $(".bg-line-full").css({
        width: `${slideWidth * slideCount}px`,
        marginLeft: '6px'
      })
        slides.removeClass('active');
        slidesImg.css({
            transform: 'scale(0.5)',
            marginTop: '60px'
        });
        $('.bg-circle-shadow').css({ opacity: '0' });

        const currentSlide = slides.eq(index);
        currentSlide.addClass('active');
        currentSlide.find('.slide-img').css({
            transform: 'scale(.9)',
            marginTop: '0px'
        });
        currentSlide.find('.bg-circle-shadow').css({ opacity: '1' });
    } else {
      $('.content-c1').css('color',`${contentData[index].color}`)

          $('.slider-img').css({
        width: `${sliderImagesWidth}px`,
        flex: '0 0 auto'
    });
      $('.slide-img').css({
            transform: 'scale(.7)',
            marginBottom: '24px'
        });
      $(".bg-line-full").css({
        width: `${sliderImagesWidth * slideCount}px`,
        marginLeft: '6px'
      });
        $('.bg-circle-shadow').css({ opacity: '0' });
        const currentSlide = slides.eq(index);
        currentSlide.addClass('active');
        currentSlide.find('.bg-circle-shadow').css({ opacity: '1' });
    }

    $('.content-c1').html(contentData[index].mv);
    $('.content-c2').html(contentData[index].title);
    $('.content-c3').html(contentData[index].heading);
    $('.content-c4').html(contentData[index].desc);
}


  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide(currentIndex);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  // Arrows
  $('[alt="arrow-left"]').click(() => {
    stopAutoplay();
    prevSlide();
    startAutoplay();
  });

  $('[alt="arrow-right"]').click(() => {
    stopAutoplay();
    nextSlide();
    startAutoplay();
  });

  slides.click(function () {
    stopAutoplay();
    currentIndex = $(this).index();
    const sliderImgData = $(this).data('slider-img');
    updateSlide(sliderImgData);
    startAutoplay();
});

  updateSlide(currentIndex);
  startAutoplay();







  // Run on page load
  updateLogoSources();
  setRandomDatesToElements();
  checkMobile();
  HeroScript();
  updateAfflinksLinksOutbound();
  updateHeroAfterHeight();
  updateShippingDate();
  InitializeFAQ();
  initializeCountdown();
  disableClick();
  $(window).on('resize', function() {
    checkMobile();
    updateLogoSources();
    updateHeroAfterHeight();
  });

});
