# AdmitKard Assignment
A simple Restful API that provides a service / program which is be able to insert new questions in a question bank. This service / program  provides a way to retrieve the question based on a text.
 

> Setup the project using npm init<br />
> Install the required dependencies (Express, Mongoose, Connect-mongo)


**Tech Stack**
- Node.js<br />
- Express <br/>
- Mongodb <br/>
- Mode of interface:- API

**API has following functionalities**

> Insert a new question and store<br />
> Return the questions based on a text (it can be any text or tag) <br />

**Model Schemas**

- Questions collection (for entering querry data)

**Routes**

> /insert (inserts new data in database)<br />
> /select (returns the required questions that are relevant to the text)<br />

**Key point**
- Validations added for topics and tags which entered while insertion<br />
- If question already exists then new question will not be inserted <br />
- You can add as many relevant tags as you want with a question<br/>
- While seeing the project in action have a look at the enum of topics and tags within the model schema<br/>





