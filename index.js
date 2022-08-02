// start your server here
const server = require('./api/server');
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`u4sp2 challenge running on port ${PORT}`));