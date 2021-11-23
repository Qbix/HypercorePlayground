import DHT from '@hyperswarm/dht';

const node = new DHT();

const remotePublicKey = Buffer.from(
  'd023ae5b77cb5c18e6db77afff700e9675ccca6d3cc9259e8642cd3c3ad0b272',
  'hex'
);
const encryptedSocket = node.connect(remotePublicKey);

encryptedSocket.on('open', function () {
  console.log('Connected to server');
});

encryptedSocket.on('data', function (data) {
  console.log('Remote said:', data.toString());
});
