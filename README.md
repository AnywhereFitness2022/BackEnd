Anywhere Fitness base url: [https://anywhere-fitness-buildweek.herokuapp.com/api](https://anywhere-fitness-buildweek.herokuapp.com/api)

# Client’s (no auth needed)

[GET]/clients/classes/public

- public access to all classes
- Will returning the following format:

```jsx
[
	{
		"class_id": 1,
		"class_name": "Mindful Yoga",
		"class_type": "Yoga",
		"class_intensity_level": 1,
		"class_location": "Miami",
		"class_start_time": "09:00:00",
		"class_duration": 30,
		"max_class_size": 15,
		"total_clients": 0
		},
		{
		"class_id": 2,
		"class_name": "Kickin with Marge",
		"class_type": "Kickboxing",
		"class_intensity_level": 5,
		"class_location": "Fort Lauderdale",
		"class_start_time": "11:00:00",
		"class_duration": 60,
		"max_class_size": 5,
		"total_clients": 0
	},
]
```

# Client’s Login/Register Endpoint

## [POST]/clients/register

- Takes in req.body with the following format:

```jsx
{
"username": "testuser",
"password": "1234"
}
```

- username & password must be all strings
- username must be unique 
- will return the following:

```jsx
{
	"message": "Welcome to Anywhere Fitness, testuser!"
}
```

## [POST]/clients/login

- Takes in req.body with the following format:

```jsx
{ 
	"username": "testuser", 
	"password": "1234"
}
```

- a token will be created in a string format to will be needed
- will return the following:

```jsx
{
	"message": "Welcome testuser! Let's Fitness!",
	"token": "a string"
}
```

- token expires in 1 hour

# Client’s (auth needed)

[GET]/clients/classes/

- restricted endpoint - gets all classes available
- returns the following:

```jsx
[
	{
		"class_id": 1,
		"class_name": "Mindful Yoga",
		"class_type": "Yoga",
		"class_intensity_level": 1,
		"class_location": "Miami",
		"class_start_time": "09:00:00",
		"class_duration": 30,
		"max_class_size": 15,
		"total_clients": 0
		},
		{
		"class_id": 2,
		"class_name": "Kickin with Marge",
		"class_type": "Kickboxing",
		"class_intensity_level": 5,
		"class_location": "Fort Lauderdale",
		"class_start_time": "11:00:00",
		"class_duration": 60,
		"max_class_size": 5,
		"total_clients": 0
		},
		{
		"class_id": 3,
		"class_name": "HIIT Core",
		"class_type": "HIIT",
		"class_intensity_level": 2,
		"class_location": "Miami Beach",
		"class_start_time": "03:00:00",
		"class_duration": 90,
		"max_class_size": 10,
		"total_clients": 0
		},
		{
		"class_id": 4,
		"class_name": "Spin The Globe",
		"class_type": "Spin",
		"class_intensity_level": 1,
		"class_location": "Miami",
		"class_start_time": "12:00:00",
		"class_duration": 45,
		"max_class_size": 25,
		"total_clients": 0
	}
]
```

[GET]/clients/classes/:class_id

- restricted endpoint - gets an individual class by class_id
- will return the following:

```jsx
[
	{
		"class_id": 4,
		"class_name": "Spin The Globe",
		"class_start_time": "12:00:00",
		"class_type": "Spin",
		"class_duration": 45,
		"class_intensity_level": 1,
		"class_location": "Miami",
		"total_clients": 0,
		"max_class_size": 25,
		"instructor_id": 3
	}
]
```

[GET]/clients/:client_id/classes

- restricted endpoint - gets all classes that are reserved by client
- will returning the following:

```jsx
[
	{
		"reservations_id": 1,
		"username": "Homer",
		"class_name": "Kickin with Marge",
		"class_id": 2,
		"class_type": "Kickboxing",
		"class_start_time": "11:00:00",
		"class_duration": 60,
		"class_intensity_level": 5,
		"class_location": "Fort Lauderdale",
		"total_clients": 0
	}
]
```

[POST]/clients/add/:class_id

- creates a new class to the client’s reservation list by the class_id
- don’t need to send anything - it will just need to be routed properly
- total class size will increment by 1 whenever a client reserves a class
- will return the following:

```jsx
{
    "message": "You have reserved a spot for Mindful Yoga"
}
```

[DELETE]/clients/:client_id/remove/class_id

- deletes a class reservation for the client by a class id
- total class size will decrement by 1 whenever a client deletes the class from their reservation list
- don’t need to send anything - it will need to be routed properly
- will return the following:

```jsx
{
	"message": "class has been removed from your reservations"
}
```

# Instructor’s Log-in Endpoint

[GET]/instructors/login

- restricted endpoint for instructors only
- use the following username and password to log in as an instructor
- Takes in req.body with the following format:

```jsx
{ 
	"username": "PeterParker", 
	"password": "1234" 
}
```

- a token will be created in a string format to will be needed
- will return the following:
    
    ```jsx
    {
    "message": "Welcome PeterParker! Let's change fitness!",
    "token": "string"
    }
    ```
    

[GET]/instructors/:inst_id/classes

- restricted endpoint for only instructors
- gets all classes by instructor
- will return the following:

```jsx
[
	{
		"instructor_id": 1,
		"username": "PeterParker",
		"class_id": 5,
		"class_name": "Deep Divin'",
		"class_type": "Scuba Diving",
		"class_start_time": "06:30:00",
		"class_duration": 180,
		"class_intensity_level": 10,
		"class_location": "Key West",
		"total_clients": 0,
		"max_class_size": 50
		},
		{
		"instructor_id": 1,
		"username": "PeterParker",
		"class_id": 1,
		"class_name": "Mindful Yoga",
		"class_type": "Yoga",
		"class_start_time": "09:00:00",
		"class_duration": 30,
		"class_intensity_level": 1,
		"class_location": "Miami",
		"total_clients": 0,
		"max_class_size": 15
	}
]
```

[POST]/instructors/create

- restricted endpoint for instructors only
- instructor create a new class
- class start time format: HH:MM
- class duration format (in minutes): must be an integer
- max class size format: must be an integer
- class intensity level form: must be an integer
- Takes in req.body with the following format:

```jsx
{
	"class_name": "Deep Divin'",
	"class_start_time": "06:30",
	"class_type": "Scuba Diving",
	"class_duration": "180",
	"class_intensity_level": "10",
	"class_location": "Key West",
	"max_class_size": "50",
	"instructor_id": "1"
}
```

- will return the following:

```jsx
{
	"class_id": 5,
	"class_name": "Deep Divin'",
	"class_start_time": "06:30:00",
	"class_type": "Scuba Diving",
	"class_duration": 180,
	"class_intensity_level": 10,
	"class_location": "Key West",
	"max_class_size": 50,
	"instructor_id": 1
}
```

[UPDATE]/instructors/:inst_id/update/:class_id

- restricted endpoint for instructors only
- instructor can modify a class by the class id
- Takes in req.body with the following format:

```jsx
{
	"class_name": "Diving With Sharks'",
	"class_start_time": "02:30",
	"class_type": "Free Diving",
	"class_duration": "180",
	"class_intensity_level": "9",
	"class_location": "Key Largo",
	"max_class_size": "4",
	"instructor_id": "1"
}
```

- will return the following:

```jsx
{
	"message": "Class was successfully updated!"
}
```

[DELETE]/instructors/delete/:class_id

- restricted endpoint for instructors only
- instructor deletes a class by class id
- will return the following: