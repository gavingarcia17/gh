  // Creates an array containing names of five student in the class
  var students = ["Sarah", "Orlando", "Heather", "Ismael", "Hung"];

  // Logs length of the array
  console.log(students.length);


  function logStudentGreeting() {
    // For loop starts at 0, runs while i is less than length of student array
    // Increments by 1
    for(var i=0; i < students.length; i++) {
      // This statement will run each time the loop is executed
      console.log("Great to see you, " + students[i] + "!");
    }
    
    console.log("My loop is finished");
  }

  logStudentGreeting();
  logStudentGreeting();
  logStudentGreeting();
  logStudentGreeting();
  logStudentGreeting();