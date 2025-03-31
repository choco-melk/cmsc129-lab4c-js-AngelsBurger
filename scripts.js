/* Date Section */
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
    document.getElementById("date-display").innerText =  "Today is " + Intl.DateTimeFormat("en-US", dateOptions).format(date) + " " + DAYS_OF_WEEK[date.getDay()];
    document.getElementById("time-display").innerText =  "The current time is " + Intl.DateTimeFormat("en-US", timeOptions).format(date);
});


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

const studentDatabase = {};   // Student Database
const generateStudentNumber = () => {
    const FOUR_DIGITS = 10000;
    const STUDENT_YEAR = 20230000;
    let num = Math.floor(Math.random() * FOUR_DIGITS);
    if ((STUDENT_YEAR + num) in studentDatabase) {
        num = (num + 1) % FOUR_DIGITS;
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
    const NAME_REGEX = /^\S+\s\S+$/;
    const NAME_MIN_LENGTH = 5;
    const ageStatus = document.getElementById("age-input-status");
    const MIN_AGE = 19;
    const MAX_AGE = 98;
    const emailStatus = document.getElementById("email-input-status");
    const EMAIL_REGEX = /^[a-zA-Z0-9_\-\.]+@up\.edu\.ph$/;
    const tempName = document.getElementById("name").value;
    const tempAge = parseInt(document.getElementById("age").value);
    const tempEmail = document.getElementById("email").value;
    const tempCourse = document.getElementById("course").value;

    nameStatus.innerText = ageStatus.innerText = emailStatus.innerText = ""; 
    if (!NAME_REGEX.test(tempName)) {
        error.nameStatusMessages.push("Name must be a full name (Format: firstname lastname).");
        valid = false;
    }
    if (tempName.length < 5) {
        error.nameStatusMessages.push("Name must contain 5 or more characters.");
        valid = false;
    }
    if (!(tempAge >= MIN_AGE && tempAge <= MAX_AGE)) {
        error.ageStatusMessages.push("Age must be between 19 - 98.");
        valid = false;
    }
    if (!EMAIL_REGEX.test(tempEmail)) {
        error.emailStatusMessages.push("Email can only have letters, numbers, and special characters (-_.), and it must contain address @up.edu.ph .");
        valid = false;
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
            "\nStudent Number: " + studentTemp.studentNumber +
            "\n    Name: " + studentTemp.name + 
            "\n    Age: " + studentTemp.age + 
            "\n    Email: " + studentTemp.email + 
            "\n    Course: " + studentTemp.course); 
        studentDatabase[studentNo] = studentTemp;
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
});


