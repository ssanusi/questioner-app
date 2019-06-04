DROP TABLE IF EXISTS meetups CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS rsvps CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE IF NOT EXISTS meetups (
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMPTZ DEFAULT NOW(),
        location VARCHAR(128) NOT NULL,
        images TEXT[],
        topic VARCHAR(128) NOT NULL,
        happeningOn TIMESTAMPTZ,
        Tags TEXT[]
);

CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY ,
        fullName VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        registered TIMESTAMPTZ DEFAULT NOW(),
        isAdmin BOOL NOT NULL,
        UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS questions(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMPTZ DEFAULT NOW(),
        userId INTEGER NOT NULL,
        meetupId INTEGER NOT NULL,
        title VARCHAR(255)  NOT NULL,
        body VARCHAR(255)  NOT NULL,
        upVotes INTEGER DEFAULT 0,
        DownVotes INTEGER DEFAULT 0,
        FOREIGN KEY (meetupId) REFERENCES meetups(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rsvps(
        id SERIAL NOT NULL ,
        meetupId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        response VARCHAR(128) NOT NULL,
        PRIMARY KEY(meetupId, userId),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (meetupId) REFERENCES meetups(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments(
        id SERIAL PRIMARY KEY ,
        questionId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        comment VARCHAR(128) NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
);