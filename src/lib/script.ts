// this script executes immediately and sets the theme class on the html element, preventing a flash of the wrong theme
// Learn more about FOUC: https://en.wikipedia.org/wiki/Flash_of_unstyled_content
export const themeScript = `!function e(){let t=localStorage.getItem("theme");!t&&window.matchMedia&&(t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),"dark"===t&&document.querySelector("html").classList.add("dark"),localStorage.setItem("theme",t)}();`;
