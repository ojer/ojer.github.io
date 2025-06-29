/*global console document window*/

const handleVisibilitychange = () => {
  // if (!document.hidden) { }
};

const menuChange = (e) => {
  console.log(e);
  // const { checked, value } = e.target;
  // if (checked && value === "m0") { }
};

document.addEventListener("visibilitychange", handleVisibilitychange);

const mql = window.matchMedia("(prefers-color-scheme: dark)");
document.head.querySelector('link[rel="icon"]').href = mql.matches
  ? "/image/icon-16-dark.png"
  : "/image/icon-16.png";
mql.onchange = (e) => {
  document.head.querySelector('link[rel="icon"]').href = e.matches
    ? "/image/icon-16-dark.png"
    : "/image/icon-16.png";
};

(async () => {
  const menuRadios = document.getElementsByClassName("menu-radio-group");
  Array.from(menuRadios).forEach((radio) => {
    radio.addEventListener("change", menuChange);
  });
})();
