require("dotenv").config();

async function Log(stack, level, packageName, message) {

    const response = await fetch(
        "http://4.224.186.213/evaluation-service/logs",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":
                `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                stack,
                level,
                package: packageName,
                message
            })
        }
    );

    const data = await response.json();

    console.log(data);
}

module.exports = Log;