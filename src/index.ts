import server from './server';
import { processEnvironment } from './environments';

server.listen(processEnvironment.PORT, () => {
  console.log(`server started at http://localhost:${processEnvironment.PORT}`);
});
