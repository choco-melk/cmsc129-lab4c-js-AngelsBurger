/*
 * Date Section 
 */
document.getElementById("datetime-display-button").addEventListener("click", (e) => {
    e.preventDefault();
    const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    date = new Date();

    dateOptions = {
        timeZone: "Asia/Manila",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    timeOptions = {
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true   
    };
    document.getElementById("date-display").innerText =  "Today is " + Intl.DateTimeFormat("en-US", dateOptions).format(date) + ", " + DAYS_OF_WEEK[date.getDay()];
    document.getElementById("time-display").innerText =  "The current time is " + Intl.DateTimeFormat("en-US", timeOptions).format(date);
});


/**
 * Mode Shifting Section 
 */

/* For Service Modes (Student Portal, Student Registration, and Student Directory */
const studentPortal = document.getElementById("student-portal-section");
const registrationSection = document.getElementById("registration-section");
const directorySection = document.getElementById("directory-section");
const backButtonContainer = document.getElementById("back-button-container");
const titleDisplayService = document.getElementById("title-display-service");
const dateContainer = document.getElementById("date-container");
const registrationMode = document.getElementById("title-display-mode");

/* For Resets */
const dateDisplay = document.getElementById("date-display");
const timeDisplay = document.getElementById("time-display");
const nameInputStatus = document.getElementById("name-input-status");
const ageInputStatus = document.getElementById("age-input-status");
const emailInputStatus = document.getElementById("email-input-status");
const registrationNameInput = document.getElementById("name");
const registrationAgeInput = document.getElementById("age");
const registrationEmailInput = document.getElementById("email");
const studentSearechNumberInput = document.getElementById("number"); 
const studentDisplayMessageStatus = document.getElementById("student-display-status-message");
const studentDisplayStatus = document.getElementById("student-display-status");
const allStudentDisplay = document.getElementById("all-students-display");
const allStudentDisplayAttributes = document.getElementById("display-attributes");

function resetStatuses() {
    dateDisplay.innerText = timeDisplay.innerText = 
    nameInputStatus.innerText = ageInputStatus.innerText = 
    emailInputStatus.innerText = allStudentDisplay.innerText = "";
    registrationAgeInput.value = registrationNameInput.value = 
    registrationEmailInput.value = studentSearechNumberInput.value = ""; 
    studentDisplayMessageStatus.style.color = "black";
    studentDisplayMessageStatus.innerText = "None";
    studentDisplayStatus.style.display = "none";
    allStudentDisplayAttributes.style.display = "none";
}

document.getElementById("student-registration").addEventListener("click", (e) => {
    e.preventDefault();
    studentPortal.style.display = "none";
    registrationSection.style.display = "block";
    titleDisplayService.innerText = "STUDENT PORTAL";
    registrationMode.innerText = "STUDENT REGISTRATION";
    dateContainer.style.display = "none";
    backButtonContainer.style.display = "flex";
    resetStatuses();
});

document.getElementById("student-directory").addEventListener("click", (e) => {
    e.preventDefault();
    studentPortal.style.display = "none";
    directorySection.style.display = "block";
    titleDisplayService.innerText = "STUDENT PORTAL";
    registrationMode.innerText = "STUDENT DIRECTORY";
    dateContainer.style.display = "none";
    backButtonContainer.style.display = "flex";
    resetStatuses();
});

function toBack(e) {
    e.preventDefault();
    studentPortal.style.display = "flex";
    registrationSection.style.display = directorySection.style.display = "none";   
    titleDisplayService.innerText = "";
    registrationMode.innerText = "STUDENT PORTAL";
    dateContainer.style.display = "flex";
    backButtonContainer.style.display = "none";
    resetStatuses();
}
document.getElementById("back-button").addEventListener("click", toBack);
document.getElementById("student-portal-link").addEventListener("click", toBack);


/* 
 * Student Registration, Find, and Display All Section
 *
 *  Things to Note:
 *  1. NAME_REGEX = /^\S+\s\S+$/;
 *  Explanation:
 *      ^\S+: Matches one or more non-whitespace characters at the start of the string.
 *      \s: Matches exactly one whitespace character.
 *      \S+$: Matches one or more non-whitespace characters at the end of the string.
 *  2. EMAIL_REGEX = /^[a-zA-Z0-9_\-\.]+@up\.edu\.ph$/;
 *  Explanation:
 *      ^: Anchors the match at the beginning of the string. 
 *      [a-zA-Z0-9_\-\.]+: Matches one or more characters that are alphabets, numbers, or special symbols (-_.) 
 *      @up\.edu\.ph: Matches the literal string @up.edu.ph. 
 *      $: Anchors the match at the end of the string.
 *  
 *  credits to CHATGPT and Sir Hismana's slides for REGEX :>
 */

const studentDatabase = [];
studentDatabase[0] = {
        name: "Jave Hulleza",
        age: 20,
        email: "cshulleza@up.edu.ph",
        course: "BS in Computer Science",
        studentNumber: 202314625
};   // Student Database

console.log(studentDatabase);

const generateStudentNumber = () => {
    const FIVE_DIGITS = 100000;
    const STUDENT_YEAR = 202300000;
    let num = Math.floor(Math.random() * FIVE_DIGITS);
    if ((STUDENT_YEAR + num) in studentDatabase) {
        num = (num + 1) % FIVE_DIGITS;
    }
    return  STUDENT_YEAR + num;
};
document.getElementById("register-button").addEventListener("click", (e) => {
    e.preventDefault();
    let valid = true;
    const error = {
        nameStatusMessages: [],
        ageStatusMessages: [],
        emailStatusMessages: []
    };
    const nameStatus = document.getElementById("name-input-status");
    const ageStatus = document.getElementById("age-input-status");
    const emailStatus = document.getElementById("email-input-status");

    const NAME_REGEX = /^\S+\s\S+$/;
    const NAME_MIN_LENGTH = 5;
    const MIN_AGE = 19;
    const MAX_AGE = 98;
    const EMAIL_REGEX = /^[a-zA-Z0-9_\-\.]+@up\.edu\.ph$/;

    const tempName = document.getElementById("name").value.trim();
    const tempAge = parseInt(document.getElementById("age").value);
    const tempEmail = document.getElementById("email").value.trim();
    const tempCourse = document.getElementById("course").value;

    nameStatus.innerText = ageStatus.innerText = emailStatus.innerText = ""; 
    nameStatus.style.color = ageStatus.style.color = emailStatus.style.color = ""; 

    if (!NAME_REGEX.test(tempName)) {
        error.nameStatusMessages.push("• Name must be a full name (Format: firstname lastname).");
        valid = false;
    }
    if (tempName.length < NAME_MIN_LENGTH) {
        error.nameStatusMessages.push("• Name must contain at least 5 characters.");
        valid = false;
    }
    if (!(tempAge >= MIN_AGE && tempAge <= MAX_AGE)) {
        error.ageStatusMessages.push("• Age must be between 19 - 98.");
        valid = false;
    }
    if (!EMAIL_REGEX.test(tempEmail)) {
        error.emailStatusMessages.push("• Email can only have letters, numbers, and special characters (-_.), and it must contain address @up.edu.ph .");
        valid = false;
    }

    if (error.nameStatusMessages.length > 0) {
        nameStatus.style.color = "red"; // Make text red
    }

    if (error.ageStatusMessages.length > 0) {
        ageStatus.style.color = "red";
    }

    if (error.emailStatusMessages.length > 0) {
        emailStatus.style.color = "red";
    }
    
    if(valid) {
        const studentNo = generateStudentNumber();
        const studentTemp = {
            name: tempName,
            age: tempAge,
            email: tempEmail,
            course: tempCourse,
            studentNumber: studentNo
        };
        alert("Form submitted successfully!\n" + 
            "\nThe following student have been added:" + 
            "\n    Student Number: " + studentTemp.studentNumber +
            "\n    Name: " + studentTemp.name + 
            "\n    Age: " + studentTemp.age + 
            "\n    Email: " + studentTemp.email + 
            "\n    Course: " + studentTemp.course); 
        studentDatabase[studentDatabase.length] = studentTemp;
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("email").value = "";
    } else {
        for (let message of error.nameStatusMessages) {
            const newTag = document.createElement("div");
            newTag.innerText = message;
            nameStatus.append(newTag);
        }
        for (let message of error.ageStatusMessages) {
            const newTag = document.createElement("div");
            newTag.innerText = message;
            ageStatus.append(newTag);
        }
        for (let message of error.emailStatusMessages) {
            const newTag = document.createElement("div");
            newTag.innerText = message;
            emailStatus.append(newTag);
        }
    }
    for (let i = 0; i < studentDatabase.length; i++) {
        console.log(studentDatabase[i]);
    }
});


document.getElementById("search-button").addEventListener("click", (e) => {
    e.preventDefault();
    const target = parseInt(document.getElementById("number").value);
    const studentDisplay = document.getElementById("student-display-status");
    const valueDisplays = document.getElementById("student-values").getElementsByTagName("li");
    const displayStat = document.getElementById("student-display-status-message");

    displayStat.innerText = "";
    displayStat.style.color = "";

    let index = -1;
    for (let i = 0; i < studentDatabase.length; i++) {
        if (studentDatabase[i].studentNumber == target) {
            index = i;
            break;
        }
    }

    if (index != -1) {
        displayStat.innerText = "Student Found! ";
        displayStat.style.color = "green";
        studentDisplay.style.display = "flex";
        let values = [
            studentDatabase[index].studentNumber,
            studentDatabase[index].name,
            studentDatabase[index].age,
            studentDatabase[index].email,
            studentDatabase[index].course
        ];
        let i = 0;
        for (let element of valueDisplays) {
            element.innerText = values[i];
            i++;
        }        
    } else {            
        displayStat.innerText = "No Student Found.";
        displayStat.style.color = "red";
        studentDisplay.style.display = "none";
        for (let element in valueDisplays) {
            element.innerText = "";
        }
    }
});


document.getElementById("display-all-button").addEventListener("click", (e) => {
    e.preventDefault();
    const allStudentDisplay = document.getElementById("all-students-display");
    const studentAttributes = document.getElementById("display-attributes");
    studentAttributes.style.display = "grid"; 
    allStudentDisplay.innerHTML = "";

    for (let i = 0; i < studentDatabase.length; i++) {
        const newRow = document.createElement("ul");
        const ATTRIBUTE_COUNT = 5;
        let values = [
            studentDatabase[i].studentNumber,
            studentDatabase[i].name,
            studentDatabase[i].age,
            studentDatabase[i].email,
            studentDatabase[i].course
        ];
        for (let i = 0; i < ATTRIBUTE_COUNT; i++) {
            element = document.createElement("li");
            element.innerText = values[i];
            newRow.append(element);
        }    
        allStudentDisplay.append(newRow);
    }
});





