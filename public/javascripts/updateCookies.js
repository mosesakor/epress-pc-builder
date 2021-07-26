(function onLoad() {
  const addButtons = document.getElementsByClassName("add");
  for (const button of addButtons) {
    button.addEventListener("click", () => {
      const productID = button.dataset.productid;
      const key = button.dataset.componentid;
      console.log('hello')
      document.cookie = `${key}=${productID}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/list;`;
      window.location.replace("/list");
    });
  }
})();

