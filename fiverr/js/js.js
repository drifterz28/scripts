

//on page load video 1 will be played in this function
function video1(){

			 window.open('', '_self', '');
			 var v1;
			 v1='<span><video  id="v1" onloadedmetadata="this.muted = false"  playsinline  autoplay><source src="videos/video1.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay1").innerHTML=v1;

			}



// This Function checks the PIN
function check(p1) {

	  var passcode1= "0332"; // Hardcoded 4 Digit PIN HERE

	  if (p1.value.match(passcode1)) {

		  hideVideo1();
		  v='<h2 class="login">LOGIN SUCCESSFULLY</h2><video  id="v1"  onloadedmetadata="this.muted = false" playsinline  autoplay><source src="videos/video3.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
		  document.getElementById("videoplay3").innerHTML = v;
		  closeWindow();
		 }

	 else{
			 var v ='<video  id="v1"onloadedmetadata="this.muted = false" playsinline  autoplay><source src="videos/video2.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay2").innerHTML=v;
			 var v1 ='<video style="display: none;"  onloadedmetadata="this.muted = true"  playsinline muted autoplay><source src="videos/video1.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay1").innerHTML=v1;

			var v3 ='<video style="display: none;"  onloadedmetadata="this.muted = true"  playsinline muted autoplay><source src="videos/video3.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay3").innerHTML=v3;
		    }
  }

  function hideVideo1()
  {

		 var hidemain= document.getElementById("main");
		 hidemain.style.display = "none";
		 var v1 ='<video style="display: none;"  onloadedmetadata="this.muted = true"  playsinline muted autoplay><source src="videos/video1.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay1").innerHTML=v1;
		 var v2 ='<video style="display: none;"  onloadedmetadata="this.muted = true"  playsinline muted autoplay><source src="videos/video2.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>';
			 document.getElementById("videoplay2").innerHTML=v2;
  }

//Function to close window automatically
function closeWindow() {

  setTimeout(function(){ window.close(); }, 9000); //17000 is the time of the last video then after this time window closes
}

function dateTime(element) {
	var d = new Date();
	var elm = document.querySelector(element);
	var createTime = function() {
		var hours = Number(d.getHours());
		var minutes = Number(d.getMinutes());
		var meridian = 'am';
		if(minutes < 10) {
			minutes = '0' + minutes;
		}
		if(hours > 12) {
			meridian = 'pm';
			hours = hours - 12;
		}
		return '<div class="time">' + hours + ':' + minutes + ' ' + meridian + '</div>';
	}
	var createDate = function() {
		return '<div class="date">' + [
			d.getMonth() + 1,
			d.getDate(),
			d.getFullYear()
		].join('/') + '</div>';
	};
	elm.insertAdjacentHTML('afterbegin', '<div class="time-date">' + createTime() + createDate() + '</div>');
}

window.addEventListener('load', function () {
	dateTime('.container');
}, false);
