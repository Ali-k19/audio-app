//btns
const $playBtn = document.querySelector('#play-btn')
const $pauseBtn = document.querySelector('#pause-btn')
const $getCurrentTimeBtn = document.querySelector('#getCurrentTime-btn')
const $stopBtn = document.querySelector('#stop-btn')
const $forwardBtn = document.querySelector('#forward-btn')
const $backwardBtn = document.querySelector('#backward-btn')

//div
const $getCurrentTimeRegion = document.querySelector('#current-time-region')

const wavesurfer = WaveSurfer.create({
    container: document.querySelector('#track'),
    waveColor: '#D9DCFF',
    progressColor: '#4353FF',
    cursorColor: '#4353FF',
    barWidth: 3,
    barRadius: 3,
    cursorWidth: 1,
    height: 200,
    barGap: 3,
    scrollParent:true
});

const fileArr = []
var songsCount = 0

// Loading the first file
document.getElementById("fileinput").addEventListener('change', function(e){

    var file = this.files[0];

    fileArr.push(file)

    if(fileArr.length === 1){
    var reader = new FileReader();
    
    reader.onload = function (evt) {
        // Create a Blob providing as first argument a typed array with the file buffer
        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

        // Load the blob into Wavesurfer
        wavesurfer.loadBlob(blob);
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
    };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(fileArr[0]);
}
}, false);

//playList Functionalities
wavesurfer.on('finish', () => {
    if (songsCount < fileArr.length - 1){
        var reader = new FileReader();
    
    reader.onload = function (evt) {
        // Create a Blob providing as first argument a typed array with the file buffer
        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

        // Load the blob into Wavesurfer
        wavesurfer.loadBlob(blob);
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
    };  

        songsCount = songsCount + 1;

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(fileArr[songsCount]);

        console.log(songsCount)

    wavesurfer.on('ready', function () {
        // Enable creating regions by dragging
        wavesurfer.play();
      });
    }
})

$backwardBtn.addEventListener('click', () => {
    if(songsCount != 0) {
        songsCount = songsCount - 1
        console.log(songsCount)

        var reader = new FileReader();
    
    reader.onload = function (evt) {
        // Create a Blob providing as first argument a typed array with the file buffer
        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

        // Load the blob into Wavesurfer
        wavesurfer.loadBlob(blob);
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
    };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(fileArr[songsCount]);

    wavesurfer.on('ready', function () {
        // Enable creating regions by dragging
        wavesurfer.play();
      });
    }
})

$forwardBtn.addEventListener('click', () => {
    if(songsCount != fileArr.length - 1) {
        songsCount = songsCount + 1
        console.log(songsCount)

        var reader = new FileReader();
    
    reader.onload = function (evt) {
        // Create a Blob providing as first argument a typed array with the file buffer
        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

        // Load the blob into Wavesurfer
        wavesurfer.loadBlob(blob);
    };

    reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
    };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(fileArr[songsCount]);

    wavesurfer.on('ready', function () {
        // Enable creating regions by dragging
        wavesurfer.play();
      });
    }
})

 //region plugins
 wavesurfer.on('region-update-end', function(region, event){  

    if(!region.hasDeleteButton) {
        var regionEl = region.element;

        var deleteButton = regionEl.appendChild(document.createElement('deleteButton'));
        deleteButton.className = 'fa fa-trash';

        

        deleteButton.addEventListener('click', function(e) {
        region.remove();
 });
 
    deleteButton.title = "Delete region";
 
    var css = {
           display: 'block',
           float: 'right',
           padding: '3px',
           position: 'relative',
           zIndex: 10,
           cursor: 'pointer',
           cursor: 'hand',
           color: '#129fdd'
   };

     
   region.style(deleteButton, css);
   region.hasDeleteButton = true;    
}
});

wavesurfer.on('ready', function () {
    // Enable creating regions by dragging
    wavesurfer.enableDragSelection({});
  });

//wavesurfer
$playBtn.addEventListener('click', (e) => {
    e.preventDefault();

    wavesurfer.play();
})

$pauseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    wavesurfer.pause();
})

$stopBtn.addEventListener('click', (e) => {
    e.preventDefault()

    wavesurfer.stop();
})

wavesurfer.on('ready', () => {
    const timeLine = document.querySelector('#time-line')
    var timeline = Object.create(WaveSurfer.Timeline);

    timeline.init({
      wavesurfer: wavesurfer,
      container: "#time-line"
    });
})

wavesurfer.on('audioprocess', () => {
    $getCurrentTimeRegion.innerHTML = (wavesurfer.getCurrentTime()/60).toFixed(2) + " - " + (wavesurfer.getDuration()/60).toFixed(2)
})

    