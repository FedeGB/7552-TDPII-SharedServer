-- Insert default categories and interests
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('music', null);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('music/band', 1);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('sport', null);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('sex', null);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('outdoors', null);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('travel', null);
INSERT INTO Categories (Name, SubcategoryId)
VALUES ('food', null);

INSERT INTO Interests (CategoryId, Name)
VALUES(4, 'Man');
INSERT INTO Interests (CategoryId, Name)
VALUES(1, 'Rock');
INSERT INTO Interests (CategoryId, Name)
VALUES(2, 'Pearl Jam');
INSERT INTO Interests (CategoryId, Name)
VALUES(2, 'Radiohead');
INSERT INTO Interests (CategoryId, Name)
VALUES(5, 'Running');
INSERT INTO Interests (CategoryId, Name)
VALUES(7, 'Asian');
INSERT INTO Interests (CategoryId, Name)
VALUES(6, 'Europe');
INSERT INTO Interests (CategoryId, Name)
VALUES(6, 'Backpacking');

-- Insert default users
INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex, Edad) 
VALUES ('Janeth Doe', 'janedoe', null, 'janedoe@gmail.com', 'F', 20);
INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex, Edad) 
VALUES ('John Doe', 'johndoe', null, 'john@gmail.com', 'M', 30);
INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex, Edad) 
VALUES ('Michael Jackson', 'mijacksn', null, 'mijacksn@gmail.com', 'M', 25);
INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex, Edad) 
VALUES ('Alexis Foobar', 'afoobar', null, 'afoobar@live.com', 'F', 21);

INSERT INTO Location (UserId, LocationX, LocationY)
VALUES (1, -34.5848097, -58.4051191);
INSERT INTO Location (UserId, LocationX, LocationY)
VALUES (2, -34.6192384,-58.3699024);
INSERT INTO Location (UserId, LocationX, LocationY)
VALUES (4, 34.1099103,-118.522211);
INSERT INTO Location (UserId, LocationX, LocationY)
VALUES (3, -34.5419158,-58.4444641);


INSERT INTO UserInterests (UserId, InterestId)
VALUES (1, 1);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (1, 2);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (1, 3);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (1, 4);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (2, 2);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (2, 3);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (2, 4);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (3, 2);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (3, 3);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (3, 4);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (4, 1);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (4, 2);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (4, 3);
INSERT INTO UserInterests (UserId, InterestId)
VALUES (4, 4);
