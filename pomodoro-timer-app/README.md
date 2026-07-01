## Links

- [Live Demo (Vercel)](https://pomodoro-timer-app-liard.vercel.app/)

---

## Features

* **Customisable Timer:** Easily adjust study intervals and break durations to suit your workflow.
* **Real-time Progress Tracking:** A responsive circular progress bar tracks your remaining time at a glance.
* **Analytics Dashboard (Review Page):** Monitor your daily performance with built-in metrics:
  * **Today's Target:** Keep track of your daily study goals.
  * **Total Study Time:** Automatically aggregates your focused hours.
  * **Achievement Rate:** Displays your completion percentage dynamically.
* **Single Page Application (SPA):** Seamless, lightning-fast navigation across multiple subroutes (`/`, `/settings`, `/review`) by React Router.

---

## Tech Stack & Architecture

* **Frontend Framework:** React 19
* **Build Tool:** Vite 8 
* **Routing:** React Router 7 (Configured with custom server-side rewrites for seamless production hosting)
* **Styling:** CSS3
* **Components:** `react-circular-progressbar` for the dynamic timer interface

---

## Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository

git clone [https://github.com/ShoheiK12/Pomodoro_Timer_App.git](https://github.com/ShoheiK12/Pomodoro_Timer_App.git)  
cd Pomodoro_Timer_App

### 2. Install Dependencies
Install all the required packages listed in the package.json file:

npm install

### 3. Launch Development Server
Start the local development server with Hot Module Replacement (HMR) enabled:

npm run dev

Once started, open your browser and navigate to http://localhost:5173 to interact with the application.

### 4. Production Build & Preview
To test how the application performs after production compilation and optimization:

npm run build  
npm run preview

Production Deployment 
This project is fully optimised for hosting on Vercel. It includes a vercel.json configuration file to handle SPA routing correctly, preventing 404 Not Found errors when refreshing subroutes like /settings or /review.

Handling SPA Routing on Vercel:  
The routing behaviour is managed by the following rule in the root directory:

JSON  
{  
  "rewrites": [  
    { "source": "/(.*)", "destination": "/index.html" }  
  ]  
}  

---

## Author

Shohei Kotera