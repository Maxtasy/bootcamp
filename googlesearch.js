// Logic for google search

const googleInputElement = document.querySelector("#google-input");
const googleSearchButtonElement = document.querySelector(
  "#google-search-button"
);

googleSearchButtonElement.addEventListener("click", () => {
  const googleInput = googleInputElement.value.trim();

  if (googleInput !== "") {
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
      googleInput
    )}`;
    window.open(searchURL, "_blank");
  }
});
