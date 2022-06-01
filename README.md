# Software Sustainability Workshop 01 - Test Driven Development

# Some Pyramids

Even more pyramids:

- [http://www.testingreferences.com/here_be_pyramids.php](http://www.testingreferences.com/here_be_pyramids.php)

![Gehlen2016.png](http://www.testingreferences.com/pyramids/Gehlen2016.png)

![Bagmar2012.jpg](http://www.testingreferences.com/pyramids/Bagmar2012.jpg)

# Red-Green-Refactoring

source: [https://developer.ibm.com/articles/5-steps-of-test-driven-development/https://developer.ibm.com/articles/5-steps-of-test-driven-development/](https://developer.ibm.com/articles/5-steps-of-test-driven-development/)

1. Read, understand, and process the feature or bug request.
2. Translate the requirement by writing a unit test. If you have hot reloading set up, the unit test will run and fail as no code is implemented yet.
3. Write and implement the code that fulfills the requirement. Run all tests and they should pass, if not repeat this step.
4. Clean up your code by refactoring.
5. Rinse, lather and repeat.

![tdd-red-green-refactoring-v3.png](https://developer.ibm.com/developer/default/articles/5-steps-of-test-driven-development/images/tdd-red-green-refactoring-v3.png)

# Exercise

1. Clone this repository: https://github.com/DennisLoska/WorkshopEx01
2. Follow the steps below
3. Continue this workflow during your daily work at Aaron

## Info

- Node.js Express server
- Uses Express Router
- Uses Jest testing framework
- No routes or tests present

## Setup

1. Clone repository

```bash
git clone https://github.com/DennisLoska/WorkshopEx01.git
```

1. Inside the repository install dependencies

```bash
npm install
```

1. For running the tests

```bash
npm run test
```

1. For running the server via nodemon

```bash
npm run dev
```

1. See the API docs here: 
    - [http://localhost:5000/docs/](http://localhost:5000/docs/)
    
    Actual endpoints to implement are:
    
    - **GET/api/v1/call**
    - **GET /api/v1/calls**

## Tasks

- [ ]  Implement new routes in a test driven manner
- [ ]  Implent new routes according to design
- [ ]  Verify routes with generated API documentation
- [ ]  Verify routes via test cases
- [ ]  Add at least one test scenario for each possible endpoint response