DROP TABLE IF EXISTS meetups
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS questions
DROP TABLE IF EXISTS rsvp

CREATE TABLE IF NOT EXISTS meetups (
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP DEFAULT NOW(),
        location VARCHAR(128) NOT NULL,
        images TEXT[],
        topic VARCHAR(128) NOT NULL,
        happeningOn TIMESTAMP,
        Tags TEXT[]
);

CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY ,
        firstname VARCHAR(128) NOT NULL,,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128),
        email VARCHAR(128)  NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        registered TIMESTAMP DEFAULT NOW(),
        isAdmin BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS questions(
        id SERIAL PRIMARY KEY ,
        createdOn VARCHAR(128) NOT NULL,,
        createdBy INTEGER NOT NULL,
        meetup INTEGER NOT NULL,
        title VARCHAR(128)  NOT NULL,
        body VARCHAR(255)  NOT NULL
        votes INTEGER DEFAULT 0 ,
        FOREIGN KEY (meetup) REFERENCES meetups(id) ON DELETE CASCADE,
        FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS rsvp(
        id SERIAL INTEGER NOT NULL ,
        meetup INTEGER NOT NULL,,
        userId INTEGER NOT NULL,
        response VARCHAR(128) NOT NULL,
        PRIMARY KEY(meetup, userId)
        FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
        FOREIGN KEY (meetup) REFERENCES Meetups(id) ON DELETE CASCADE
);