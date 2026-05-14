# Stage 1
# Notification System Design
## Introduction
This notification system helps users receive updates after logging into the application. Users can see notifications, mark them as read, delete them, and receive updates in real time.

## Main Features
* Create notification
* View all notifications
* View a single notification
* Mark notification as read
* Mark all notifications as read
* Delete notification
* Filter notifications
* Get real-time notifications

---

## Common Headers
```http
Content-Type: application/json
Authorization: Bearer <token>
```

---
## Base URL
```http/api/v1```

---
## 1. Create Notification
**Endpoint**
```http POST /api/v1/notifications```

**Request**\
```json
{
  "userId":"123",
  "title":"New Message",
  "message":"You received a message",
  "type":"message"
}
```
**Response**
```json
{
  "success": true,
  "message": "Notification created"
}
```

---
## 2. Get All Notifications

**Endpoint**
```http GET /api/v1/notifications ```

**Response**
```json
{
  "success": true,
  "data": []
}
```

---
## 3. Get Notification by ID

**Endpoint**
```http GET /api/v1/notifications/{id}```

---

## 4. Mark Notification as Read
**Endpoint**
```http PATCH /api/v1/notifications/{id}/read```
---

## 5. Mark All Notifications as Read
**Endpoint**
```http PATCH /api/v1/notifications/read-all```

---
## 6. Delete Notification
**Endpoint**
```http DELETE /api/v1/notifications/{id}```

## 7. Filter Notifications
**Endpoint**
```http GET /api/v1/notifications?status=unread```

---
## Real-Time Notifications
For real-time updates, WebSocket can be used.
Purpose:
Send notifications instantly
Avoid refreshing the page repeatedly
Improve user experience
Example:
```https://localhost:3000/notifications```

---

## Database Fields

```json
{
  "notificationId":"string",
  "userId":"string",
  "title":"string",
  "message":"string",
  "status":"read/unread",
  "createdAt":"timestamp"
}
```
---

# Stage 2
## Database Choice 
I selected mongodb as my choice for the database because the size and data for the notification messages is not in a fixed format and changes frequently and storing it in json format is easy 
Mongodb provides flexible schema and handle large data easily

## Advantages
* flexible schema
* fast read and write operation
* easy to scale
* good for large data

## Schema
```json
{
  "notificationId":"n101",
  "userId":"u001",
  "title":"New Message",
  "message":"You received a new message",
  "type":"message",
  "status":"unread",
  "createdAt":"timestamp"
}
```

## problwms when data increases
* slow query performance
* high storage usage
* increased server load
* slow response time


## solution
* use indexing for fast search
* use pagination
* Archieve old notification
* use caching 

## Nosql queries

### Create notification
```js
db.notifications.insertOne({
userId:"u001",
title:"New Message",
message:"You received a message",
status:"unread"
})
```
```js
db.notifications.insertOne({
userId:"u001",
title:"New Message",
message:"You received a message",
status:"unread"
})
```

### Mark Notification as Read

```js
db.notifications.updateOne(
{notificationId:"n101"},
{$set:{status:"read"}}
)
```

### Delete Notification

```js
db.notifications.deleteOne({
notificationId:"n101"
})
```

### Filter Unread Notifications

```js
db.notifications.find({
status:"unread"
})
```


# Stage 3
## Query Analysis
```sql
SELECT * FROM notifications
WHERE studentID=1042 AND isRead=false
ORDER BY createdAt ASC;
```

### Is it correct?
yes , it returns notification of a student.

## why is it slow?
* large dataset(5000000 notification)
* 'SELECT *' fetches extra data
* No indexing

### Improved query
```sql
SELECT notificationID,title,message
FROM notifications
WHERE studentID=1042
AND isRead=false
ORDER BY createdAt DESC;
```
We can also add indexing for better results



---

# stage 4
## Solution 
To reduce load and improve performance:
* use caching for frequently accessed notifications
* use pagination instead of loading all notification
* use websocket for real-time notification
* load only whwn needed

## performance improvement
* reduces database requests
* faster response time
* better ui/ux
* less server load

## Tradeoffs
### caching 
Advantage 
* Faster access time

Disadvantage
* Extra memory required

### Paginatton
Advantage
* Loads small amount of data

Disadvantage
* Extra api calls needed

### WebSocket
Advantage
* Real time update

Disadvantage
* More connection management required



---
# stage 5
## problems 
* sending notification one by one is slow
* if email fails,some student may not receive the notification
* high load on db and server

## solution
Instead of sending all notifications at once save it in database first than divide students into smaller batched and send notification according to batches

```python
function notify_all(student_ids,message):

    save_all_notifications()

    batches = split(student_ids,1000)

    for batch in batches:
        process(batch)


process(batch):

    for student_id in batch:

        send_email(student_id,message)

        push_to_app(student_id,message)

        if failed:
            retry()
```
# Stage 6

## Approach

Priority is decided using two factors:

* Notification type weight
* Latest timestamp

Weights used:

* Placement = 3
* Result = 2
* Event = 1

Higher priority notifications appear first.

To maintain top 10 efficiently when new notifications arrive, a priority queue (max heap) can be used.



