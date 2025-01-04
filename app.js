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
    : `<p class="lead"><span class="text-warning">Not quite.</span> The correct answer${isMultipleChoice ? "s were" : " was"}: ${Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer
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
        <p><strong>Your Answer:</strong> ${Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer
      }</p>
        <p><strong>Correct Answer:</strong> ${Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer
      }</p>
        <p><strong>Explanation:</strong> ${question.explanation}</p>
        <p><strong>Status:</strong> ${isCorrect ? "Correct ✅" : "Incorrect ❌"
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

// Footer
// Automatically set the current year
document.getElementById("custom-current-year").textContent = new Date().getFullYear();
// End: Footer

// START: Pagination and Accordion with Dynamic Content

/******************************************************************************
 * 1) Define accordionData
 *    - Adjust or add more labs/pages as you wish.
 ******************************************************************************/
const accordionData = [
  {
    title: `<i class="fas fa-network-wired fa-2x"></i> Advanced Networking Labs`,
    pages: [
      {
        id: "page-1-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Build and configure a home lab network.",
        modalTitle: "Lab 1 - Page 1",
        video: "./assets/videos/How_a_Hub_Works.mp4",
        modalText: "",
        description: "Design and build a home network environment from scratch, focusing on IP addressing, basic routing, and switching fundamentals."
      },
      {
        id: "page-2-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Design a VLAN-enabled network.",
        modalTitle: "Lab 1 - Page 2",
        video: "./assets/videos/Hub_Broadcasting.mp4",
        modalText: "Understand how to segment networks using VLANs to enhance security and performance.",
        description: "Explore VLAN configuration for traffic segmentation and improved network management, enhancing both security and performance."
      },
      {
        id: "page-3-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Implement network monitoring with Wireshark.",
        modalTitle: "Lab 1 - Page 3",
        video: "./assets/videos/How_a_Hub_Works.mp4",
        modalText: "Learn to capture and analyze network traffic for troubleshooting and optimization.",
        description: "Use Wireshark to capture, filter, and analyze network packets, helping you identify bottlenecks and security issues in real time."
      },
      {
        id: "page-4-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Configure a firewall for network protection.",
        modalTitle: "Lab 1 - Page 4",
        video: "./assets/videos/Hub_vs_Switch.mp4",
        modalText: "Set up and customize firewall rules to secure your network.",
        description: "Learn to implement firewall rules to control inbound and outbound traffic, reducing vulnerabilities and unauthorized access."
      },
      {
        id: "page-5-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Implement IPsec VPN for secure remote access.",
        modalTitle: "Lab 1 - Page 5",
        video: "./assets/videos/Hub_Scenarios.mp4",
        modalText: "Master creating secure VPN connections for remote users.",
        description: "Configure an IPsec VPN to ensure encrypted communication between remote users and your internal network."
      },
      {
        id: "page-6-lab1",
        image: "./assets/images/project-1.jpg",
        text: "Optimize network performance with QoS.",
        modalTitle: "Lab 1 - Page 6",
        video: "./assets/videos/Hub_Limitations.mp4",
        modalText: "Learn how to prioritize critical traffic using Quality of Service settings.",
        description: "Explore Quality of Service (QoS) mechanisms to prioritize important traffic and manage network congestion effectively."
      }
    ]
  },
  {
    title: `<i class="fas fa-server fa-2x"></i> IT Labs`,
    pages: [
      {
        id: "page-1-lab2",
        image: "https://picsum.photos/200",
        text: "Set up a virtualized IT environment with VMware or VirtualBox.",
        modalTitle: "Lab 2 - Page 1",
        video: "./assets/videos/Switch_Forwarding.mp4",
        modalText: "Create virtual machines for testing, development, or practice in a safe environment.",
        description: "Learn the fundamentals of virtualization by installing VMware or VirtualBox, enabling you to spin up test environments for various OSes."
      },
      {
        id: "page-2-lab2",
        image: "https://picsum.photos/201",
        text: "Install and configure a Linux server.",
        modalTitle: "Lab 2 - Page 2",
        video: "./assets/videos/Switch_Filtering.mp4",
        modalText: "Deploy a Linux server and set up essential services like SSH, NFS, or Apache.",
        description: "Master key Linux administration tasks, including setting up basic services, managing packages, and applying security best practices."
      },
      {
        id: "page-3-lab2",
        image: "https://picsum.photos/202",
        text: "Manage users and permissions in Linux.",
        modalTitle: "Lab 2 - Page 3",
        video: "./assets/videos/Switch_Unicast.mp4",
        modalText: "Learn to handle user accounts, groups, and permissions for secure access control.",
        description: "Configure user accounts, groups, and file permissions to maintain strict access control and safeguard critical resources."
      },
      {
        id: "page-4-lab2",
        image: "https://picsum.photos/203",
        text: "Set up a Windows Server with Active Directory.",
        modalTitle: "Lab 2 - Page 4",
        video: "./assets/videos/Switch_Broadcast.mp4",
        modalText: "Deploy and manage an AD environment for centralized authentication and management.",
        description: "Install and configure Windows Server, enabling Active Directory Domain Services for centralized user management and policy enforcement."
      },
      {
        id: "page-5-lab2",
        image: "https://picsum.photos/204",
        text: "Automate tasks using PowerShell scripts.",
        modalTitle: "Lab 2 - Page 5",
        video: "./assets/videos/VLAN_Config.mp4",
        modalText: "Learn scripting basics to automate administrative tasks and improve efficiency.",
        description: "Write and run PowerShell scripts to automate repetitive tasks, manage configurations, and enhance productivity."
      },
      {
        id: "page-6-lab2",
        image: "https://picsum.photos/205",
        text: "Set up and test a file sharing service.",
        modalTitle: "Lab 2 - Page 6",
        video: "./assets/videos/Switch_Features.mp4",
        modalText: "Configure and optimize file sharing using protocols like SMB or FTP.",
        description: "Implement a file sharing solution, ensure proper permissions, and optimize performance for both local and remote users."
      }
    ]
  },
  {
    title: `<i class="fas fa-cloud fa-2x"></i> Cloud Computing`,
    pages: [
      {
        id: "page-1-lab3",
        image: "./assets/images/project-13.jpg",
        text: "Create an AWS or Azure free-tier account.",
        modalTitle: "Lab 3 - Page 1",
        video: "./assets/videos/WAP_Setup.mp4",
        modalText: "Learn the basics of creating cloud resources on major platforms.",
        description: "Get familiar with cloud service dashboards, billing, and foundational setup tasks by creating a free-tier account on AWS or Azure."
      },
      {
        id: "page-2-lab3",
        image: "./assets/images/project-14.jpg",
        text: "Deploy a virtual machine in the cloud.",
        modalTitle: "Lab 3 - Page 2",
        video: "./assets/videos/WAP_Security.mp4",
        modalText: "Understand how to launch, configure, and secure a cloud-hosted VM.",
        description: "Spin up a virtual machine in AWS or Azure, configure network rules, and ensure best security practices for public-facing instances."
      },
      {
        id: "page-3-lab3",
        image: "./assets/images/project-15.jpg",
        text: "Set up cloud storage and backups.",
        modalTitle: "Lab 3 - Page 3",
        video: "./assets/videos/WAP_Troubleshooting.mp4",
        modalText: "Learn to store and retrieve data securely using cloud services.",
        description: "Implement services like S3 or Azure Blob Storage to store critical data, then configure automated backups for redundancy."
      },
      {
        id: "page-4-lab3",
        image: "./assets/images/project-16.jpg",
        text: "Implement serverless computing with AWS Lambda.",
        modalTitle: "Lab 3 - Page 4",
        video: "./assets/videos/WAP_Load_Balancing.mp4",
        modalText: "Discover the basics of serverless architecture for modern applications.",
        description: "Use AWS Lambda or Azure Functions to run event-driven code, reducing operational overhead and improving scalability."
      },
      {
        id: "page-5-lab3",
        image: "./assets/images/project-17.jpg",
        text: "Configure a load balancer for high availability.",
        modalTitle: "Lab 3 - Page 5",
        video: "./assets/videos/WAP_Coverage.mp4",
        modalText: "Learn to distribute traffic efficiently across cloud resources.",
        description: "Set up an Elastic Load Balancer or Azure Load Balancer to spread incoming requests, ensuring improved performance and fault tolerance."
      },
      {
        id: "page-6-lab3",
        image: "./assets/images/project-18.jpg",
        text: "Monitor and analyze cloud usage.",
        modalTitle: "Lab 3 - Page 6",
        video: "./assets/videos/WAP_Features.mp4",
        modalText: "Explore tools to track resource usage and optimize costs in the cloud.",
        description: "Leverage monitoring tools like AWS CloudWatch or Azure Monitor to collect metrics, visualize usage, and control cloud spending."
      }
    ]
  },
  {
    title: `<i class="fa fa-lightbulb fa-2x"></i> Useful Tips`,
    pages: [
      {
        id: "page-1-cli-commands",
        image: "./assets/images/project-19.jpg",
        text: "Learn how to document your projects effectively.",
        modalTitle: "Lab 4 - Page 1",
        modalText: "Understand the importance of documentation for IT projects and portfolios.",
        description: "Discover how thorough documentation can streamline troubleshooting, clarify requirements, and serve as a reference for future projects."
      },
      {
        id: "page-2-lab4",
        image: "./assets/images/project-20.jpg",
        text: "Use Git for version control.",
        modalTitle: "Lab 4 - Page 2",
        video: "./assets/videos/VLAN_Tagging.mp4",
        modalText: "Learn how to manage and track changes to your code and configurations using Git.",
        description: "Implement Git workflows to maintain a clear history of your code changes, collaborate with teams, and avoid configuration drift."
      },
      {
        id: "page-3-lab4",
        image: "./assets/images/project-21.jpg",
        text: "Set up a home lab for continuous learning.",
        modalTitle: "Lab 4 - Page 3",
        video: "./assets/videos/VLAN_Routing.mp4",
        modalText: "Explore affordable tools and software for building a personal IT lab.",
        description: "Utilize virtual machines, spare hardware, or cloud resources to create a versatile, cost-effective lab environment for ongoing skill development."
      },
      {
        id: "page-4-lab4",
        image: "./assets/images/project-22.jpg",
        text: "Optimize LinkedIn for showcasing your skills.",
        modalTitle: "Lab 4 - Page 4",
        video: "./assets/videos/VLAN_Troubleshooting.mp4",
        modalText: "Learn to create a professional profile to attract recruiters.",
        description: "Highlight your IT projects, certifications, and lab experiences on LinkedIn to attract potential employers and expand your professional network."
      },
      {
        id: "page-5-lab4",
        image: "./assets/images/project-23.jpg",
        text: "Master time management for IT professionals.",
        modalTitle: "Lab 4 - Page 5",
        video: "./assets/videos/VLAN_Scalability.mp4",
        modalText: "Discover tools and techniques to stay productive and organized.",
        description: "Use productivity frameworks and task management apps (like Trello or Asana) to balance project workloads and study schedules effectively."
      },
      {
        id: "page-6-lab4",
        image: "./assets/images/project-24.jpg",
        text: "Learn basic cybersecurity hygiene.",
        modalTitle: "Lab 4 - Page 6",
        video: "./assets/videos/VLAN_Features.mp4",
        modalText: "Understand practices to secure your personal and professional IT systems.",
        description: "Adopt best practices such as using strong passwords, enabling multi-factor authentication, and regularly updating software."
      }
    ]
  },
  {
    title: `<i class="fa fa-sticky-note fa-2x"></i> Networking Notes`,
    pages: [
      {
        id: "page-1-note001",
        image: "https://picsum.photos/2001",
        text: "Intro to Computer Networks",
        modalTitle: `<i class="fas fa-network-wired"></i> Intro to Computer Networks`,
        video: "", // No video => none will appear
        modalText: "", // Filled later from <div id="modalText-page-1-lab1">
        description: "Computers are central to network operations, often performing as both communication facilitators and specialized devices to manage data flow and integration (e.g., routers, IoT devices). Understanding the basic tasks - input, processing, and output - is essential for grasping how computer systems and their components operate, enhancing our ability to support network functionality.",
        // This is the ID in the HTML of the hidden div:
        nestedAccordionId: "nestedAccordion-page-1-note001"
      },
      {
        id: "page-2-note002",
        image: "https://picsum.photos/2002",
        text: "Network Hardware Essentials.",
        modalTitle: `<i class="fas fa-network-wired"></i> Network Hardware Essentials.`,
        video: "", // No video => none will appear
        modalText: "",
        description: "In today’s interconnected world, understanding network hardware is fundamental to building and maintaining efficient communication systems. These notes, serve as a quick reference guide to the foundational devices that enable seamless networking.",
        nestedAccordionId: "nestedAccordion-page-2-note002"
      },
      {
        id: "page-3-note003",
        image: "https://picsum.photos/2003",
        text: "Title",
        modalTitle: "Title",
        modalText: "",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vitae veniam fugit eveniet, hic cum, cumque necessitatibus recusandae, consequatur sapiente dolor? Laboriosam alias laborum necessitatibus veniam placeat, magni accusantium sint?",
        nestedAccordionId: "nestedAccordion-page-2-note003"
      },
      {
        id: "page-4-note004",
        image: "https://picsum.photos/2004",
        text: "Title",
        modalTitle: "Title",
        modalText: "",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vitae veniam fugit eveniet, hic cum, cumque necessitatibus recusandae, consequatur sapiente dolor? Laboriosam alias laborum necessitatibus veniam placeat, magni accusantium sint?",
        nestedAccordionId: "nestedAccordion-page-2-note004"
      },
      {
        id: "page-5-note005",
        image: "https://picsum.photos/2005",
        text: "Title",
        modalTitle: "Title",
        modalText: "",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vitae veniam fugit eveniet, hic cum, cumque necessitatibus recusandae, consequatur sapiente dolor? Laboriosam alias laborum necessitatibus veniam placeat, magni accusantium sint?",
        nestedAccordionId: "nestedAccordion-page-2-note005"
      },
      {
        id: "page-6-note006",
        image: "https://picsum.photos/2006",
        text: "Title",
        modalTitle: "Title",
        modalText: "",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vitae veniam fugit eveniet, hic cum, cumque necessitatibus recusandae, consequatur sapiente dolor? Laboriosam alias laborum necessitatibus veniam placeat, magni accusantium sint?",
        nestedAccordionId: "nestedAccordion-page-2-note006"
      }
      // Add more pages as needed...
    ]
  },
  // Add more accordion top-level items if you wish...
  {
    title: `<i class="fas fa-users-gear fa-2x"></i> Team Projects`,
    pages: [
      {
        id: "project-1-topology",
        image: "https://picsum.photos/200",
        text: "Design basic and advanced network topologies.",
        modalTitle: "Project 1 - Network Topologies",
        video: "./assets/videos/network_topology.mp4",
        modalText: "Understand different network designs and their practical applications.",
        description: "Create topologies like Star, Mesh, Ring, and SOHO networks, and document their real-world use cases and advantages."
      },
      {
        id: "project-2-vlan",
        image: "https://picsum.photos/200",
        text: "Simulate corporate networks with VLANs.",
        modalTitle: "Project 2 - VLAN Configuration",
        video: "./assets/videos/vlan_configuration.mp4",
        modalText: "Learn to segment networks for better management and security.",
        description: "Configure VLANs on a switch to separate traffic, improve security, and simulate an enterprise network setup."
      },
      {
        id: "project-3-wan",
        image: "https://picsum.photos/200",
        text: "Create a WAN setup using VPNs or MPLS.",
        modalTitle: "Project 3 - WAN Connectivity",
        video: "./assets/videos/wan_setup.mp4",
        modalText: "Build connections between two branch offices over the internet.",
        description: "Simulate a Wide Area Network (WAN) using VPNs or MPLS to securely connect remote offices."
      },
      {
        id: "project-4-cloud",
        image: "https://picsum.photos/200",
        text: "Integrate cloud networking with on-premise setups.",
        modalTitle: "Project 4 - Cloud Networking",
        video: "./assets/videos/cloud_integration.mp4",
        modalText: "Explore hybrid cloud solutions for networking.",
        description: "Use tools like AWS VPC or Azure Virtual Network to integrate cloud resources with on-premise infrastructure."
      },
      {
        id: "project-5-troubleshooting",
        image: "https://picsum.photos/200",
        text: "Create a troubleshooting lab with intentional misconfigurations.",
        modalTitle: "Project 5 - Troubleshooting Lab",
        video: "./assets/videos/troubleshooting_lab.mp4",
        modalText: "Learn to identify and fix network issues in a controlled environment.",
        description: "Set up a network with common misconfigurations and practice troubleshooting skills to resolve connectivity issues."
      },
      {
        id: "project-6-icmp",
        image: "https://picsum.photos/200",
        text: "Implement ICMP and ARP packet behavior simulations.",
        modalTitle: "Project 6 - ICMP and ARP Simulation",
        video: "./assets/videos/icmp_arp.mp4",
        modalText: "Understand how ICMP and ARP packets function in networks.",
        description: "Simulate ARP requests and ICMP packets in a network environment to observe broadcast and unicast behaviors."
      },
      {
        id: "project-7-security",
        image: "https://picsum.photos/200",
        text: "Configure network security policies and ACLs.",
        modalTitle: "Project 7 - Network Security",
        video: "./assets/videos/network_security.mp4",
        modalText: "Enhance network security with Access Control Lists (ACLs).",
        description: "Implement ACLs on routers and switches to control traffic and secure your network."
      }
    ]
  }
];

/******************************************************************************
 * 2) (Optional) Helper to Build a Second-Level Accordion in the Modal
 *    - If you do NOT need a nested accordion, you can remove this entire function
 *      and skip the references to 'nestedAccordionId'.
 ******************************************************************************/
function buildNestedAccordion(nestedAccordionId, uniqueSuffix) {
  // 1) Find the hidden <div> by the provided ID
  const container = document.getElementById(nestedAccordionId);
  if (!container) return "";

  // 2) Gather each child <div> that has data-heading="..."
  const sections = container.querySelectorAll("[data-heading]");
  if (!sections.length) return "";

  // 3) Start building the .accordion wrapper
  const accordionRootId = `nestedAccordion-${uniqueSuffix}`;
  let accordionHTML = `<div class="accordion mt-4" id="${accordionRootId}">`;

  // 4) Loop through each section
  sections.forEach((section, index) => {
    // Read the heading text and the optional icon class
    const headingText = section.getAttribute("data-heading") || "";
    const iconClass = section.getAttribute("data-icon") || "";

    // The HTML inside that <div data-heading="...">
    const bodyContent = section.innerHTML;

    // Create unique IDs for heading/collapse so Bootstrap can toggle each item
    const headingId = `${accordionRootId}-heading-${index}`;
    const collapseId = `${accordionRootId}-collapse-${index}`;

    // If iconClass is present, prepend <i class="iconClass"></i> to the heading text
    let finalHeading = headingText;
    if (iconClass) {
      finalHeading = `<i class="${iconClass}"></i> ${headingText}`;
    }

    // 5) Add an accordion item
    accordionHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${headingId}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${collapseId}"
            aria-expanded="false"
            aria-controls="${collapseId}"
          >
            ${finalHeading}
          </button>
        </h2>
        <div
          id="${collapseId}"
          class="accordion-collapse collapse"
          aria-labelledby="${headingId}"
          data-bs-parent="#${accordionRootId}"
        >
          <div class="accordion-body">
            ${bodyContent}
          </div>
        </div>
      </div>
    `;
  });

  accordionHTML += "</div>"; // close the .accordion
  return accordionHTML;
}

