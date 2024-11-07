// Timer Functionality
let timer;
let isWorking = true;

document.getElementById("start-timer").addEventListener("click", () => {
  const workTime = parseInt(document.getElementById("work-time").value) * 60;
  const breakTime = parseInt(document.getElementById("break-time").value) * 60;
  startTimer(workTime, breakTime);
});

function startTimer(work, breakTime) {
  let time = isWorking ? work : breakTime;
  clearInterval(timer);

  timer = setInterval(() => {
    if (time <= 0) {
      isWorking = !isWorking;
      clearInterval(timer);
      startTimer(work, breakTime);
    } else {
      document.getElementById("countdown").textContent = `${Math.floor(time / 60)}:${time % 60}`;
      time--;
    }
  }, 1000);
}

// // Task Tracker
// document.getElementById("add-task").addEventListener("click", () => {
//   const taskInput = document.getElementById("task-input").value;
//   const taskList = document.getElementById("task-list");

//   if (taskInput) {
//     const li = document.createElement("li");
//     li.textContent = taskInput;
//     taskList.appendChild(li);
//     document.getElementById("task-input").value = "";
//   }
// });


document.addEventListener("DOMContentLoaded", async () => {
  // Load sql.js and initialize the SQLite database
  function locateSqlFile(file) {
    return `sql-wasm.wasm`;
  }

  const SQL = await initSqlJs({ locateFile: locateSqlFile });

  

  // Create a new database (in-memory)
  let db = new SQL.Database();

  // Create the tasks table if it doesn't already exist
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL
  )`);

  // Function to load tasks from the database and display them
  function loadTasks() {
      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "";  // Clear current list
      const result = db.exec("SELECT * FROM tasks");

      if (result[0]) {
          result[0].values.forEach(row => {
              const li = document.createElement("li");
              li.textContent = row[1];  // `description` field
              taskList.appendChild(li);
          });
      }
  }

  // Event listener to add a new task
  document.getElementById("add-task").addEventListener("click", () => {
    console.log('hello??')
      const taskInput = document.getElementById("task-input").value;
      if (taskInput) {
          // Insert the new task into the database
          db.run(`INSERT INTO tasks (description) VALUES (?)`, [taskInput]);
          loadTasks();  // Refresh task list
          document.getElementById("task-input").value = "";  // Clear input field
      }
  });

  // Load tasks initially when the popup opens
  loadTasks();
});




// Focus Sounds
let audio = new Audio('focus_sound.mp3'); // Add a focus sound file
document.getElementById("play-sound").addEventListener("click", () => audio.play());
document.getElementById("stop-sound").addEventListener("click", () => audio.pause());
