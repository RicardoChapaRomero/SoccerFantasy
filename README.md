# SoccerFantasy
This application's goal is to replicate the [Fantasy Footbal App](https://fantasy.nfl.com/) for soccer games.


## Building React App & Express Server
### For full-stack development
Run ``` npm run dev ``` over root directory. This will run both express server on port 3001 and react on port 3000 with the same command. Allowing updates from both ends with having to stop one process or the other.

### For back end and general testing 
Run ``` npm start ``` over root directory. The difference with this command to the previous one is that the only changes that are going to be reflected on the app are the ones on the back end. Front end changes (everything under /client) are not going to be reflected right away. In order to see those changes you need to stop the current server, run ``` npm install && npm run build ``` under /client and the re-start the express server.
