const priorityWeight = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function getTopNotifications(notifications, n = 10) {

    notifications.forEach(notification => {

        const weight =
            priorityWeight[notification.Type] || 0;

        const time =
            new Date(notification.Timestamp).getTime();

        notification.priorityScore =
            weight * 1000000000 + time;
    });

    notifications.sort(
        (a, b) =>
        b.priorityScore - a.priorityScore
    );

    return notifications.slice(0, n);
}


const notifications = [
{
ID:"1",
Type:"Result",
Message:"Mid-sem Result",
Timestamp:"2026-04-22 17:51:30"
},
{
ID:"2",
Type:"Placement",
Message:"CSX Corporation Hiring",
Timestamp:"2026-04-22 17:51:18"
},
{
ID:"3",
Type:"Event",
Message:"Farewell",
Timestamp:"2026-04-22 17:51:06"
}
];

const top10 =
getTopNotifications(notifications);

console.log(top10);