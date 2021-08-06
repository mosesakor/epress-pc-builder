function cookieExists(name) {
  return document.cookie.split("; ").find((row) => row.startsWith(name)) != undefined;
}

(function onLoad() {
    const removeButtons = document.getElementsByClassName("removeKey");

    for (const button of removeButtons) {
    button.addEventListener("click", () => {
        const key = button.dataset.removekey;
        console.log('hi')
        if (cookieExists(key)) {
          console.log('hey')
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/list;`;
          window.location.reload();
        }
    });
    }
}());

