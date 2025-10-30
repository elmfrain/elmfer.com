const splashScreen = document.querySelector('video.intro-vid');

function onTrigger() {
  console.log("hello");
}

function minutesSinceLastSplashScreen() {
  let lastSplashScreen = localStorage.getItem("lastSplashScreen");
  lastSplashScreen = lastSplashScreen ? new Date(lastSplashScreen) : null;
  lastSplashScreen = new Date().getTime() - (lastSplashScreen ? lastSplashScreen.getTime() : new Date().getTime());
  lastSplashScreen /= 60000;

  return lastSplashScreen;
}

function setupSplashVideoSrc() {
  const viewportWidth = window.screen.width;
  const viewportHeight = window.screen.height;
  const viewportAspectRatio = viewportWidth / viewportHeight;
  const screenDensity = window.devicePixelRatio ? Math.min(window.devicePixelRatio, 1.5) : 1;
  const screenResolution = Math.min(viewportWidth, viewportHeight) * screenDensity;

  const splashShape =
    viewportAspectRatio > (4 / 3) ? "lc" :
    viewportAspectRatio < (7 / 8) ? "pt" :
    "sq";

  const splashResolution =
    screenResolution > 1200 ? "1080" :
    screenResolution > 840  ? "720"  :
    screenResolution > 500  ? "480"  :
    "240";

  splashScreen.src = `/videos/intro-${splashShape}-${splashResolution}.webm`;
}

window.onhashchange = (e) => {
  if (!e.newURL.endsWith("#splash-screen"))
    return;

  setupSplashVideoSrc();

  splashScreen.style.animationName = "none";
  void splashScreen.offsetWidth;
  splashScreen.style.animationName = "intro";

  splashScreen.style.display = "block";
  splashScreen.currentTime = 0;

  setTimeout(() => {
    const oldHashIndex = e.oldURL.indexOf("#");
    const oldHash = e.oldURL.substr(oldHashIndex);
    if (oldHashIndex != -1 && !oldHash.includes("#splash-screen"))
      window.location.hash = oldHash;
    else
      window.location.hash = "";
  }, 3000);
};

const timeLastSplashScreen = minutesSinceLastSplashScreen();

localStorage.setItem("lastSplashScreen", new Date().toISOString());

if (timeLastSplashScreen > 90 || timeLastSplashScreen == 0.0 || window.location.href.endsWith("#splash-screen")) {
  setupSplashVideoSrc();
  // splashScreen.load();
  // splashScreen.play().catch(() => {});
} else
  splashScreen.style.display = "none";
