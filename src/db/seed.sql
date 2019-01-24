
INSERT INTO "meetups"
    ("createdon", "location", "images", "topic", "happeningon", "tags")
VALUES
    ('2019-01-01T22:48:05.633Z', '235 adeola adeku VI lagos', '{"googgle.com","msn.com"}', 'Introduction to Javascript', '2019-01-22T18:25:44.913Z', '{"programming", "web", "front-end"}'),
    ('2019-01-01T22:48:05.633Z', '235 adeola adeku VI lagos', '{"googgle.com","msn.com"}', 'Introduction to Javascript', '2019-01-22T18:25:44.913Z', '{"programming", "web", "front-end"}'),
    ('2019-01-01T22:48:05.633Z', '235 adeola adeku VI lagos', '{"googgle.com","msn.com"}', 'Introduction to Javascript', '2019-01-22T18:25:44.913Z', '{"programming", "web", "front-end"}');


INSERT INTO "users"
    ("firstname","lastname","othername","email","phonenumber","username","password","isadmin")
VALUES
    ('bashir', 'abdullahi', 'musa','bashir@yahoo.com', '08055577733', 'bbashir', '$2a$14$DXD4SkCV6pS9TdJMfmpE9uptaILU.AgJBB56q1ILCjaHZ56eyPGse', 'true'),
    ('fatima', 'ahmed', 'yusuf', 'fatima@hotmail.com', '08033372043', 'ffatima', '$2a$14$pIeSuIsm0D3SP6savC0ecOyVdPWj5IITyvh22K4yn3OvgLRlufPRi', 'false'),
    ('test','test','test','test@yahoo.com','08073372043','test','$2a$14$RsWbJjLeV3NAJ9xp2ga94.ylki/D5qPu7EwbhJ0hKRTJRKl34vVUi','false'),
    ('admin', 'admin','admin','admin@yahoo.com','08073372043','admin','$2a$14$bps1wCKkpcUccv0Cd8gnFONcT6dBjQjYwyplEMMr/LJcDpSiw.oZu','true');

INSERT INTO "questions"
    ("userid", "meetupid", "title", "body", "upvotes", "downvotes")
VALUES
    (1, 1, 'what is polymorphism?', 'what is polymophism and in what way can we implement it in Javascript', 0, 0),
    ( 1, 1, 'what is polymorphism?', 'what is polymophism and in what way can we implement it in Javascript', 0, 0),
    ( 1, 1, 'what is polymorphism?', 'what is polymophism and in what way can we implement it in Javascript', 0, 0),
    ( 2, 2, 'what is polymorphism?', 'what is polymophism and in what way can we implement it in Javascript', 0, 0),
    ( 2, 2, 'what is encapsolation?', 'what is encapsolation and in what way can we implement it in Javascript', 0, 0);


