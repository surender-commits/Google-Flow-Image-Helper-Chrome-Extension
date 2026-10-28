if (window.__googleFlowHelperInitialized) {
  console.log("[Google Flow Helper] Already initialized.");
} else {
  window.__googleFlowHelperInitialized = true;

  let hoveredImageElement = null;

  function onPointerOver(event) {
    hoveredImageElement = event.target.closest("img");
  }

  function onPointerOut(event) {
    if (event.target === hoveredImageElement) {
      hoveredImageElement = null;
    }
  }

  function onKeyDown(event) {
    // Handle ALT for image name logging
    if (event.code === "Alt") {
      if (!hoveredImageElement) {
        console.log("[Google Flow Helper] No hovered image.");
        return;
      }

      event.preventDefault();

      const imageName = hoveredImageElement?.parentElement?.nextElementSibling
        ?.querySelector("div > div > div > i")
        ?.nextElementSibling?.textContent?.trim();

      // console.log(hoveredImageElement);
      // console.log(hoveredImageElement?.parentElement);
      // console.log(hoveredImageElement?.parentElement?.nextElementSibling);
      // console.log(hoveredImageElement?.parentElement?.nextElementSibling?.querySelector("div > div > div > i"));
      // console.log(hoveredImageElement?.parentElement?.nextElementSibling?.querySelector("div > div > div > i")?.nextElementSibling?.textContent?.trim());

      if (!imageName) {
        console.log("[Google Flow Helper] Image name not found.");
        return;
      }

      console.log("[Google Flow Helper] Image:", imageName);

      handleImageName(imageName);
      return;
    }

    // Handle ']' button to trigger click on the like element
    if (event.key === "]") {
      event.preventDefault();

      // Adjust this selector to match your target "like" element relative to the hovered image
      const likeElement =
        document.querySelector(
          "#__next > div.sc-271a0d98-1.gAksiz > div.sc-df62d3c5-3.exFrcy > div.sc-8e6edf59-3.jgFNYA > header > div > button:nth-child(1)",
        ) ||
        document.querySelector(
          "#__next > div.sc-271a0d98-1.gAksiz > div.sc-df62d3c5-3.exFrcy > div.sc-df62d3c5-0.jsbmDI > div.sc-df62d3c5-2.fRlmzz > div > div.sc-5693cb26-4.kRcPH > button:nth-child(1)",
        );

      if (!likeElement) {
        console.log("[Google Flow Helper] Like element not found.");
        return;
      }

      console.log("[Google Flow Helper] Liking image...");
      likeElement.click();
      return;
    }

    // Handle '\' button to trigger click on the download button
    if (event.key === "\\") {
      event.preventDefault();

      // Adjust this selector to match your target "download" element relative to the hovered image
      const downloadElement = document.querySelector(
        "#__next > div.sc-271a0d98-1.gAksiz > div.sc-df62d3c5-3.exFrcy > div.sc-8e6edf59-3.jgFNYA > header > div > button.sc-e8425ea6-0.hOBPaw.sc-d3791a4f-0.sc-d3791a4f-4.sc-d3791a4f-6.sc-8e6edf59-11.ewGlDn.famhRe.kkTxKe.jFcWag",
      );

      if (!downloadElement) {
        console.log("[Google Flow Helper] Download element not found.");
        return;
      }

      console.log("[Google Flow Helper] Downloading image...");
      downloadElement.click();
      return;
    }
  }

  async function handleImageName(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied:", text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);
  document.addEventListener("keydown", onKeyDown);

  console.log("[Google Flow Helper] Initialized.");
}
