// START: Video Section 
document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.querySelector(".video-container video");
  const videoTitle = document.querySelector(".video-title h5");
  const videoDescriptionContainer = document.querySelector(
    ".video-description p"
  );
  const youtubeLink = document.querySelector("#youtube-link");
  const lessonLinks = document.querySelectorAll(".lessons-list a");
  const icons = document.querySelectorAll(".lessons-list i");

  lessonLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Update video source
      const videoSrc = link.getAttribute("data-video-src");
      videoElement.querySelector("source").setAttribute("src", videoSrc);
      videoElement.load();

      // Update video title
      videoTitle.textContent = link.textContent;

      // Update video description
      const videoDescription = link.getAttribute("data-description");
      videoDescriptionContainer.textContent = videoDescription;

      // Update YouTube link
      const youtubeHref = link.getAttribute("data-youtube-link");
      youtubeLink.setAttribute("href", youtubeHref);

      // Update active class on playlist
      lessonLinks.forEach((item) => item.classList.remove("active"));
      icons.forEach((icon) => {
        icon.classList.remove("fa-play-circle", "text-brand");
        icon.classList.add("fa-circle");
      });

      link.classList.add("active");
      icons[index].classList.remove("fa-circle");
      icons[index].classList.add("fa-play-circle", "text-brand");
    });
  });
});
// END: Video Section 

// Test: I forgot what this code does
document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll(".node");
  const title = document.getElementById("node-title");
  const desc = document.getElementById("node-desc");

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      const nodeTitle = node.getAttribute("data-title");
      const nodeDesc = node.getAttribute("data-desc");

      title.textContent = nodeTitle;
      desc.textContent = nodeDesc;
    });
  });
});

// START: NETWORKING CALCULATOR
// Binary Calculator/Converter - START
document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculate-binary');
  const convertButton = document.getElementById('convert-value');
  const calculatorResult = document.getElementById('calculator-result');
  const converterResult = document.getElementById('converter-result');

  // Function to display errors in text-danger style
  function showError(element, message) {
    element.innerHTML = `<span class="text-danger">${message}</span>`;
  }

  // Calculator Logic
  calculateButton.addEventListener('click', () => {
    const binary1 = document.getElementById('binary1').value.trim();
    const binary2 = document.getElementById('binary2').value.trim();
    const operation = document.getElementById('operation').value;

    // Validate inputs
    if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {
      showError(calculatorResult, 'Error: Please enter valid binary values.');
      return;
    }

    // Convert binary to decimal
    const num1 = parseInt(binary1, 2);
    const num2 = parseInt(binary2, 2);
    let result;

    // Perform the selected operation
    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          showError(calculatorResult, 'Error: Division by zero is not allowed.');
          return;
        }
        result = Math.floor(num1 / num2);
        break;
      default:
        result = null;
    }

    // Display the results
    calculatorResult.innerHTML = `
      <strong>Result (binary):</strong> ${result.toString(2)}<br>
      <strong>Result (decimal):</strong> ${result}
    `;
  });

  // Converter Logic
  convertButton.addEventListener('click', () => {
    const conversionType = document.querySelector('input[name="convertType"]:checked').value;
    const inputValue = document.getElementById('conversion-input').value.trim();

    // Handle different conversion types
    if (conversionType === 'binary-to-decimal' && /^[01]+$/.test(inputValue)) {
      converterResult.innerHTML = `<strong>Decimal notation:</strong> ${parseInt(inputValue, 2)}`;
    } else if (conversionType === 'decimal-to-binary' && /^[0-9]+$/.test(inputValue)) {
      converterResult.innerHTML = `<strong>Binary notation:</strong> ${parseInt(inputValue, 10).toString(2)}`;
    } else if (conversionType === 'binary-to-hex' && /^[01]+$/.test(inputValue)) {
      converterResult.innerHTML = `<strong>Hexadecimal notation:</strong> ${parseInt(inputValue, 2).toString(16).toUpperCase()}`;
    } else if (conversionType === 'hex-to-binary' && /^[0-9A-Fa-f]+$/.test(inputValue)) {
      converterResult.innerHTML = `<strong>Binary notation:</strong> ${parseInt(inputValue, 16).toString(2)}`;
    } else {
      showError(converterResult, 'Error: Invalid input or conversion type.');
    }
  });
});
// END: Binary Calculator/Converter

