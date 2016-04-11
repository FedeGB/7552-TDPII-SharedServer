-- getUsers
CREATE OR REPLACE FUNCTION getUsers()
RETURNS TABLE (
	id bigint,
	name text,
	alias text,
	photoprofile bytea,
	email text,
	sex char(1),
	locationx real,
	locationy real
)
AS $$
BEGIN
	RETURN QUERY SELECT u.*, l.locationX, l.locationY
	FROM Users u
	INNER JOIN Location l ON l.UserId = u.Id;
END; $$
LANGUAGE 'plpgsql';

-- getUser(userId)
CREATE OR REPLACE FUNCTION getUser(uId bigint)
RETURNS TABLE (
	id bigint,
	name text,
	alias text,
	photoprofile bytea,
	email text,
	sex char(1),
	locationx real,
	locationy real
)
AS $$
BEGIN
	RETURN QUERY SELECT u.*, l.locationX, l.locationY
	FROM Users u
	INNER JOIN Location l ON l.UserId = u.Id
	WHERE u.Id = uId;
END; $$
LANGUAGE 'plpgsql';

-- addUser
CREATE OR REPLACE FUNCTION addUser(
	name text,
	alias text,
	photoprofile bytea,
	email text,
	sex char(1),
	locationx real,
	locationy real,
	interests text
)
RETURNS NUMERIC
AS $$
DECLARE uId bigint;
DECLARE interestIds text[];
BEGIN	
	INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex) 
	VALUES (name, alias, photoprofile, email, sex);
	SELECT CURRVAL('users_id_seq') INTO uId;

	INSERT INTO Location (UserId, LocationX, LocationY)
	VALUES (uId, locationx, locationy);

	interestIds := string_to_array(interests, '|');
	FOR i IN array_lower(interestIds, 1) .. array_upper(interestIds, 1) LOOP

		INSERT INTO UserInterests (UserId, InterestId)
		VALUES (uId, interestIds[i]::int);

	END LOOP;
	RETURN uId;

END; $$
LANGUAGE 'plpgsql';

-- updateuser
CREATE OR REPLACE FUNCTION updateUser(
	uid bigint,
	nname text,
	nalias text,
	nphotoprofile bytea,
	nemail text,
	nsex char(1),
	nlocationx real,
	nlocationy real,
	interests text
)
RETURNS NUMERIC
AS $$
DECLARE interestIds text[];
BEGIN	
	UPDATE Users
	SET 	Name = nname,
		Alias = nalias,
		PhotoProfile = nphotoprofile,
		Email = nemail,
		Sex = nsex
	WHERE Id = uid;

	UPDATE Location 
	SET	LocationX = nlocationx,
		LocationY = nlocationy
	WHERE UserId = uid;

	DELETE FROM UserInterests WHERE UserId = uid;
	interestIds := string_to_array(interests, '|');
	FOR i IN array_lower(interestIds, 1) .. array_upper(interestIds, 1) LOOP

		INSERT INTO UserInterests (UserId, InterestId)
		VALUES (uId, interestIds[i]::int);

	END LOOP;
	RETURN 1;

END; $$
LANGUAGE 'plpgsql';

-- deleteUser
CREATE OR REPLACE FUNCTION deleteUser(
	uid bigint
)
RETURNS NUMERIC
AS $$
DECLARE interestIds text[];
BEGIN	
	DELETE FROM UserInterests WHERE UserId = uid;
	DELETE FROM Location WHERE UserId = uid;
	DELETE FROM Users WHERE Id = uid;
	RETURN 1;

END; $$
LANGUAGE 'plpgsql';

