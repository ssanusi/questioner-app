# Questioner
Questioner is an application that helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6df37653efc44b5d903077d1e3c86368)](https://app.codacy.com/app/ssanusi/questioner-app?utm_source=github.com&utm_medium=referral&utm_content=ssanusi/questioner-app&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/ssanusi/questioner-app.svg?branch=master)](https://travis-ci.org/ssanusi/questioner-api)
[![Coverage Status](https://coveralls.io/repos/github/ssanusi/questioner-app/badge.svg?branch=master)](https://coveralls.io/github/ssanusi/questioner-app?branch=master)

**View UI template:** [Click](http://ssanusi.github.io/questioner-app/)

## Features

### Users

- Signup and Login
- can post questions to a specific meetup
- can upvote or downvote a question.
- can post comments to a specific question.

### Admin

- Create Meetup
- Delete Meetup


## Installation

Clone repo to your local machine:

```git
git clone https://github.com/ssanusi/questioner-app.git
```

**Install dependencies and run locally**<br/>
*Note>> Install node if not already installed on local machine:*

Then run:

```npm
npm install
```

Create .env like the .env.sample file, just replace with your own enviroment variables.

Now start the server:

```npm
npm start
```

## Testing

To run tests:

```npm
npm run test:dev
```

## API

API is deployed at [here](https://questioner-app-api.herokuapp.com) on heroku.

### API Routes

<table>
	<tr>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td>
		<td>Create user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/login</td>
		<td>Sign in to user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/admin/auth/signup</td>
		<td>Create Admin account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/admin/auth/signin</td>
		<td>Sign in to Admin account</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/meetups</td>
		<td>Get all meetups</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/meetups/:id</td>
		<td>Get a meetup</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/meetups</td>
		<td>Add new meetup</td>
	</tr>
	<tr>
		<td>DELETE</td>
		<td>/api/v1/meetup/:Id</td>
		<td>Delete meetup</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/meetup/:Id/rsvps</td>
		<td>rsvp a meetup</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/questions</td>
		<td>Post question</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/questions?meetupId=<:id></td>
		<td>Get questions by meetupId</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/questions?userId=<:id></td>
		<td>Get questions by userId</td>
	</tr>
	<tr>
		<td>PATCH</td>
		<td>/api/v1/questions/:id/upvote</td>
		<td>upvote a question</td>
	</tr>
	<tr>
		<td>PATCH</td>
		<td>/api/v1/questions/:id/downvote</td>
		<td>downvote a question</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/comments</td>
		<td>Post a comment</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/comments?questionId=:id</td>
		<td>get comments by questionId</td>
	</tr>
</table>
