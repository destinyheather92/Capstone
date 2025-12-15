
# Construction Tracker
A full-stack construction management platform designed to address real-world challenges faced by a local construction company. The application allows workers to log daily progress, time entries, and job-specific metrics through dynamic form inputs. It features a secure authentication system to restrict access and protect sensitive site data, as well as a reporting module that aggregates this input into project-level summaries and generates downloadable reports for supervisors. Although not currently in active use, the platform is production-ready and was developed in direct response to operational needs at a functioning construction firm.
![Screenshot of Tracker](./client/src/assets/constructionapp/Capture.PNG)

## Table of Contents 
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Pages](#pages)
- [Components](#components)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [Credits/Acknowledgements](#creditsacknowledgements)
- [License](#license)



## Installation

1. Clone the repository:
   ```sh
   git clone git@45.55.66.15:374576/modified_construction_app.git 
   
   http://gitlab.leath.perseverenow.org/374576/modified_construction_app
   ```
2. Navigate to the project directory:
   ```sh
   cd capstone
   ```
3. Install the dependencies:
   ```sh
    npm install
    cd server
    npm install
    cd ..
    cd client
    npm install
   ```
## Usage

1. Start the development server:
   ```sh
   npm start
   ```
2. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Configuration
-  No API key is required.

## Technologies
- HTML
- CSS
- JavaScript
- Mongoose 
- Express
- React
- Node.js
- Bootstrap (React)

## Key Dependencies
This application utilizes numerous dependencies. To see the extensive list, view the package.json file. However, there are a few key dependencies to note such as:
#### PDFKit
PDFKit is a PDF document generation library for Node and the browser that makes creating complex, multi-page, printable documents easy. In this application, it is used to generate a PDF of the End of Day Work Report for a specific jobsite. This allows dynamic access by allowing the user to select a date and pull the report. 

## Pages

#### Home Page
This is the Hero page, which showcases our product. Users are give an option to register the company. All other pages throughout the application are protected routes meaning the user will not be able to access them unless they are logged in. 
In addition, there is role based authentication to allow admin users to access other portions of the app not available to crew members.

### Job(s) Page / Add Dwr

Loads all jobsites for that company from the database. If you click on a job, the page will navigate to the 'Job Equipment Page' where all equipment is loaded for the jobsite. Once loaded and job is selected, you are able to select a day and the input data for the dwr. Once submitted, the page is directed back to the select a date option and the tabs disappear. This is to ensure that nothing can be inputted without a selected date in addition, its necessary so the data cannot be overwritten

![Screenshot of Tracker](./client/src/assets/constructionapp/dwr.PNG)

### Dashboard
On the admin dashboard you can add/edit jobsites, add/edit equipment, edit daily work reports, edit profile, and add/edit employees. 

![Screenshot of Tracker](./client/src/assets/constructionapp/dwr2.PNG)

## Contributing
Contributions are welcome! Please feel free to submit a pull request if you would like to add new features, fix bugs, or improve the project. 

## Credits/Acknowledgements

I would like to extend my gratitude to the contributors, mentors, and the open-source community for their support and resources throughout the development of this project as well as Persevere Coding Boot Camp for making this possible

- **Open Source Community:** Thank you for the invaluable tools, libraries, and documentation that made this project possible.
- **Mentors and Peers:** Special thanks to those who provided feedback, ideas, and encouragement during the development process. Mr.Millers!
- **Content Creators and Educators:** Appreciation for the tutorials, blog posts, and videos that guided the implementation of various features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

