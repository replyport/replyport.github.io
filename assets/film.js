/* ReplyPort homepage film: progressive enhancement for the hero video.

   Without this script the <video> keeps its native controls and poster.
   With it:
   - the film previews silently, once, when it is at least half on screen,
     unless the visitor prefers reduced motion or has Data Saver on;
   - narration only ever starts from a click ("Watch the film" /
     "Watch with sound"), which restarts the film from the beginning;
   - the preview pauses when scrolled away and resumes when it comes back;
   - if the video cannot load, the poster stays and a link to the written
     version appears. */
(function () {
  var fig = document.getElementById('film');
  if (!fig) return;
  var video = fig.querySelector('video');
  var frame = fig.querySelector('.film__frame');
  var bar = fig.querySelector('.film__bar');
  var start = fig.querySelector('.film__start');
  var startLabel = fig.querySelector('.film__start-label');
  var errorNote = fig.querySelector('.film__error');
  var unmute = fig.querySelector('.film__unmute');
  if (!video || !bar || !start) return;

  function btn(act) { return bar.querySelector('[data-act="' + act + '"]'); }
  var bSound = btn('sound-start'), bToggle = btn('toggle'), bRestart = btn('restart'),
      bMute = btn('mute'), bCaptions = btn('captions'), bFull = btn('fullscreen');
  var timeEl = bar.querySelector('[data-time]');
  var progressEl = bar.querySelector('[data-progress]');

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var saveData = !!(navigator.connection && navigator.connection.saveData);

  // 'idle': poster or paused before any playback; 'preview': silent autoplay;
  // 'sound': started by the visitor, with narration.
  var mode = 'idle';
  var previewed = false;
  var pausedByScroll = false;

  video.removeAttribute('controls');
  video.muted = true;

  var track = video.textTracks && video.textTracks[0];
  if (track) track.mode = 'hidden';

  if (!(frame.requestFullscreen || video.requestFullscreen || video.webkitEnterFullscreen)) bFull.hidden = true;

  function fmt(t) {
    t = Math.max(0, Math.floor(t || 0));
    return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
  }

  function setToggle(paused) {
    var icon = bToggle.querySelector('.film__ico');
    icon.className = 'film__ico ' + (paused ? 'film__ico--play' : 'film__ico--pause');
    bToggle.querySelector('.film__btn-text').textContent = paused ? 'Play' : 'Pause';
  }

  function render() {
    var paused = video.paused || video.ended;
    setToggle(paused);
    bSound.hidden = mode === 'sound';
    bMute.hidden = mode !== 'sound';
    bMute.setAttribute('aria-pressed', String(!video.muted));
    bMute.querySelector('.film__btn-text').textContent = video.muted ? 'Sound off' : 'Sound on';
    fig.classList.toggle('is-ended', video.ended);
    var showStart = video.ended || (mode === 'idle' && paused);
    start.hidden = !showStart || fig.classList.contains('is-failed');
    startLabel.textContent = video.ended ? 'Watch again' : 'Watch the film';
    if (unmute) unmute.hidden = !(mode === 'preview' && !video.ended);
  }

  function playWithSound() {
    mode = 'sound';
    pausedByScroll = false;
    try { video.currentTime = 0; } catch (e) {}
    video.muted = false;
    var p = video.play();
    if (p && p.catch) p.catch(function () { mode = 'idle'; render(); });
    render();
  }

  function startPreview() {
    if (previewed || mode !== 'idle' || reduceMotion.matches || saveData) return;
    previewed = true;
    mode = 'preview';
    video.muted = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () { mode = 'idle'; render(); });
    render();
  }

  start.addEventListener('click', playWithSound);
  bSound.addEventListener('click', playWithSound);
  if (unmute) unmute.addEventListener('click', playWithSound);

  bToggle.addEventListener('click', function () {
    pausedByScroll = false;
    if (video.paused || video.ended) {
      if (mode === 'idle' || video.ended) { playWithSound(); return; }
      video.play();
    } else {
      video.pause();
    }
  });

  bRestart.addEventListener('click', function () {
    if (mode === 'idle') { playWithSound(); return; }
    try { video.currentTime = 0; } catch (e) {}
    video.play();
  });

  bMute.addEventListener('click', function () {
    video.muted = !video.muted;
    render();
  });

  bCaptions.addEventListener('click', function () {
    if (!track) return;
    var on = track.mode !== 'showing';
    track.mode = on ? 'showing' : 'hidden';
    bCaptions.setAttribute('aria-pressed', String(on));
  });

  bFull.addEventListener('click', function () {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });
  // Native controls inside full screen, none on the page.
  document.addEventListener('fullscreenchange', function () {
    video.controls = document.fullscreenElement === video;
  });

  // Clicking the picture plays or pauses, like any video.
  video.addEventListener('click', function () { bToggle.click(); });

  video.addEventListener('timeupdate', function () {
    timeEl.textContent = fmt(video.currentTime);
    if (video.duration) progressEl.style.width = (100 * video.currentTime / video.duration) + '%';
  });
  ['play', 'pause', 'ended', 'volumechange'].forEach(function (ev) { video.addEventListener(ev, render); });

  // Failure: keep the poster, remove controls, point to the written version.
  var sources = video.querySelectorAll('source');
  var last = sources[sources.length - 1];
  function fail() {
    fig.classList.add('is-failed');
    errorNote.hidden = false;
    start.hidden = true;
  }
  if (last) last.addEventListener('error', fail);
  video.addEventListener('error', fail);

  // Silent preview when the film is on screen; pause it when it leaves.
  if ('IntersectionObserver' in window && !reduceMotion.matches && !saveData) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (visible) {
          if (!previewed) startPreview();
          else if (pausedByScroll && mode === 'preview') { pausedByScroll = false; video.play(); }
        } else if (mode === 'preview' && !video.paused) {
          pausedByScroll = true;
          video.pause();
        }
      });
    }, { threshold: [0, 0.5] });
    io.observe(frame);
  }

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches && mode === 'preview') { video.pause(); mode = 'idle'; render(); }
    });
  }

  render();
})();
