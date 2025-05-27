

1.    Progress of the day 4/4-25
    Branch FJSX-develop created

Endpoints/modules for the REST-API
/user

    |

    |-----/user/tips

    |

    |-----/user/risk assessments and flood warnings and water levels

    |

    |-----/user/safety information and meeting points

    |

    |-----/user/notification

As a community member

    I want to submit tips about flood conditions so that I can help keep my community informed.

    I want to see current flood warnings so that I can stay informed about potential dangers in my area.
    I want to view current water levels so that I understand the severity of flooding in my area.
    I want to view risk assessments for potential floods so that I can prepare appropriately.

    I want to access safety information during flood events so that I can protect myself and my family.
    I want to find designated security meeting points so that I know where to go during emergencies.

    I want to register for flood notifications so that I receive timely updates about changing conditions.

//------------------------------------------------------------------------
/(admin/municipal worker)

    |-----/admin

    |-----------/admin/Auth/

    |------------|---/admin/Authenticated/Monitoring

    |-----------------|

    |-----------------|---/admin/Authenticated/Monitoring/historicalMonitoring

    |------------|

    |------------|----/admin/Authenticated/Infrastructure issues

    |------------|

    |------------|----/admin/Authenticated/create and update issue

    | Authenticated User Stories

As a municipal employee

    I want to log in to access advanced features so that I can perform my job responsibilities.

    I want to monitor water levels so that I can track changes over time.
    I want to track soil moisture levels so that I can predict potential flooding.
    I want to monitor air humidity so that I can understand environmental conditions.
    I want to monitor water temperature so that I can assess environmental impacts.
    I want to view resolved issues so that I can learn from past events.

    I want to check water pressure readings so that I can identify potential infrastructure issues.

    I want to create and update issue reports so that I can communicate problems to the team.
    I want to update flood warning statuses so that the public receives accurate information.

//------------------------------------------------------------------------
Database structure
We don’t yet know how it will be built, so we are focusing on the API today until we can more confidently plan the database and its structure.
/Database

2.  11/4-25

Agenda for the day
!!NOTE!! DOCUMENTATION IS AN IMPORTANT AND ONGOING TASK !!NOTE!!

    Talk about TS VS JS

    TS is great for typing data

    TS it is!!

    Introduce more middleware (Winston, Morgan, etc.)?

    Simple CRUD Operations (GET, POST, PUT, DELETE)

    Manipulate mocked JSON data

The day starts with

    Simple CRUD for user/tips with JS, then converting all files to TypeScript and figuring it out

    JSON data to be manipulated during CRUD

    NOTE!! DOCUMENTATION

    Functional middleware

What has been accomplished

    CRUD operations for the userTips endpoint are finished using mock data to simulate a database

    We have used JSON data to simulate data being passed

    TypeScript has been initiated in the project with a tsconfig.json file

    Middleware has been added !!NOTE ONLY AS ROUTING MIDDLEWARE

3. 17/4-25
   What has been accomplished

    Started working on swagger documentation, but its doesnt seem to work, we get the error message: No operations

4. 18/4-25
   What has been accomplished

    Worked on CRUD-operations for the admin routes, finished almost all of them, will continue on monday

5. 21/4-25
   What has been accomplished

    finished the CRUD-operations in their current form They are in need of revisiting when the database is in place

    Started working on collective ts typing (instead of having 4231435 different type interfaces), but we have no clue how to do i proparly yet

    Swagger have we worked with a bit, but it is not cooperating. Considering just starting with yaml right away instead

6. 23/4-25
   What has been accomplished

    Got swagger to work with a yaml-file. There is now swagger documentation for each CRUD-operatio on each endpoint.

    For the Frontend team to use it. They need to run the server and visit http://localhost:5000/api-docs/#/
    And a "Typical" API documentation will be seen. and therefore guide them.
    furthest down on that page there is also "types" typed up for the data that is being sent and recieved. So they now how the data is structured.
    It needs a code-review before merging to develop. The code review shall dony by next meeting(25/4-25)

7. 25/4-25
   What has been accomplished

   Swagger documentation and instruction for the frontend team is finished and in this branch under FORFRONTEND.md

   Joi-validation for a big part of the data being worked with has been implemented

   Middleware function for timestamp creation is put in place. But needs to be implemented throughout the whole project

8. 02/05-25 
   What has been accomplished
   
   Put and delete implemented in infrastructure issues.

   swagger documentation is updated with new types and routes. some have also been updated to 
    
   A diagram for how the database is gonna be structured
   Link to diagram: https://drive.google.com/file/d/16A-hVIY7EcBifMhhOyvWhP4TI4wbav9T/view?usp=sharing

   Applied the timestapmCreation middleware all over di place.
   
   Joi Validation has been updated to accommodate the change of different types.