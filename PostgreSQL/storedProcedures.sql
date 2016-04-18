-- Create aggregate function
create aggregate array_agg_mult (anyarray) (
	SFUNC     = array_cat
   ,STYPE     = anyarray
   ,INITCOND  = '{}'
);

-- getUsers
CREATE OR REPLACE FUNCTION getUsers()
RETURNS TABLE (
	id bigint,
	name text,
	alias text,
	photoprofile text,
	email text,
	sex char(1),
	locationx real,
	locationy real,
	interests text[]
)
AS $$
BEGIN
	RETURN QUERY SELECT u.*, l.locationX, l.locationY, (SELECT array_agg_mult(ARRAY[ARRAY[C.name, I.name]]) 
		FROM USERINTEREsts UI 
		inner join interests i on ui.interestid = i.id 
		inner join categories c on i.categoryid = c.id 
		where ui.userid = u.id) interests
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
	photoprofile text,
	email text,
	sex char(1),
	locationx real,
	locationy real,
	interests text[]
)
AS $$
BEGIN
	RETURN QUERY SELECT u.*, l.locationX, l.locationY, (SELECT array_agg_mult(ARRAY[ARRAY[C.name, I.name]]) 
		FROM USERINTEREsts UI 
		inner join interests i on ui.interestid = i.id 
		inner join categories c on i.categoryid = c.id 
		where ui.userid = uId) interests
	FROM Users u
	INNER JOIN Location l ON l.UserId = u.Id
	WHERE u.Id = uId;
END; $$
LANGUAGE 'plpgsql';

-- addUser
CREATE OR REPLACE FUNCTION addUser(
	nname text,
	alias text,
	photoprofile text,
	email text,
	sex char(1),
	locationx real,
	locationy real,
	interests text[]
)
RETURNS NUMERIC
AS $$
DECLARE uId bigint;
DECLARE ninterestId bigint;
DECLARE ncategoryId bigint;
DECLARE ninterestName text;
DECLARE ncategoryName text;
BEGIN	
	INSERT INTO Users (Name, Alias, PhotoProfile, Email, Sex) 
	VALUES (nname, alias, photoprofile, email, sex);
	SELECT CURRVAL('users_id_seq') INTO uId;

	INSERT INTO Location (UserId, LocationX, LocationY)
	VALUES (uId, locationx, locationy);

	FOR i IN array_lower(interests, 1) .. array_upper(interests, 1) LOOP
		SELECT interests[i]::json->>'category' INTO ncategoryName;
		SELECT interests[i]::json->>'value' INTO ninterestName;
		SELECT Id INTO ncategoryId FROM Categories WHERE lower(Name) like lower(ncategoryName);
		SELECT Id INTO ninterestId FROM Interests WHERE lower(Name) like lower(ninterestName) AND CategoryId = ncategoryId;
		
		INSERT INTO UserInterests (UserId, InterestId)
		VALUES (uId, ninterestId);

	END LOOP;
	RETURN uId;

END; $$
LANGUAGE 'plpgsql';

-- updateuser
CREATE OR REPLACE FUNCTION updateUser(
	uid bigint,
	nname text,
	nalias text,
	nphotoprofile text,
	nemail text,
	nsex char(1),
	nlocationx real,
	nlocationy real,
	interests text[]
)
RETURNS NUMERIC
AS $$
DECLARE ninterestId bigint;
DECLARE ncategoryId bigint;
DECLARE ninterestName text;
DECLARE ncategoryName text;
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
	FOR i IN array_lower(interests, 1) .. array_upper(interests, 1) LOOP
		SELECT interests[i]::json->>'category' INTO ncategoryName;
		SELECT interests[i]::json->>'value' INTO ninterestName;
		SELECT Id INTO ncategoryId FROM Categories WHERE lower(Name) like lower(ncategoryName);
		SELECT Id INTO ninterestId FROM Interests WHERE lower(Name) like lower(ninterestName) AND CategoryId = ncategoryId;
		
		INSERT INTO UserInterests (UserId, InterestId)
		VALUES (uId, ninterestId);

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

-- getInterests
CREATE OR REPLACE FUNCTION getInterests()
RETURNS TABLE (
	interestId bigint,
	categoryId bigint,
	interestName text,
	categoryName text
)
AS $$
BEGIN	
	RETURN QUERY SELECT I.Id interestId, C.Id categoryId, I.Name interestName, C.Name categoryName
	FROM Interests I
	INNER JOIN Categories C ON I.categoryid = C.Id;
END; $$
LANGUAGE 'plpgsql';

-- addInterest
CREATE OR REPLACE FUNCTION addInterest(
	nname text,
	ncategoryname text
)
RETURNS NUMERIC
AS $$
DECLARE ncategoryId bigint;
BEGIN	
	SELECT Id INTO ncategoryId FROM Categories WHERE Name like ncategoryname;
	
	INSERT INTO Interests (Name, CategoryId) 
	VALUES (nname, ncategoryId);
	RETURN CURRVAL('interests_id_seq');

END; $$
LANGUAGE 'plpgsql';

-- updatePhoto
CREATE OR REPLACE FUNCTION updatePhoto(
	uId bigint,
	photo text
)
RETURNS NUMERIC
AS $$
BEGIN	
	UPDATE Users
	SET photoprofile = photo
	WHERE Id = uId;
	RETURN 1;

END; $$
LANGUAGE 'plpgsql';

