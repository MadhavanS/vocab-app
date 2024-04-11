CREATE TABLE nlendb(
    dutch VARCHAR(255) PRIMARY KEY,
    engels VARCHAR(255),
    notes VARCHAR(255),
    sentences VARCHAR(255)
);

INSERT INTO nlendb(dutch, engels) 
VALUES ("moeder", "mother");

INSERT INTO nlendb(dutch, engels) 
VALUES ("vader", "father");

flush privileges;