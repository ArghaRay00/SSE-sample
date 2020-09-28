const http = require("http");

http
  .createServer((request, response) => {
    console.log(`Requested url: ${request.url}`);

    const eventHistory = [];

    request.on("close", () => {
      if (!response.writableEnded) {
        response.end();
        console.log("Stopped sending events.");
      }
    });

    if (request.url.toLowerCase() == "/events") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });

      checkConnectionToRestore(request, response, eventHistory);

      sendEvents(response, eventHistory);

      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Argha Ray", "Temparature": "98.5F" , "RFID":"R121312"}'
      //     );
      //     response.write("\n\n");
      //   }, 3000);

      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Shouvik Mukherjee", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 6000);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Ashwani  Mangal", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 9000);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Bitan Basu", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 1200);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Priyam Mitra", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 6000);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Ani RC", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 1500);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Mass Roy", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 1800);
      //   setTimeout(() => {
      //     response.write(
      //       'data: {"Name": "Lil Mitra", "Temparature": "102.5F" , "RFID":"R546546"}'
      //     );
      //     response.write("\n\n");
      //   }, 2100);
    } else {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
  });

function sendEvents(response, eventHistory) {
  setTimeout(() => {
    if (!response.writableEnded) {
      const eventString =
        'id: 1\ndata: {"Name": "Mass Roy", "Temparature": "102.5F" , "RFID":"R546546"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 5000);

  setTimeout(() => {
    if (!response.writableEnded) {
      const eventString =
        'id: 2\ndata: {"Name": "Ani RC", "Temparature": "97.5F" , "RFID":"R546546"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 10000);

  setTimeout(() => {
    if (!response.writableEnded) {
      const eventString =
        'id: 3\ndata: {"Name": "Priyam Mitra", "Temparature": "98.5F" , "RFID":"R546546"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 15000);

  setTimeout(() => {
    if (!response.writableEnded) {
      const eventString =
        'id: 4\ndata: {"Name": "Argha Ray", "Temparature": "103.5F" , "RFID":"R546546"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 20000);
}

function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers["last-event-id"]) {
    const eventId = parseInt(request.headers["last-event-id"]);

    const eventsToReSend = eventHistory.filter((e) => e.id > eventId);

    eventsToReSend.forEach((e) => {
      if (!response.writableEnded) {
        response.write(e);
      }
    });
  }
}
