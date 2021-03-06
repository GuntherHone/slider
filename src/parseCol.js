export default function parseCol(input) {
  function Node(name, type, value = undefined) {
    this.name = name;
    this.type = type;
    this.children = [];
    this.parent = undefined;
    this.value = value;

    this.addChild = (node) => {
      this.children.push(node);
      node.parent = this;
    };
  }

  function parseAST(input) {
    const root = new Node("root", "root");
    let currentNode = root;

    input.forEach((line) => {
      let matchObject = line.match(/object\s*(\w+)\s*:\s*(\w+)/);
      let matchArray = line.match(/\s*(\w+)\s*=\s*</);
      let matchItem = line.match(/\s*item$/);
      let matchEnd = line.match(/\s*(end|end>)$/);
      let matchProperty = line.match(/\s*(\w+)\s*=\s*('.+'|\d+)/);

      if (matchObject) {
        let newNode = new Node(matchObject[1], "object");
        currentNode.addChild(newNode);
        currentNode = newNode;
      } else if (matchArray) {
        let newNode = new Node(matchArray[1], "array");
        currentNode.addChild(newNode);
        currentNode = newNode;
      } else if (matchItem) {
        let newNode = new Node("item", "arrayitem");
        currentNode.addChild(newNode);
        currentNode = newNode;
      } else if (matchEnd) {
        currentNode = currentNode.parent;
        if (matchEnd[1] === "end>") {
          // End of array
          currentNode = currentNode.parent;
        }
      } else if (matchProperty) {
        let value;
        if (matchProperty[2].includes("'")) {
          // This is a string
          // Decode special characters in strings
          value = matchProperty[2]
            .split("'")
            .map((part) =>
              part.startsWith("#") // Special character code
                ? String.fromCharCode(part.substr(1))
                : part
            )
            .join("");
          value = `"${value}"`;
        } else {
          value = matchProperty[2];
        }

        let newNode = new Node(matchProperty[1], "property", value);
        currentNode.addChild(newNode);
      }
    });

    if (currentNode !== root) {
      throw new Error("Unexpected end of file!");
    }

    return currentNode.children[0];
  }

  function genJSON(node, indent = "") {
    if (node.type === "object") {
      return (
        `${indent}{\n` +
        node.children
          .map((child) => genJSON(child, indent + "  "))
          .join(",\n") +
        `\n${indent}}`
      );
    } else if (node.type === "array") {
      return (
        `${indent}"${node.name}":[\n` +
        node.children
          .map((child) => genJSON(child, indent + "  "))
          .join(",\n") +
        `\n${indent}]`
      );
    } else if (node.type === "arrayitem") {
      return (
        `${indent}{\n` +
        node.children
          .map((child) => genJSON(child, indent + "  "))
          .join(",\n") +
        `\n${indent}}`
      );
    } else if (node.type === "property") {
      return `${indent}"${node.name}":${node.value}`;
    }
  }

  let jsonString = genJSON(parseAST(input.split("\n")));

  return JSON.parse(jsonString);
}
