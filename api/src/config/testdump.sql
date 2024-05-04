CREATE TABLE dutchdict(
    dutch VARCHAR PRIMARY KEY,
    engels VARCHAR NOT NULL,
    notes VARCHAR DEFAULT '' NULL,
    sentences VARCHAR DEFAULT '' NULL
);

INSERT INTO dutchdict(dutch, engels)
VALUES ('moeder', 'mother');

INSERT INTO dutchdict(dutch, engels)
VALUES ('vader', 'father');

-- flush privileges;