(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
})()
  

  function setupParticlesBackground() {
    tsParticles.load("tsparticles", {
      particles: {
        links: {
          enable: true,
          distance: 100,
          opacity: 0.5,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 55,
        },
        size: {
          value: 3,
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 2,
          straight: false,
        },
        opacity: {
          value: 0.5,
        },
      },
      retina_detect: true,
    });

    
  }
  document.addEventListener("DOMContentLoaded", () => {
    // 
    const navbar = document.querySelector("nav");
    const observer = new IntersectionObserver(entries => {
      if (entries[0].boundingClientRect.y < 0) {
        navbar.classList.add("navbar--sticky");
      } else {
        navbar.classList.remove("navbar--sticky");
      }
    });
    observer.observe(document.querySelector("#navbar-trigger"));

    const drawer = document.getElementById("navbar-drawer");
    const drawerOpenBtn = document.getElementById("drawer-open");
    const drawerCloseBtn = document.getElementById("drawer-close");

    drawerOpenBtn.addEventListener("click", () => {
      drawer.showModal();
    });
    document.querySelectorAll("#drawer-close, #navbar-drawer a").forEach(element => {
      element.addEventListener("click", () => {
        drawer.close();
      });
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.timeline-element').forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Trigger when the element's top is 80% from the top of the viewport
          end: 'bottom 30%', // End when the element's bottom is 20% from the top of the viewport
          toggleActions: 'play none none reverse'
        }
      }
    );
  });