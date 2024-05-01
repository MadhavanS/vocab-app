CREATE TABLE dutchDict(
    dutch VARCHAR PRIMARY KEY,
    engels VARCHAR NOT NULL,
    notes VARCHAR DEFAULT '' NULL,
    sentences VARCHAR DEFAULT '' NULL
);

INSERT INTO dutchDict(dutch, engels)
VALUES ('moeder', 'mother');

INSERT INTO dutchDict(dutch, engels)
VALUES ('vader', 'father');

-- flush privileges;