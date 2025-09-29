document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("birthDate");
  const rewardBtn = document.getElementById("rewardBtn");
  const loadingDiv = document.getElementById("loading");
  const rewardBox = document.getElementById("rewardBox");

  // Flatpickr initialization
  flatpickr(input, {
    dateFormat: "Y-m-d",
    maxDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    disableMobile: false,
  });

  const loadingLines = [
    "Ugh, not another birthday... but okay, let's make it fun.",
    "Fine, searching for your \"special\" surprise... hold on!",
    "Filtering out basic gifts... you deserve something pretty.",
    "Debating if you’ve been nice enough this year… yep, you have!",
    "Okay okay, you win. Preparing something mildly impressive.",
    "Wrapping it in glitter and questionable effort... almost there.",
    "Done. Hope it lives up to your very average expectations.",
  ];

  let currentIndex = 0;
  let loadingTimeout, fadeTimeout;

  function showNextLine() {
    if (currentIndex < loadingLines.length) {
      // Fade out old line
      loadingDiv.classList.remove("visible");

      setTimeout(() => {
        // Replace with new line
        loadingDiv.textContent = loadingLines[currentIndex];
        loadingDiv.classList.add("visible");

        // Calculate reading time
        const baseTime = 1700;
        const charsPerSecond = 12;
        let readingTime = baseTime + (loadingLines[currentIndex].length / charsPerSecond) * 1000;

        currentIndex++;
        loadingTimeout = setTimeout(showNextLine, readingTime);
      }, 500);
    } else {
      // Finished all lines
      loadingDiv.classList.remove("visible");
      fadeTimeout = setTimeout(() => {
        loadingDiv.innerHTML = "";
        rewardBox.style.display = "block";
        rewardBtn.disabled = false;
        rewardBtn.textContent = "Try Again?";
      }, 700);
    }
  }

  function startReward() {
    if (!input._flatpickr || input._flatpickr.selectedDates.length === 0) {
      alert("Pick your birthday first, that's important!");
      input.focus();
      return;
    }

    rewardBox.style.display = "none";
    loadingDiv.innerHTML = "";
    loadingDiv.classList.add("visible");
    rewardBtn.disabled = true;
    rewardBtn.textContent = "Getting Excited...";
    currentIndex = 0;

    showNextLine();
  }

  rewardBtn.addEventListener("click", startReward);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startReward();
  });

  input.focus();
});