/******************************************************************************
 * 3) createAccordion() - Main Accordion & Pagination Logic
 *    - Builds each "lab" accordion item, pagination for pages, modals, etc.
 ******************************************************************************/
function createAccordion(data) {
  const accordionContainer = document.getElementById("networkingAccordion");

  data.forEach((lab, index) => {
    // Create a wrapper <div> for each top-level accordion item
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    // Accordion header & collapse container
    accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button ${index > 0 ? "collapsed" : ""}" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapse${index}" 
                aria-expanded="${index === 0}" 
                aria-controls="collapse${index}">
          ${lab.title}
        </button>
      </h2>
      <div id="collapse${index}"
           class="accordion-collapse collapse ${index === 0 ? "show" : ""}" 
           aria-labelledby="heading${index}" 
           data-bs-parent="#networkingAccordion">
        <div class="accordion-body">
          <div id="pagination-content-${index}" class="pagination-content"></div>
          <nav aria-label="Pagination" class="mt-3">
            <ul class="pagination" id="pagination-controls-${index}"></ul>
          </nav>
        </div>
      </div>
    `;

    // Append to the main accordion container
    accordionContainer.appendChild(accordionItem);

    // Locate the spots for pagination content/controls
    const paginationContent = document.getElementById(
      `pagination-content-${index}`
    );
    const paginationControls = document.getElementById(
      `pagination-controls-${index}`
    );

    // Now loop over each page
    lab.pages.forEach((page, pageIndex) => {
      // 1) Create a <div> for the page content
      const pageContent = document.createElement("div");
      pageContent.classList.add("page-content");
      // The first page is visible ("active"), the rest hidden
      if (pageIndex === 0) pageContent.classList.add("active");
      pageContent.id = page.id;
      pageContent.style.display = pageIndex === 0 ? "block" : "none";

      pageContent.innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-4">
            <img class="rounded-4" 
                 src="${page.image}" 
                 alt="${page.text}" 
                 style="width: 100%; height: auto;" />
          </div>
          <div class="col-md-8">
            <h5 class="mb-3">${page.text}</h5>
            <p class="mb-3" style="color: #EEF3DB">${page.description}</p>
            <!-- Center the 'View Details' button -->
            <div class="text-center">
              <button class="btn btn-brand mt-3" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modal-${page.id}">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;
      paginationContent.appendChild(pageContent);

      // 2) Create the pagination control for this page
      const paginationItem = document.createElement("li");
      paginationItem.classList.add("page-item");
      if (pageIndex === 0) paginationItem.classList.add("active");
      paginationItem.innerHTML = `
        <a class="page-link" href="#" data-target="${page.id}">
          ${pageIndex + 1}
        </a>`;
      paginationControls.appendChild(paginationItem);

      // 3) Create the modal for this page
      const modal = document.createElement("div");
      modal.classList.add("modal", "fade", "my-pagination-modal");
      modal.id = `modal-${page.id}`;
      modal.tabIndex = -1;
      modal.setAttribute("aria-labelledby", `modal-${page.id}-title`);
      modal.setAttribute("aria-hidden", "true");

      // Conditionally build the <video> markup if page.video is defined
      const videoMarkup = page.video
        ? `
        <video class="rounded-4 shadow-effect" autoplay muted loop width="100%">
          <source src="${page.video}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        `
        : "";

      // (Optional) If a nested accordion ID is given, build it
      let nestedAccordionMarkup = "";
      if (typeof buildNestedAccordion === "function" && page.nestedAccordionId) {
        nestedAccordionMarkup = buildNestedAccordion(page.nestedAccordionId, page.id);
      }

      // Final modal content
      modal.innerHTML = `
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-${page.id}-title">${page.modalTitle}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${videoMarkup}
              <!-- modalText was filled from hidden <div> in DOMContentLoaded -->
              <p>${page.modalText}</p>

              <!-- Insert second-level (nested) accordion if needed -->
              ${nestedAccordionMarkup}
            </div>
          </div>
        </div>
      `;
      // Append modal to <body>
      document.body.appendChild(modal);
    });
  });

  // 4) Attach pagination behavior
  addPaginationEventListeners();
}

