if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}


(function() {
  
    var width = 320; 
    var height = 0;   
  
    var streaming = false;
  
    var video = null;
    var canvas = null;
    var photo = null;
    var pictureButton = null;
  
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      pictureButton = document.getElementById('picture-button');
  //Usage of mediaDevices
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
        
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      pictureButton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
      
      clearphoto();
    }
  

    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
  
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  

    window.addEventListener('load', startup, false);
  })();

 /* document.addEventListener('click', event =>{
      if (event.target)
  })*/


  let canvas = document.getElementById('canvas');
  let photo = document.getElementById('photo');
  let video = document.getElementById('video');


  //all filters
  document.addEventListener('click', event =>{
    if(event.target.classList.contains('filter-btn')){
        if(event.target.classList.contains('brightness-add')){
            Caman("#photo", function() {
                this.brightness(5).render();
            });
        }else if(event.target.classList.contains('brightness-remove')) {
            Caman("#photo", function() {
                this.brightness(-5).render();
            })
        }else if(event.target.classList.contains('contrast-add')) {
            Caman("#photo", function() {
                this.contrast(5).render();
            })
        }else if(event.target.classList.contains('contrast-remove')) {
            Caman("#photo", function() {
                this.contrast(-5).render();
            })
        }else if(event.target.classList.contains('vibrance-add')) {
            Caman("#photo", function() {
                this.vibrance(5).render();
            })
        }else if(event.target.classList.contains('vibrance-remove')) {
            Caman("#photo", function() {
                this.vibrance(-5).render();
            })
        }else if(event.target.classList.contains('hue-add')) {
            Caman("#photo", function() {
                this.hue(5).render();
            })
        }else if(event.target.classList.contains('hue-remove')) {
            Caman("#photo", function() {
                this.hue(-5).render();
            })
        }else if(event.target.classList.contains('gamma-add')) {
            Caman("#photo", function() {
                this.gamma(5).render();
            })
        }else if(event.target.classList.contains('gamma-remove')) {
            Caman("#photo", function() {
                this.gamma(-5).render();
            })
        }
    }
})


