
CREATE DATABASE cheapomail;
use cheapomail;

CREATE TABLE user
(
  id int PRIMARY KEY not null,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(15) NOT NULL
);
ALTER TABLE cheapomail.user ADD CONSTRAINT unique_username UNIQUE (username);

CREATE TABLE message
(
  id int PRIMARY KEY NOT NULL,
  body VARCHAR(2000) NOT NULL,
  subject VARCHAR(30) DEFAULT NULL ,
  user_id VARCHAR(30) NOT NULL,
  recipient_ids VARCHAR(1100) NOT NULL,
  foreign key(user_id) references user(id)
);

CREATE TABLE message_read
(
  id int PRIMARY KEY NOT NULL,
  message_id int NOT NULL,
  reader_id int NOT NULL,
  date date NOT NULL
  foreign key(message_id) references message(id),
  foreign key(reader_id) references user(id)
);
ALTER TABLE cheapomail.Message_read ADD CONSTRAINT unique_id UNIQUE (id);