// START: Bandwidth Calculator
// Utility function to convert units
function convertDataUnits(size, fromUnit, toUnit) {
  const unitFactors = {
      b: 1 / 8, // bits
      kb: 1 / 8 * 1024, // kilobits
      mb: 1 / 8 * 1024 ** 2, // megabits
      gb: 1 / 8 * 1024 ** 3, // gigabits
      tb: 1 / 8 * 1024 ** 4, // terabits
      B: 1, // Bytes
      KB: 1024, // Kilobytes
      MB: 1024 ** 2, // Megabytes
      GB: 1024 ** 3, // Gigabytes
      TB: 1024 ** 4, // Terabytes
  };

  if (!unitFactors[fromUnit] || !unitFactors[toUnit]) {
      return null;
  }

  return (size * unitFactors[fromUnit]) / unitFactors[toUnit];
}

// Handle Data Unit Conversion
document.getElementById("bandwidth-calculate").addEventListener("click", () => {
  const size = parseFloat(document.getElementById("file-size").value);
  const fromUnit = document.getElementById("file-unit").value;
  const toUnit = document.getElementById("target-unit").value;

  const errorElement = document.getElementById("bandwidth-error");
  const resultElement = document.getElementById("bandwidth-result");

  if (isNaN(size) || size <= 0) {
      errorElement.classList.remove("d-none");
      resultElement.textContent = "Your converted size will appear here.";
  } else {
      errorElement.classList.add("d-none");
      const convertedSize = convertDataUnits(size, fromUnit, toUnit);
      if (convertedSize !== null) {
          resultElement.textContent = `${convertedSize.toFixed(2)} ${toUnit}`;
      } else {
          resultElement.textContent = "Conversion error. Please try again.";
      }
  }
});

// Handle Download/Upload Time Calculation
document.getElementById("download-calculate").addEventListener("click", () => {
  const fileSize = parseFloat(document.getElementById("download-file-size").value);
  const fileUnit = document.getElementById("download-file-unit").value;
  const bandwidth = parseFloat(document.getElementById("download-bandwidth").value);
  const bandwidthUnit = document.getElementById("bandwidth-unit").value;

  const errorElement = document.getElementById("download-error");
  const resultElement = document.getElementById("download-result");

  if (isNaN(fileSize) || fileSize <= 0 || isNaN(bandwidth) || bandwidth <= 0) {
      errorElement.classList.remove("d-none");
      resultElement.textContent = "Your calculated time will appear here.";
  } else {
      errorElement.classList.add("d-none");

      const fileSizeInBytes = convertDataUnits(fileSize, fileUnit, "B");
      const bandwidthInBytesPerSec = convertDataUnits(bandwidth, bandwidthUnit, "B");

      if (fileSizeInBytes !== null && bandwidthInBytesPerSec !== null) {
          const timeInSeconds = fileSizeInBytes / bandwidthInBytesPerSec;

          const hours = Math.floor(timeInSeconds / 3600);
          const minutes = Math.floor((timeInSeconds % 3600) / 60);
          const seconds = Math.floor(timeInSeconds % 60);

          let timeString = `${seconds} seconds`;
          if (minutes > 0) timeString = `${minutes} minutes, ` + timeString;
          if (hours > 0) timeString = `${hours} hours, ` + timeString;

          resultElement.textContent = `Estimated time: ${timeString}`;
      } else {
          resultElement.textContent = "Calculation error. Please try again.";
      }
  }
});
// END: Bandwidth Calculator

