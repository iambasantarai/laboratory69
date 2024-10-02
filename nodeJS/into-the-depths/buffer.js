const { Buffer } = require("node:buffer");

// creates a zero-filled Buffer of length 4
const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)

memoryContainer[0] = 0xff;
memoryContainer[1] = 0xc0;
memoryContainer.writeInt8(-33, 2); // need to give the value and index
memoryContainer[3] = 0xa9;

for (let index = 0; index < memoryContainer.length; index++) {
  console.log(`[${index}]: `, memoryContainer[index]);
}

console.log(memoryContainer.toString("hex"));

console.log("Reading signed number: ", memoryContainer.readInt8(2)); // need to specify index

// Creates a Buffer of length 5,
// filled with bytes which all have the value `1`.
const myBuf1 = Buffer.alloc(5, 1);
console.log(myBuf1);

// CHALLENGE
// raw binary data: 0100 1000 0110 1001 0010 0001
const challengeBuf = Buffer.alloc(3);
challengeBuf[0] = 0b01001000;
challengeBuf[1] = 0b01101001;
challengeBuf[2] = 0b00100001;
console.log(challengeBuf);
console.log("O/p: ", challengeBuf.toString("utf8"));

const anotherBuff = Buffer.from([0b01001000, 0b01101001, 0b00100001]);
console.log(anotherBuff.toString("utf8"));
console.log("Allocated length for anotherBuff: ", anotherBuff.length);

const anotherBuff2 = Buffer.from("486921", "hex");
console.log(anotherBuff2.toString("utf8"));
console.log("Allocated length for anotherBuff2: ", anotherBuff2.length);

const devanagariBuff = Buffer.from("E0A598", "hex");
console.log(devanagariBuff.toString("utf8"));
