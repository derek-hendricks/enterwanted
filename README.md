Automated tests using Selenium, Jest, and Typescript for https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html

Installation:<br/>
```console
$ npm i
```

Run tests: <br/>
```console
$ npx jest enterWantedTests
```

Link to test plan: 
---------------------------------------------------------
https://dmutah.atlassian.net/browse/DH6DL-33

Links to test cases:
---------------------------------------------------------
https://dmutah.atlassian.net/browse/DH6DL-34<br/>
https://dmutah.atlassian.net/browse/DH6DL-35<br/>
https://dmutah.atlassian.net/browse/DH6DL-36<br/>

Equivalence Partitions:
---------------------------------------------------------
Header: Required, 9-19 characters in length, any allowed

- 0-8, 9-19, 20-30

MKE: Required, 2-4 in length, alphabetical or special characters allowed
- 0-1, 2-4, 5-10

Name: Required, 1-30 characters in length, any allowed
- 0, 1-30, 31

Hair: Required, 3-10 characters in length, alphabetical only
- 0-2, 3-10, 11-30




