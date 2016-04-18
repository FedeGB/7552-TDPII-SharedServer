CREATE TABLE Users (
	Id bigserial PRIMARY KEY, 
	Name text NOT NULL, 
	Alias text NOT NULL, 
	PhotoProfile text, 
	Email text NOT NULL, 
	Sex char NOT NULL
);

CREATE TABLE Location (
	LocationId bigserial PRIMARY KEY,
	UserId bigserial REFERENCES Users (Id) UNIQUE,
	LocationX real NOT NULL DEFAULT 0.00,
	LocationY real NOT NULL DEFAULT 0.00
);

CREATE TABLE Categories (
	Id bigserial PRIMARY KEY,
	Name text NOT NULL,
	SubcategoryId bigint REFERENCES Categories (Id)
);

CREATE TABLE Interests (
	Id bigserial PRIMARY KEY,
	CategoryId bigint REFERENCES Categories (Id) NOT NULL,
	Name text NOT NULL
);

CREATE TABLE UserInterests (
	UserId bigint REFERENCES Users (Id) NOT NULL,
	InterestId bigint REFERENCES Interests (Id) NOT NULL
);
