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
		<td>/api/v1/auth/signup</td>
		<td>Create user account</td>
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
		<td>PUT</td>
		<td>/api/v1/meals/:mealId</td>
		<td>Update or modify meal</td>
	</tr>
	<tr>
		<td>DELETE</td>
		<td>/api/v1/meals/:mealId</td>
		<td>Delete meal</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/menu</td>
		<td>Setup menu</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/menu</td>
		<td>Get menu</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders</td>
		<td>Get all orders</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/orders</td>
		<td>Make an order</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/api/v1/orders/:orderId</td>
		<td>Modify an order</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders/total</td>
		<td>Get total amount from orders of current day</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders/users</td>
		<td>Get order for current logged in user</td>
	</tr>
		<tr>
		<td>GET</td>
		<td>/api/v1/orders/users/:userId</td>
		<td>Get order for the user with userId</td>
	</tr>
</table>