// START: IP Subnet Calculator
// Validate IPv4 Address
function isValidIPv4(ip) {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

// IPv4 Subnet Calculation
document.getElementById("ipv4-calculate").addEventListener("click", () => {
  const ip = document.getElementById("ipv4-address").value;
  const mask = parseInt(document.getElementById("ipv4-subnet-mask").value, 10);

  if (!isValidIPv4(ip)) {
    document.getElementById("ipv4-result").innerHTML = "<span class='text-danger'>Invalid IPv4 Address!</span>";
    return;
  }

  const ipParts = ip.split(".").map(Number);
  const maskBinary = ~((1 << (32 - mask)) - 1) >>> 0;

  const network = (ipParts.reduce((acc, octet, i) => acc | (octet << ((3 - i) * 8)), 0) & maskBinary) >>> 0;
  const broadcast = network | ~maskBinary >>> 0;

  const networkAddress = `${(network >>> 24) & 0xff}.${(network >>> 16) & 0xff}.${(network >>> 8) & 0xff}.${network & 0xff}`;
  const broadcastAddress = `${(broadcast >>> 24) & 0xff}.${(broadcast >>> 16) & 0xff}.${(broadcast >>> 8) & 0xff}.${broadcast & 0xff}`;

  document.getElementById("ipv4-result").innerHTML = `
    <ul>
      <li><strong>Network Address:</strong> ${networkAddress}</li>
      <li><strong>Broadcast Address:</strong> ${broadcastAddress}</li>
      <li><strong>Subnet Mask:</strong> ${mask} bits</li>
    </ul>`;
});

// Validate IPv6 Address
function isValidIPv6(ip) {
  const ipv6Regex = /^[0-9a-fA-F:]+$/;
  return ipv6Regex.test(ip);
}

// IPv6 Subnet Calculation
document.getElementById("ipv6-calculate").addEventListener("click", () => {
  const ip = document.getElementById("ipv6-address").value;
  const prefix = parseInt(document.getElementById("ipv6-prefix-length").value, 10);

  if (!isValidIPv6(ip)) {
    document.getElementById("ipv6-result").innerHTML = "<span class='text-danger'>Invalid IPv6 Address!</span>";
    return;
  }

  document.getElementById("ipv6-result").innerHTML = `
    <ul>
      <li><strong>IPv6 Address:</strong> ${ip}</li>
      <li><strong>Prefix Length:</strong> /${prefix}</li>
      <li><strong>Network Range:</strong> Calculations for IPv6 ranges require CIDR analysis.</li>
    </ul>`;
});
// END: IP Subnet Calculator
// END: NETWORKING CALCULATOR


// START: NETWORKING QUIZ SECTION - Uses QuizQuestions.json to fetch the questions & answers
let currentQuestionIndex = 0;
let correctCount = 0;
let streakCount = 0;
let quizQuestions = [];
let userAnswers = []; // Store user answers globally

// Keep track of which quiz file is being used, for resume functionality
let currentQuizFile = "quizQuestions.json";

/**
 * Load questions from a given JSON file.
 * Resets quiz state and progress bar.
 */
async function loadQuestions(quizFile = "quizQuestions.json") {
  // Store the selected quiz file
  currentQuizFile = quizFile;

  // Reset state
  currentQuestionIndex = 0;
  correctCount = 0;
  streakCount = 0;
  userAnswers = []; // Reset user answers

  // Reset progress bar
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "0%";
  document.getElementById("progress").textContent = "0%";

  try {
    // Fetch quiz data
    const response = await fetch(quizFile);
    quizQuestions = await response.json();

    // Display the first question
    displayQuestion();
  } catch (error) {
    console.error("Error loading quiz data:", error);
    alert("Failed to load quiz data. Please try again.");
  }
}

/**
 * Handle dropdown selection for quiz choice.
 */
function handleQuizSelection() {
  const quizSelect = document.getElementById("quiz-select");
  const selectedQuizFile = quizSelect.value;
  loadQuestions(selectedQuizFile);
}

/**
 * Display the current question and update progress bar.
 */
function displayQuestion() {
  if (!quizQuestions || quizQuestions.length === 0) return;

  const questionData = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");

  // Update question text
  questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;

  // Determine input type: radio for single-choice, checkbox for multiple-choice
  const inputType = questionData.type === "multiple" ? "checkbox" : "radio";

  // Populate options
  optionsContainer.innerHTML = questionData.options
    .map(
      (option, index) => `
      <div class="list-group-item option-box">
        <input type="${inputType}" id="option${index}" name="quiz" value="${option}">
        <label for="option${index}" class="option-label">${option}</label>
      </div>`
    )
    .join("");

  // Update progress bar
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progressPercentage}%`;
  document.getElementById("progress").textContent = `${progressPercentage}%`;

  // Hide feedback and next button
  document.getElementById("feedback-box").style.display = "none";
  document.getElementById("next-button").style.display = "none";
}

/**
 * Handle answer submission and provide feedback.
 */
function submitAnswer() {
  const options = document.getElementsByName("quiz");
  const questionData = quizQuestions[currentQuestionIndex];
  const correctAnswer = questionData.answer;
  const isMultipleChoice = questionData.type === "multiple";

  let selectedAnswers = [];

  // Gather selected answers
  for (const option of options) {
    if (option.checked) {
      selectedAnswers.push(option.value);
    }
  }

  // Store the user's answer
  userAnswers[currentQuestionIndex] = isMultipleChoice ? selectedAnswers : selectedAnswers[0];

  let isCorrect = false;

  if (isMultipleChoice) {
    // For multiple-choice, ensure all selected answers match the correct answers
    isCorrect =
      selectedAnswers.length === correctAnswer.length &&
      selectedAnswers.every((answer) => correctAnswer.includes(answer));
  } else {
    // For single-choice, check if the single selected answer matches the correct answer
    isCorrect = selectedAnswers[0] === correctAnswer;
  }

  // Increment correctCount if the answer is correct
  if (isCorrect) {
    correctCount++;
    streakCount++;
  } else {
    streakCount = 0; // Reset streak on an incorrect answer
  }

  // Show feedback
  const feedbackBox = document.getElementById("feedback-box");
  const feedbackMessage = document.getElementById("feedback-message");
  feedbackMessage.innerHTML = isCorrect
    ? `<p class="lead"><span class="text-warning">Correct! Great job.</span> ${questionData.explanation}</p>`
    : `<p class="lead"><span class="text-warning">Incorrect.</span> The correct answer${isMultipleChoice ? "s were" : " was"}: ${
        Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer
      }. <br><br><span class="text-warning">Explanation:</span> ${questionData.explanation}</p>`;
  feedbackBox.style.display = "block";

  // Highlight correct and incorrect answers
  for (const option of options) {
    if (isMultipleChoice) {
      if (correctAnswer.includes(option.value)) {
        option.parentElement.classList.add("correct-answer");
      } else if (selectedAnswers.includes(option.value)) {
        option.parentElement.classList.add("wrong-answer");
      }
    } else {
      if (option.value === correctAnswer) {
        option.parentElement.classList.add("correct-answer");
      } else if (selectedAnswers.includes(option.value)) {
        option.parentElement.classList.add("wrong-answer");
      }
    }
    option.disabled = true;
  }

  // Show the next button
  document.getElementById("next-button").style.display = "inline-block";
}

/**
 * Move to the next question or show the final score.
 */
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    showFinalScore();
  }
}

/**
 * Review Answers Function
 */
function reviewAnswers() {
  const quizSection = document.getElementById("QuizSection");

  let reviewHTML = `<h3 class="quiz-completed">Review Answers</h3>`;
  quizQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index] || "No Answer";
    const isMultipleChoice = question.type === "multiple";
    const correctAnswer = question.answer;

    // Check if the answer is correct
    const isCorrect = isMultipleChoice
      ? userAnswer.length === correctAnswer.length &&
        userAnswer.every((answer) => correctAnswer.includes(answer))
      : userAnswer === correctAnswer;

    reviewHTML += `
      <div class="review-question">
        <h4>${index + 1}. ${question.question}</h4>
        <p><strong>Your Answer:</strong> ${
          Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer
        }</p>
        <p><strong>Correct Answer:</strong> ${
          Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer
        }</p>
        <p><strong>Explanation:</strong> ${question.explanation}</p>
        <p><strong>Status:</strong> ${
          isCorrect ? "Correct ✅" : "Incorrect ❌"
        }</p>
      </div>
      <hr>
    `;
  });

  quizSection.innerHTML = reviewHTML;
}

/**
 * Show the final score and award badges.
 */
function showFinalScore() {
  const percentageScore = Math.round((correctCount / quizQuestions.length) * 100);
  const quizSection = document.getElementById("QuizSection");

  // Determine badges
  let badgesHTML = `<div class="badges text-center">`;
  if (correctCount === quizQuestions.length) {
    badgesHTML += `<p class="badge badge-perfect"><i class="fas fa-crown"></i> Perfect Score Badge</p>`;
  }
  if (streakCount >= 3) {
    badgesHTML += `<p class="badge badge-streak"><i class="fas fa-fire"></i> Streak Badge</p>`;
  }
  if (percentageScore >= 80) {
    badgesHTML += `<p class="badge badge-highscore"><i class="fas fa-trophy"></i> High Score Badge (80%)</p>`;
  }
  if (percentageScore >= 70) {
    badgesHTML += `<p class="badge badge-achievement"><i class="fas fa-medal"></i> Achievement Badge (70%)</p>`;
  }
  badgesHTML += `</div>`;

  quizSection.innerHTML = `
    <h3 class="quiz-completed">Quiz Completed!</h3>
    <p class="quiz-final-score">
      You answered ${correctCount} out of ${quizQuestions.length} questions correctly 
      (<span id="animated-percentage">0%</span>).
    </p>
    ${badgesHTML}
    <div class="text-center mt-4">
      <button class="btn quizSection-buttons" onclick="reviewAnswers()">Review Answers</button>
    </div>
    <p class="quiz-final-details" style="text-align: center;">Thank you for taking the quiz! Refresh to retake.</p>
  `;

  // Animate the percentage score
  const percentageElement = document.getElementById("animated-percentage");
  animatePercentage(percentageElement, percentageScore);
}

/**
 * Animate percentage score from 0 to final value.
 * @param {HTMLElement} element - The DOM element to animate.
 * @param {number} finalValue - The final percentage value.
 */
function animatePercentage(element, finalValue) {
  let currentValue = 0;
  const stepTime = Math.abs(Math.floor(2000 / finalValue)); // Adjust duration as needed

  const timer = setInterval(() => {
    currentValue++;
    element.textContent = `${currentValue}%`;

    if (currentValue >= finalValue) {
      clearInterval(timer);
    }
  }, stepTime);
}

/* Save and Resume Functionality */
/* Save Progress Function */
function saveProgress() {
  const quizProgress = {
    currentQuestionIndex,
    correctCount,
    streakCount,
    userAnswers,
    quizFile: currentQuizFile,
  };
  localStorage.setItem("quizProgress", JSON.stringify(quizProgress));

  // Trigger the Save Progress Modal
  const saveModal = new bootstrap.Modal(document.getElementById("saveProgressCustomModal"));
  saveModal.show();
}

/* Resume Progress Function */
async function resumeProgress() {
  const savedData = localStorage.getItem("quizProgress");
  if (!savedData) {
    alert("No saved progress found."); // Optional: You can create a modal for "No Progress Found"
    return;
  }

  const parsedData = JSON.parse(savedData);
  currentQuestionIndex = parsedData.currentQuestionIndex || 0;
  correctCount = parsedData.correctCount || 0;
  streakCount = parsedData.streakCount || 0;
  userAnswers = parsedData.userAnswers || [];
  currentQuizFile = parsedData.quizFile || "quizQuestions.json";

  try {
    const response = await fetch(currentQuizFile);
    quizQuestions = await response.json();
    displayQuestion();

    // Trigger the Resume Progress Modal
    const resumeModal = new bootstrap.Modal(document.getElementById("resumeProgressCustomModal"));
    resumeModal.show();
  } catch (error) {
    console.error("Error resuming quiz data:", error);
    alert("Failed to resume quiz data. Please try again.");
  }
}

// Load the first quiz on page load
loadQuestions();

// Badge List (Not part of the quiz's functionality)
document.addEventListener("click", function (event) {
  const collapseElement = document.getElementById("moreInfo");
  const toggleButton = document.querySelector('[data-bs-toggle="collapse"]');

  if (
    !collapseElement.contains(event.target) && // Click is outside the expanded content
    !toggleButton.contains(event.target) // Click is outside the button
  ) {
    const bsCollapse = new bootstrap.Collapse(collapseElement, {
      toggle: false,
    });
    bsCollapse.hide(); // Manually collapse the section
  }
});
// End: NETWORKING QUIZ SECTION




// START: ADDITIONAL LAB NETWORKING PROJECTS Toggle Section (This is the cards under the first networking lab projects. You can delete if not needed)
// Add Icon Toggle Logic
document.getElementById("toggleButton").addEventListener("click", function () {
  const icon = this.querySelector("i");
  if (this.getAttribute("aria-expanded") === "true") {
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }
});

// 
const cardsData = [
  {
    id: "lab3-3",
    title: "Configuring VLANs",
    description: "Learn to configure VLANs to segment a network for improved performance, security, and management.",
    modalContent: "VLANs allow for logical segmentation of networks to improve performance and security. This lab demonstrates the steps to configure VLANs on network switches.",
    imgSrc: "./assets/images/project-1.jpg",
  },
  {
    id: "lab3-4",
    title: "Understanding Firewalls",
    description: "Explore how firewalls protect networks by filtering traffic and ensuring secure data transfer.",
    modalContent: "Firewalls play a crucial role in network security by filtering traffic and preventing unauthorized access. This lab explores their configurations and applications.",
    imgSrc: "./assets/images/project-1.jpg",
  },
  {
    id: "lab3-5",
    title: "Wireless Network Setup",
    description: "Understand the basics of setting up and securing wireless networks.",
    modalContent: "This lab focuses on setting up and securing wireless networks, covering SSID configuration, encryption, and signal optimization techniques.",
    imgSrc: "./assets/images/project-1.jpg",
  },
  {
    id: "lab3-6",
    title: "Troubleshooting Networks",
    description: "Explore common network issues and learn troubleshooting techniques to resolve them.",
    modalContent: "Learn to identify and resolve common network problems using tools like traceroute, ping, and network analyzers in this hands-on lab.",
    imgSrc: "./assets/images/project-1.jpg",
  },
  {
    id: "lab3-7",
    title: "Network Monitoring",
    description: "Learn how to use tools to monitor network performance and security.",
    modalContent: "Explore tools like SNMP, Wireshark, and others to monitor network health and detect anomalies, ensuring secure and efficient operations.",
    imgSrc: "./assets/images/project-1.jpg",
  },
  {
    id: "lab3-8",
    title: "Advanced Routing Techniques",
    description: "Master the art of configuring dynamic routing protocols for optimized traffic management.",
    modalContent: "Master advanced routing protocols like OSPF and BGP to optimize traffic flow and network efficiency. This lab offers practical steps for implementing and troubleshooting dynamic routing.",
    imgSrc: "./assets/images/project-1.jpg",
  },
];

const cardsContainer = document.getElementById("cards-container");
const modalsContainer = document.getElementById("modals-container");

// Generate cards (existing logic)
cardsData.forEach(({ id, title, description, modalContent, imgSrc }, index) => {
  const delay = 300 + index * 200; // Increment delay for each card
  
  const card = `
    <div class="col-md-6 col-lg-4 mx-auto" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="card-custom rounded-4 bg-base shadow-effect card-infographic">
        <div class="card-custom-image rounded-4">
          <img class="rounded-4" src="${imgSrc}" alt="${title}" />
        </div>
        <div class="card-custom-content p-4">
          <h4 class="text-brand2">${title}</h4>
          <p>${description}</p>
          <div class="text-center">
            <button class="btn btn-brand mt-3" data-bs-toggle="modal" data-bs-target="#${id}-modal">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>`;
  cardsContainer.innerHTML += card;

  const modal = `
    <div class="modal fade" id="${id}-modal" tabindex="-1" aria-labelledby="${id}-title" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${id}-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${modalContent}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
  modalsContainer.innerHTML += modal;
});

// Refresh AOS animations after adding elements
AOS.refresh();
// END: ADDITIONAL LAB NETWORKING PROJECTS Toggle Section

// Footer
// Automatically set the current year
document.getElementById("custom-current-year").textContent = new Date().getFullYear();
// End: Footer