import app from './app';
import { startRealTimeSync } from './imap/imapClient';
startRealTimeSync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
