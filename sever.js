const http = require("http");
const fs = require("fs");
const qs = require("qs");
const { resourceUsage } = require("process");

const sever = http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("./views/index.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 FILE NOT FOUND");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let parsedData = qs.parse(data);
      //   console.log(parsedData);
      let numberToRead = +parsedData.number;
      //   console.log(numberToRead);
      let strNumb = numberToRead.toString().split("");
      //   console.log(strNumb);
      let a = ["2", "3", "4", "5", "6", "7", "8", "9"];
      let b = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

      let c = [
        "twenty",
        "thirdty",
        "fourty",
        "fifthty",
        "sixty",
        "seventy",
        "eightty",
        "ninety",
      ];
      let d = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];

      let e = [
        "eleven",
        "twelve",
        "thirdteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eightteen",
        "nineteen",
      ];

      let index;
      let result = "";

      fs.readFile("./views/index.html", "utf-8", (err, datahtml) => {
        if (err) {
          console.log(err);
        }

        if (numberToRead > 0 && numberToRead < 10) {
          for (let numb of b) {
            if (strNumb[0] === numb) {
              index = b.indexOf(numb);
            }
          }
          result += d[index];
        } else if (numberToRead < 20 && numberToRead >= 10) {
          if (strNumb[1] != 0) {
            for (let numb of b) {
              if (strNumb[1] === numb) {
                index = b.indexOf(numb);
              }
            }
            result += e[index];
          }
          if (strNumb[1] == 0) {
            result += "ten";
          }
        } else if (numberToRead >= 20 && numberToRead < 100) {
          for (let numb of a) {
            if (strNumb[0] === numb) {
              index = a.indexOf(numb);
              break;
            }
          }
          result += c[index];

          let index1;
          if (strNumb[1] != 0) {
            for (let numb of b) {
              if (strNumb[1] === numb) {
                index1 = b.indexOf(numb);
                break;
              }
            }
            result += " ";
            result += d[index1];
          } else if (strNumb[1] == 0) {
            result;
          }
          console.log(result);
        } else if (numberToRead >= 100 && numberToRead < 1000) {
          if (strNumb[1] == 0 && strNumb[2] == 0) {
            for (let numb of b) {
              if (strNumb[0] === numb) {
                index = b.indexOf(numb);
                break;
              }
            }
            result += d[index].concat(" ", "hundred");
          } else if (strNumb[1] == 1 && strNumb[2] == 0) {
            for (let numb of b) {
              if (strNumb[0] === numb) {
                index = b.indexOf(numb);
                break;
              }
            }
            result += d[index].concat(" ", "hundred", " ", "and", " ", "ten");
          } else if (strNumb[1] == 1 && strNumb[2] != 0) {
            for (let numb of b) {
              if (strNumb[0] === numb) {
                index = b.indexOf(numb);
                break;
              }
            }
            result += d[index].concat(" ", "hundred");
            for (let numb of b) {
              if (strNumb[2] === numb) {
                index = b.indexOf(numb);
                break;
              }
            }
            result += " ";
            result += "and";
            result += " ";
            result += e[index];
          } else if (strNumb[1] >= 2 && strNumb[1] < 10) {
            if (strNumb[2] != 0) {
              for (let numb of b) {
                if (strNumb[0] === numb) {
                  index = b.indexOf(numb);
                  break;
                }
              }
              result += d[index].concat(" ", "hundred");
              for (let numb of a) {
                if (strNumb[1] === numb) {
                  index = a.indexOf(numb);
                  break;
                }
              }
              result = result.concat(" ", "and", " ", c[index]);
              for (let numb of b) {
                if (strNumb[2] === numb) {
                  index = b.indexOf(numb);
                  break;
                }
              }
              result = result.concat(" ", d[index]);
            }
            if (strNumb[2] == 0) {
              for (let numb of b) {
                if (strNumb[0] === numb) {
                  index = b.indexOf(numb);
                  break;
                }
              }
              result += d[index].concat(" ", "hundred");
              for (let numb of a) {
                if (strNumb[1] === numb) {
                  index = a.indexOf(numb);
                  break;
                }
              }
              result = result.concat(" ", "and", " ", c[index]);
            }
          }
        }
        datahtml = datahtml.replace("{Read}", result);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(datahtml);
        return res.end();
      });
    });
    req.on("error", () => {
      console.log("error");
    });
  }
});

sever.listen(8080, "localhost", () => {
  console.log("Sever is running at localhost:8080");
});
