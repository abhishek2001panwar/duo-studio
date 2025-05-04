
function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

init();

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 10+"px"
    crsr.style.top = dets.y + 10+"px"
})

//
var boxes = document.querySelectorAll(".box")
boxes.forEach(function(ele){
    ele.addEventListener("mouseenter",function(){
        crsr.style.height = '400px' 
        crsr.style.width = '400px'
        crsr.style.borderRadius = "4%"
        let att  = ele.getAttribute("data-image")
        crsr.style.backgroundImage = `url(${att})`
        crsr.style.backgroundSize = "cover"
        crsr.style.backgroundPosition = "center"
        crsr.style.transform = "scale(1)"
        crsr.style.zIndex = "1000"
        ele.style.transition = "all 0.5s"
      
    })
    ele.addEventListener("mouseleave",function(){
        crsr.style.height = '20px'
        crsr.style.width = '20px'
        crsr.style.borderRadius = "50%"
        ele.style.transition = "all 0.5s"
        crsr.style.backgroundImage = "none"
        crsr.style.transform = "scale(0)"
        
    })
})



document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(0,1, 0, ${Math.random() * 0.1 + 0.05})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles with lines if close enough
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 0, 0, ${(1 - distance/100) * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
});



var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".center h1",
        scroller: ".main",
        // markers:true,
        start: "top 27%",
        end: "top 0",
        
        scrub: 3
    }
})

gsap.to('.center h1' ,{
    x: 100,

    duration : 2,
} ,"b");

gsap.from('.navbar a', {
    y: -50, // Start from above
    opacity: 0,
    duration: 2,
    stagger: 0.2,
})


tl.to('.center h1' ,{
    x : -100,
} ,'a')
tl.to('.center h2' ,{
    x : 100,
}, "a")

tl.to(".video-container video",{
    width : "90%",
    height : "90%",
    top : "-5%",
    duration : 1,
}, "a")

// gsap.to(".main", {
//     backgroundColor: "#111", // or your desired color
//     scrollTrigger: {
//       trigger: ".page2",
//       scroller: ".main",
//       start: "top center",
//       end: "bottom center",
//       scrub: true,
//       markers: true
//     }
//   });


gsap.registerPlugin(ScrollTrigger);

// Animate background change only for .page2
// Background color toggle for page1 + page2
ScrollTrigger.create({
    trigger: ".page2",
    scroller: ".main", // required if you're using Locomotive Scroll
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      document.querySelector(".page1").style.backgroundColor = "#000";
      document.querySelector(".page2").style.backgroundColor = "#000";
      document.querySelector(".page2").style.color = "#fff"; // Optional: make text visible
    },
    onLeaveBack: () => {
      document.querySelector(".page1").style.backgroundColor = "#fff";
      document.querySelector(".page2").style.backgroundColor = "#fff";
      document.querySelector(".page2").style.color = "#000"; // Reset text color
    }
  });
  
  const galleryItems = document.querySelectorAll('.gallery-item');
      
  galleryItems.forEach((item, index) => {
    const direction = item.getAttribute('data-direction');
    const xOffset = direction === 'right' ? 200 : -200; // Move right or left
    
    // Initial position - slightly offset in the opposite direction
    gsap.set(item, {
      x: -xOffset * 0.5 // Start from opposite direction
    });
    
    // Create the scroll-triggered animation
    gsap.to(item, {
      x: xOffset, // Move in the specified direction
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: '#gallery-container',
        scroller: ".main", // Important for Locomotive Scroll
        start: "top 90%",
        end: "bottom 20%",
        scrub: true,
        toggleActions: "play none none reverse"
      }
    });
  });