# Node mentoring program (code examples)

1) clone this repo
2) npm i

#### HW1
- [hw1](https://github.com/andrIvash/node-mentoring/tree/hw1)

#### HW2
- [hw2](https://github.com/andrIvash/node-mentoring/tree/hw2)

#### HW3
- [hw3](https://github.com/andrIvash/node-mentoring/tree/hw3)
    ```
    node ./utils/streams.js -a outputFile -f f.txt
    node ./utils/streams.js -a convertFromFile -f ./data/1.csv
    node ./utils/streams.js -a convertToFile -f ./data/1.csv
    node ./utils/streams.js -a cssBundler -p ./data/css
    ```
#### hW4
- [hw4](https://github.com/andrIvash/node-mentoring/tree/hw4)
    ```
    node run text-server
    node run json-server
    node run html-server
    node run echo-server
        //  curl -d "hello world" -X POST http://localhost:3000 
    node run server 
        // curl -v --cookie "USER_TOKEN=Yes;COMMON=No" http://localhost:3000/\?id\=3\&filter\='common'
            
    ``` 
    ###### API request
    - get user list
    ```
    curl http://localhost:3000/api/users
    ```
    - get products list
    ```
    curl http://localhost:3000/api/products
    ```
    - get single product by id
    ```
    curl http://localhost:3000/api/products/1
    ```
    - get product reviews
    ```
    curl http://localhost:3000/api/products/1/reviews
    ```    
    - add product
    ```
    curl -d '{"name":"NewOne","brand":"XBB","price":"21.99"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/products
    ``` 

#hw5
- [hw5](https://github.com/andrIvash/node-mentoring/tree/hw5)
  ##### API request
  - login (passport.js local strategy) then get data
  ```
    node run server
    curl POST http://localhost:3000/api/auth2 -d 'username=username' -d 'password=password' -v
    copy cookie from response and paste it to XXX
    curl -H 'cookie: connect.sid=XXX' http://localhost:3000/api/products
  ```    
  ##### Login via Web interface
  ```
    rename .env_test file to .env in root directory and add proper credentials
    node run server
    open http://localhost:3000 in browser
  ```  