/******************************************************************************
 * 4) Pagination Event Listeners
 ******************************************************************************/
function addPaginationEventListeners() {
  document.querySelectorAll(".pagination a").forEach((paginationLink) => {
    paginationLink.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = paginationLink.getAttribute("data-target");
      const paginationContainer = paginationLink.closest(".accordion-body");
      const pages = paginationContainer.querySelectorAll(".page-content");

      // Hide all pages
      pages.forEach((page) => {
        page.style.display = "none";
        page.classList.remove("active");
      });

      // Show the targeted page
      const targetPage = paginationContainer.querySelector(`#${targetId}`);
      if (targetPage) {
        targetPage.style.display = "block";
        targetPage.classList.add("active");
      }

      // Update pagination item active state
      paginationContainer
        .querySelectorAll(".pagination .page-item")
        .forEach((item) => item.classList.remove("active"));

      paginationLink.parentElement.classList.add("active");
    });
  });
}

/******************************************************************************
 * 5) On DOMContentLoaded, fill modalText from hidden <div>s, then create accordion
 ******************************************************************************/
window.addEventListener("DOMContentLoaded", () => {
  // 1) Populate page.modalText from <div id="modalText-page-XYZ" style="display:none;">
  accordionData.forEach((group) => {
    group.pages.forEach((page) => {
      const hiddenDiv = document.getElementById(`modalText-${page.id}`);
      if (hiddenDiv) {
        page.modalText = hiddenDiv.innerHTML;
      }
    });
  });

  // 2) Build the main accordion now that content is loaded
  createAccordion(accordionData);
});
// END: Pagination and Accordion with Dynamic Content


