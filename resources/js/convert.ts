import { createServer } from "http";

// import { readFileSync } from "fs";
// import { stdin } from "process";
import { parse } from "parse5";
import {
    Htmlparser2TreeAdapterMap,
    adapter as htmlparser2Adapter,
} from "parse5-htmlparser2-tree-adapter";

import { deserialize } from "./Components/TextEditor/deserialize";

// const data = readFileSync(stdin.fd, "utf-8");
// const dom = parse(data, {
//     treeAdapter: htmlparser2Adapter,
// });
// const body = (dom.firstChild as Element).lastChild as Element;
// const json = deserialize(body);
// console.log(JSON.stringify(json));

const server = createServer((req, res) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        data = data.trim();
        if (!data.startsWith("<")) {
            data = `<p>${data}</p>`;
        }
        const dom = parse(`<body>${data}</body>`, {
            treeAdapter: htmlparser2Adapter,
        });
        const html = (
            dom.firstChild as any as Htmlparser2TreeAdapterMap["element"]
        ).lastChild as Htmlparser2TreeAdapterMap["element"];
        const json = deserialize(html);
        res.writeHead(200);
        res.end(JSON.stringify(json));
    });
});

server.listen(8200);
