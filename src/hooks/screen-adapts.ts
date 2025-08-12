export const useScreenAdapts = () => {
  const adapts = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    const scale = Math.min(width / 1920, height / 1080);
    document.body.style.setProperty('--adapt-ratio', scale.toString());
  };

  window.addEventListener('resize', adapts);
  adapts();
};
