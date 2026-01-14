self.__uv$config = {
    prefix: "/service/",
    bare: "/bare/",
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: "/uv-handler.js",
    bundle: "/x1y2/uv.bundle.js",
    config: "/x1y2/uv.config.js",
    sw: "/x1y2/uv.sw.js",
};
