import app from './app';
import config from './config';

const port = process.env.PORT || config().get('port');

app.listen(port, () => {
  console.log(`Express server running on port: ${port}!`);
});
