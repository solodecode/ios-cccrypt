var encrypt_func = Module.findExportByName("libcommonCrypto.dylib", "CCCrypt");

Interceptor.attach(encrypt_func, {
  onEnter: function (args) {
    console.log("[+] CCCrypt function called");
    console.log("[+] CCOperation: " + args[0].toInt32());
    console.log("[+] CCAlgorithm: " + args[1].toInt32());
    console.log("[+] CCOptions: " + args[2].toInt32());
    console.log("[+] key: \n" + hexdump(ptr(args[3]), { length: args[4].toInt32() }));
    console.log("[+] keyLength: \n" + args[4].toInt32());
    console.log("[+] iv: \n" + hexdump(ptr(args[5]), { length: 16 }));
    console.log("[+] dataIn: \n" + hexdump(ptr(args[6]), { length: args[7].toInt32() }));
    console.log("[+] dataInLength: " + args[7].toInt32());
    this.dataOutPtr = args[8];
    this.dataOutLengthPtr = args[10];
  },
  onLeave: function (retval) {
    console.log("[+] dataOut: \n" + hexdump(ptr(this.dataOutPtr), { length: ptr(this.dataOutLengthPtr).readUInt() }));
  }
});
